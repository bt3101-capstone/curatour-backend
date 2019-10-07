require('dotenv').config();
import "reflect-metadata";
import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';
import { configure as configureNconf } from './startup/nconf';
import { register as routes, register } from './routes';

const ns = '@app';
let LOG_CTX = chalk.cyan(`${ns} - Starting Curatour Backend`);
console.log(LOG_CTX);

let ATLAS: string, MONGO_HOST: string, DB_NAME: string, MONGO_USER: string, MONGO_PASSWORD: string, SPARES: string, SERVER_PORT: string;
let nconf = configureNconf() as any;
if (process.env.prod == 'prod') {
    ATLAS = process.env.atlasSetting;
    MONGO_HOST = process.env.host;
    DB_NAME = process.env.database;
    MONGO_USER = process.env.user;
    MONGO_PASSWORD = process.env.password;
    SPARES = process.env.spares;
} else {
    ATLAS = nconf.get('mongo:atlasSetting');
    MONGO_HOST = nconf.get('mongo:host')
    DB_NAME = nconf.get('mongo:database');
    MONGO_USER = nconf.get('mongo:user');
    MONGO_PASSWORD = nconf.get('mongo:password');
    SPARES = nconf.get('mongo:spares');
}
SERVER_PORT = nconf.get('curatourBackend:port');

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
        this.app.use(bodyParser.json({limit: '50mb'}));
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

    private async connectToTheDatabase() {
        try {
            let mongoUrl = `mongodb${ATLAS}://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}${MONGO_HOST}${SPARES ? `${SPARES}` : ''}${DB_NAME}`;

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
            
            const conn = await mongoose.connect(mongoUrl, {useNewUrlParser: true});
            console.log(`${DB_NAME} database connection successful!`);
        } catch (err) {
            console.log(`Error while connecting to ${DB_NAME} database!`);
            console.log(err);
        }
    }
}

export default App;