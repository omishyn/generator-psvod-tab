const path = require('path');

module.exports = {
  replaceContent,
};

/**
 * Replace content
 * @param {object} args argument object
 * @param {object} generator reference to the generator
 */
function replaceContent(args, generator) {
  args.path = args.path || process.cwd();
  const fullPath = path.join(args.path, args.file);

  const re = args.regex ? new RegExp(args.pattern, 'g') : args.pattern;

  const currentBody = generator.fs.read(fullPath);
  const newBody = currentBody.replace(re, args.content);
  generator.fs.write(fullPath, newBody);
  return newBody !== currentBody;
}
