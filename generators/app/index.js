'use strict';
const BaseGenerator = require('../common');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');

module.exports = class extends BaseGenerator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the praiseworthy ${chalk.red('generator-psvod-tab')} generator!`)
    );

    const prompts = [
      {
        // type: 'confirm',
        when: () => typeof this.page === 'undefined',
        type: 'input',
        name: 'page',
        message: 'Enter page dir',
        default: ''
      },
      {
        when: () => typeof this.tab === 'undefined',
        type: 'input',
        name: 'tab',
        message: 'Enter tab dir',
        default: ''
      }
    ];

    const done = this.async();

    this.prompt(prompts)
      .then(props => {

      this.page = props.page;
      this.tab = props.tab;


      if(this.page && this.tab) {

        this.page = this.page.toLowerCase();
        this.tab = this.tab.toLowerCase();

        const _prompts = [
          {
            when: () => typeof this.name === 'undefined',
            type: 'input',
            name: 'name',
            message: 'Enter tab name',
            default: `${this.ucFirst(this.tab)} (Beta)`
          }
        ];

        return this.prompt(_prompts);
      } else {
        this.abort = true;
      }
    })
      .then(_props => {
      this.tabName = _props.name;

      if(this.tabName) {
        done();
      } else {
        this.abort = true;
      }
    })
    ;
  }

  writing() {
    if(this.abort) {

    } else {

      // this.copyAndReplace('dummyfile.txt', 'dummyfile.txt');

      const dirs = [
        'src',
        './src/app',
        './src/app/entities',
        `./src/app/entities/${this.page}`,
        `./src/app/entities/${this.page}/${this.tab}`,
        './src/app/pages',
        `./src/app/pages/${this.page}`,
        `./src/app/pages/${this.page}/${this.tab}`,
        './src/app/shared',
        './src/app/shared/api',
        `./src/app/shared/api/${this.page}`,
        `./src/app/shared/api/${this.page}/${this.tab}`,
        './src/app/store',
        `./src/app/store/${this.page}`,
        `./src/app/store/${this.page}/${this.tab}`,
      ];
      dirs.forEach(dir => {if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }});

      const srcDist = [
        // STORE
        {
          src: './store/actions.ts',
          dist: `./src/app/store/${this.page}/${this.tab}/actions.ts`
        },
        {
          src: './store/effects.ts',
          dist: `./src/app/store/${this.page}/${this.tab}/effects.ts`
        },
        {
          src: './store/reducer.ts',
          dist: `./src/app/store/${this.page}/${this.tab}/reducer.ts`
        },
        {
          src: './store/selectors.ts',
          dist: `./src/app/store/${this.page}/${this.tab}/selectors.ts`
        },

        // PAGE
        {
          src: './page/.component.html',
          dist: `./src/app/pages/${this.page}/${this.tab}/${this.page}-${this.tab}.component.html`
        },
        {
          src: './page/.component.scss',
          dist: `./src/app/pages/${this.page}/${this.tab}/${this.page}-${this.tab}.component.scss`
        },
        {
          src: './page/.component.ts',
          dist: `./src/app/pages/${this.page}/${this.tab}/${this.page}-${this.tab}.component.ts`
        },
        {
          src: './page/.container.ts',
          dist: `./src/app/pages/${this.page}/${this.tab}/${this.page}-${this.tab}.container.ts`
        },
        {
          src: './page/.module.ts',
          dist: `./src/app/pages/${this.page}/${this.tab}/${this.page}-${this.tab}.module.ts`
        },
        {
          src: './page/.router.ts',
          dist: `./src/app/pages/${this.page}/${this.tab}/${this.page}-${this.tab}.router.ts`
        },

        // ENTITY
        {
          src: './entity/api-model.namespace.ts',
          dist: `./src/app/entities/${this.page}/${this.tab}/api-model.namespace.ts`
        },
        {
          src: './entity/common.namespace.ts',
          dist: `./src/app/entities/${this.page}/${this.tab}/common.namespace.ts`
        },
        {
          src: './entity/constants.ts',
          dist: `./src/app/entities/${this.page}/${this.tab}/constants.ts`
        },
        {
          src: './entity/enums.ts',
          dist: `./src/app/entities/${this.page}/${this.tab}/enums.ts`
        },

        // API
        {
          src: './api/.api.service.ts',
          dist: `./src/app/shared/api/${this.page}/${this.tab}/${this.page}-${this.tab}.api.service.ts`
        },
      ];

      srcDist.forEach(item => {
        this.copyAndReplace(item.src, item.dist);
      });

      // MOCK
      this.fs.copy(
        this.templatePath('./api/mock.ts'),
        this.destinationPath(`./src/app/shared/api/${this.page}/${this.tab}/mock.ts`)
      );

      // CHANGE CONTENT
      const PageTabName = `${this.ucFirst(this.page)}${this.ucFirst(this.tab)}`;
      const pageTabName = `${this.page}${this.ucFirst(this.tab)}`;
      const PageTabDir = `${this.page}/${this.tab}`;
      const PageTabRef = `${this.page}-${this.tab}`;

      let dist = `./src/app/pages/${this.page}/${this.page}.routes.ts`;
      this.removeCR(dist);
      this.replaceContent(dist,
        '},', `},\n\t...${PageTabName}TabRoutes,`, false);
      this.replaceContent(dist,
        '\nconst routes:', `import {${PageTabName}TabRoutes} from '@pages/${PageTabDir}/${PageTabRef}.router';\n\nconst routes:`, false);

      dist = `./src/app/store/effects.module.ts`;
      this.removeCR(dist);
      this.replaceContent(dist,
        '\n@NgModule', `import {${PageTabName}ApiService} from '@shared/api/${PageTabDir}/${PageTabRef}.api.service';
import {${PageTabName}Effects} from '@store/${PageTabDir}/effects';\n\n@NgModule`, false);
      this.replaceContent(dist,
        'EffectsModule.forRoot([', `EffectsModule.forRoot([\n\t\t\t${PageTabName}Effects,`, false);
      this.replaceContent(dist,
        'providers: [', `providers: [\n\t\t${PageTabName}ApiService,`, false);

      dist = `./src/app/store/rootReducer.ts`;
      this.removeCR(dist);
      this.replaceContent(dist,
        '\nexport const reducers = {', `import {${pageTabName}Reducer, ${PageTabName}State} from '@store/${PageTabDir}/reducer';
        \nexport const reducers = {`, false);
      this.replaceContent(dist,
        'export const reducers = {', `export const reducers = {\n\t${pageTabName}: ${pageTabName}Reducer,`, false);
      this.replaceContent(dist,
        'export interface AppState {', `export interface AppState {\n\t${pageTabName}: ${PageTabName}State;`, false);

    }
  }

  install() {
    // this.installDependencies();
    // fs.unlinkSync('.yo-repository');
  }
};
