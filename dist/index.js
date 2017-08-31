#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const child_process = require("child_process");
const execSync = child_process.execSync;
const chalk = require("chalk");
const log = console.log;
program
    .command('init')
    .description('Initialise a new junction project')
    .option('-t, --template [template-name]', 'choose function template style (required)')
    .option('-n, --service-name [service-name]', 'name for the new service')
    .option('-d, --database', 'include support for RDBMS datasource and data model')
    .action((options) => {
    if (typeof options.template === 'undefined') {
        log(chalk.red('-t, --template [template-name] is required'));
        return;
    }
    let cwd = process.cwd();
    log(chalk.blue.bold('Installing Serverless'));
    let npmInit = execSync(`npm init -y`);
    let serverlessInstall = execSync(`npm install serverless@1.17.0 --save`);
    log(chalk.green.bold('Initialising base serverless template'));
    let slsResult = execSync(cwd + `/node_modules/serverless/bin/serverless create --template ${options.template} --name ${options.serviceName} --path vendor/serverless`);
    log(chalk.blue.bold('Initialisation complete!'));
    log(chalk.blue.bold('Installing required modules'));
    let devDependancyInstall = execSync(`npm install chai@3.5.0 chai-as-promised@6.0.0 chakram@1.5.0 mocha@3.2.0 mockery@2.0.0 serverless-mocha-plugin@1.3.4 serverless-offline@3.13.3 --save-dev`);
    if (typeof options.database !== 'undefined') {
        log(chalk.blue.bold('Installing DB dependencies'));
        let dbDependancyInstall = execSync(`npm install sequelize@3.30.4 --save`);
        log(chalk.green.bold('Installing DB dev dependencies'));
        let dbDevDependancyInstall = execSync(`npm install --save-dev sequelize-cli@2.7.0 sequelize-mock@0.7.0 sequelize-test-setup@0.0.4`);
        log(chalk.green.bold('Initialising DB config'));
        let dbConfigInit = execSync(cwd + `/node_modules/sequelize-cli/bin/sequelize init --config config/db.json`);
    }
});
program
    .command('alt')
    .description('An alternative test')
    .option('-s, --string <string>', 'Test string')
    .action((options) => {
    log(options.string);
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map