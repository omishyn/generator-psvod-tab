const chalk = require('chalk');
const Generator = require('yeoman-generator');
const Utils = require('./utils');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());

module.exports = class extends Generator {
  /**
   * Replace the pattern/regex with provided content
   *
   * @param {string} filePath - path of the source file to rewrite
   * @param {string} pattern - pattern to look for where content will be replaced
   * @param {string} content - content to be written
   * @param {string} regex - true if pattern is regex
   * @returns {boolean} true if the body has changed.
   */
  replaceContent(filePath, pattern, content, regex) {
    try {
      return Utils.replaceContent(
        {
          file: filePath,
          pattern,
          content,
          regex
        },
        this
      );
    } catch (e) {
      this.log(
        chalk.yellow('\nUnable to find ') + filePath + chalk.yellow(' or missing required pattern. File rewrite failed.\n') + e
      );
      this.debug('Error:', e);
      return false;
    }
  }

  removeCR(filePath) {
    this.replaceContent(filePath, '\r\n', '\n', true);
  }

  getPages() {
    return dirs('./src/app/pages');
  }

  /**
   * Replace content with provided content
   *
   * @param {string} filePath - path of the source file to rewrite
   * @returns {boolean} true if the body has changed.
   */
  replaceAll(filePath) {

    const PageTabName = `${this.ucFirst(this.page)}${this.ucFirst(this.tab)}`;
    const pageTabName = `${this.page}${this.ucFirst(this.tab)}`;
    const PageTabDir = `${this.page}/${this.tab}`;
    const PageTabRef = `${this.page}-${this.tab}`;

    this.replaceContent(filePath, 'PAGE_TAB_NAME', PageTabName, true);
    this.replaceContent(filePath, 'page_TAB_NAME', pageTabName, true);
    this.replaceContent(filePath, 'PAGE_TAB_DIR', PageTabDir, true);
    this.replaceContent(filePath, 'PAGE_TAB_REF', PageTabRef, true);

    this.replaceContent(filePath, 'page_NAME', this.page.toLowerCase(), true);
    this.replaceContent(filePath, 'PAGE_NAME', this.ucFirst(this.page), true);
    this.replaceContent(filePath, 'tab_NAME', this.tab.toLowerCase(), true);
    this.replaceContent(filePath, 'TAB_NAME', this.ucFirst(this.tab), true);
  }

  /**
   * Replace content with provided content
   *
   * @param {string} srcPath - path of the source file
   * @param {string} destPath - path of the destination
   * @returns {boolean} true if the body has changed.
   */
  copyAndReplace(srcPath, destPath) {
    this.fs.copy(
      this.templatePath(srcPath),
      this.destinationPath(destPath)
    );

    this.replaceAll(destPath);
  }

  /**
   * Print a debug message.
   *
   * @param {string} msg - message to print
   * @param {string[]} args - arguments to print
   */
  debug(msg, ...args) {
    const formattedMsg = `${chalk.yellow.bold('DEBUG!')} ${msg}`;
    this.log(formattedMsg);
    args.forEach(arg => this.log(arg));
  }

  ucFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
};
