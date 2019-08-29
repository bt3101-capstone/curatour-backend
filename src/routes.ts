import boom from 'boom';
import chalk from 'chalk';
import { Express } from 'express';
import { AwilixContainer } from 'awilix';
import { sendJsonResponse } from './services/utils';
import { configure as configureNconf } from './startup/nconf';

import { IBlogCtrl } from './interfaces';
import { SERVICE_IDENTIFIER } from './startup/types'
import { DIContainer } from './startup/di-container';

const ns = chalk.cyan('@routes');
const nconf = configureNconf() as any;

export const register = (app: Express) => {
    const blogCtrl = DIContainer.get<IBlogCtrl>(SERVICE_IDENTIFIER.BlogCtrl);

    const isCuratourBackendEnabled = nconf.get('curatourBackend:enabled');
    if (!isCuratourBackendEnabled) {
        const LOG_CTX = chalk.red(`${ns}.#CuratourBackend - Currently disabled`);
        console.log(LOG_CTX);
        throw boom.badRequest('Curatour Backend Service is disabled.');
    }

    app.get('/', (req, res) => sendJsonResponse(res, 200, 'OK', {}))
    app.post('/ctrltest', blogCtrl.helloWorld);
};