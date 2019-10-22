import chalk from 'chalk';
import mongoose from 'mongoose';

import * as types from '../startup/types';
import { configure as configureNconf } from '../startup/nconf';
import { IBlogTimePeriodEntitiesMetric } from '../interfaces/Blog';

import { seedingData } from '../seedingData/blogTimePeriodEntitiesData';

let ns = chalk.cyan('@blogTimePeriodEntitiesMetricSeedingScript');
let LOG_CTX;
console.log(ns);

let nconf = configureNconf() as any;
const ATLAS = nconf.get('mongo:atlasSetting');
const MONGO_HOST: string = nconf.get('mongo:host')
const DB_NAME = nconf.get('mongo:database');
const MONGO_USER: string = nconf.get('mongo:user');
const MONGO_PASSWORD: string = nconf.get('mongo:password');
const SPARES = nconf.get('mongo:spares');

/**
 * Run script to create `BlogTimePeriodEntitiesMetric` collection in MongoDB Atlas.
 * NODE_ENV=prod ts-node src/_scripts/blogTimePeriodEntitiesMetricSeedingScript.ts - `change prod to test soon`
 */

(async() => {
    let mongoUrl = `mongodb${ATLAS}://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}${MONGO_HOST}${SPARES ? `${SPARES}` : ''}${DB_NAME}`;
    const conn = await mongoose.connect(mongoUrl, {useNewUrlParser: true});
    console.log(`${DB_NAME} database connection successful!`);
    console.log(conn);
    console.log(mongoUrl);

    // Create blog collection Schema
    mongoose.set('useCreateIndex', true);
    const BlogTimePeriodEntitiesMetric = new mongoose.Schema(
        {
            timePeriod: String,
            entities: {},
            createdAt: String,
            updatedAt: String
        }, {
            collection: types.BlogTimePeriodEntitiesMetric,
            timestamps: true
        }
    )

    const blogTimePeriodEntitiesMetricEntry = mongoose.model<IBlogTimePeriodEntitiesMetric>(types.BlogTimePeriodEntitiesMetric, BlogTimePeriodEntitiesMetric);

    const db = mongoose.connection;
    for (let timePeriod in seedingData) {
        const entities = seedingData[timePeriod]['entities']
        db.once('open', () => {
            console.log('Connection successful!');
        });

        let newEntry = new blogTimePeriodEntitiesMetricEntry({
            timePeriod,
            entities
        });

        newEntry.save((e, newEntry) => {
            if (e) {
                console.log('Error when adding new BlogTimePeriodEntitiesMetric data!');
            }
            console.log(newEntry.timePeriod + " saved to BlogTimePeriodEntitiesMetric collection.")
        });
        
    }
})()
.catch((err) => {
    LOG_CTX = chalk.red(`Error ${ns} - when uploading BlogTimePeriodEntitiesMetric documents.`);
    console.log(LOG_CTX);
    console.log(err);
})