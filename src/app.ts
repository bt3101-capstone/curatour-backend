import "reflect-metadata";
import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { configure as configureNconf } from './startup/nconf';

const ns = '@app';
let LOG_CTX = chalk.cyan(`${ns} - Starting Curatour Backend`);
console.log(LOG_CTX);

let nconf = configureNconf() as any;
const MONGO_HOST: string = nconf.get('mongo:host')
const DB_NAME = nconf.get('mongo:database');
const MONGO_USER: string = nconf.get('mongo:user');
const MONGO_PASSWORD: string = nconf.get('mongo:password');
const SPARES = nconf.get('mongo:spares');
const SERVER_PORT: string = nconf.get('curatourBackend:port');

import { register as routes, register } from './routes';

class App {
    public app = express();

    constructor() {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
    }

    public listen() {
        this.app.listen(SERVER_PORT, () => {
            console.log(`Curatour Backend Server listening on port ${SERVER_PORT}`);
        });
    }

    private initializeMiddlewares = async () => {
        // const injector = await startup.injector;
        this.app.use(bodyParser.json());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Credentials', true as any);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        // To add Authentication Middleware here

        register(this.app);
    }

    private connectToTheDatabase() {
        try {
            let mongoUrl = `mongodb://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}${MONGO_HOST}${SPARES ? `,${SPARES.join(',')}` : ''}/${DB_NAME}`;

            const urlOptions = [];

            if (nconf.get('mongo:ssl')) {
                urlOptions.push(`ssl=${nconf.get('mongo:ssl')}`);
            }
        
            if (nconf.get('mongo:authSource')) {
                urlOptions.push(`authSource=${ nconf.get('mongo:authSource')}`);
            }
        
            if (nconf.get('mongo:replicaSet')) {
                urlOptions.push(`replicaSet=${nconf.get('mongo:replicaSet')}`);
            }
        
            if (urlOptions && urlOptions.length) {
                mongoUrl += `?${urlOptions.join('&')}`;
            }

            mongoose.connect(mongoUrl, {useNewUrlParser: true});
            console.log(`${DB_NAME} database connection successful!`);
        } catch (err) {
            console.log(`Error while connecting to ${DB_NAME} database!`);
            console.log(err);
        }
    }
}

export default App;