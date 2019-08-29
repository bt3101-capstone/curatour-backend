import chalk from 'chalk';
import nconf from 'nconf';
import path from 'path';

const logCtx = chalk.cyan('@nconf.config');
const CONFIG_ROOT = path.join(__dirname, '../../config');

const addFile = (arg1, arg2) => {
    if (arg1 && arg2) {
        nconf.file(arg1, { file: path.join(CONFIG_ROOT, arg2) });
    } else {
        nconf.file({ file: path.join(CONFIG_ROOT, arg1) });
    }
};

export const configure = () => {
    let env;

    nconf.env().argv();

    const nodeEnv = process.env.NODE_ENV;

    let useDefault = false;
    let configFileEnv;
    let secretFileEnv;

    // Select the config and secret file for each environment
    if (nodeEnv === 'production') {
        configFileEnv = secretFileEnv = 'prod';
    } else if (nodeEnv === 'test') {
        configFileEnv = 'test';
        secretFileEnv = 'dev';
    } else if (nodeEnv === 'test_staging') {
        configFileEnv = 'test.staging';
        // does not use secrets file
    } else if (nodeEnv) {
        configFileEnv = secretFileEnv = nodeEnv;
    } else {
        // use config.json and secrets.dev.json
        useDefault = true;
    }

    const mainConfigFiles = [];
    let key = 'config';
    if (useDefault) {
        mainConfigFiles.push({ key, filename: 'config.json' });
    } else if (configFileEnv) {
        mainConfigFiles.push({ key, filename: `config.${configFileEnv}.json` });
    }

    key = 'secrets';
    if (useDefault) {
        mainConfigFiles.push({ key, filename: 'secrets.dev.json' });
    } else if (secretFileEnv) {
        mainConfigFiles.push({ key, filename: `secrets.${secretFileEnv}.json` });
    }

    // NOTE: Config files loaded first take precedence, use nconf.override if needed
    const allConfigFiles = [...mainConfigFiles];

    for (const configFile of allConfigFiles) {
        const { key, filename } = configFile;
        addFile(key, filename);
        console.log(`${logCtx} - using config ${filename}`);
    }

    console.log(chalk.bold.green(`nconf (config) configured using ${configFileEnv} configuration`));
    console.log(chalk.bold.green(`nconf (secrets) configured using ${secretFileEnv} configuration`));
    return nconf;
};