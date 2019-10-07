import chalk from 'chalk';
import mongoose from 'mongoose';

import * as types from '../startup/types';
import { configure as configureNconf } from '../startup/nconf';
import { IBlogCountryMetric } from '../interfaces/Blog';

import { seedingData } from '../seedingData/countryData';

let ns = chalk.cyan('@blogCountryMetricSeedingScript');
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
 * Run script to create `blogCountryMetric` collection in MongoDB Atlas.
 * NODE_ENV=prod ts-node src/_scripts/blogCountryMetricSeedingScript.ts - `change prod to test soon`
 */

(async() => {
    let mongoUrl = `mongodb${ATLAS}://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}${MONGO_HOST}${SPARES ? `${SPARES}` : ''}${DB_NAME}`;
    const conn = await mongoose.connect(mongoUrl, {useNewUrlParser: true});
    console.log(`${DB_NAME} database connection successful!`);
    console.log(conn);
    console.log(mongoUrl);

    // Create blog collection Schema
    mongoose.set('useCreateIndex', true);
    const BlogCountryMetric = new mongoose.Schema(
        {
            country: String,
            year: String,
            entities: {},
            createdAt: String,
            updatedAt: String
        }, {
            collection: types.BlogCountryMetric,
            timestamps: true
        }
    )

    const blogCountryMetricEntry = mongoose.model<IBlogCountryMetric>(types.BlogCountryMetric, BlogCountryMetric);

    const db = mongoose.connection;
    for (var country in seedingData) {
        for (var year in seedingData[country]) {
            db.once('open', () => {
                console.log('Connection successful!');
            });

            let entities = seedingData[country][year]['entities'];
            let newEntry = new blogCountryMetricEntry({
                country,
                year,
                entities
            });

            newEntry.save((e, countryData) => {
                if (e) {
                    console.log('Error when adding new blogCountryMetric data!');
                }
                console.log(countryData.country + " saved to blogCountryMetric collection.")
            });
        }
    }
})()
.catch((err) => {
    LOG_CTX = chalk.red(`Error ${ns} - when uploading blogCountryMetric documents.`);
    console.log(LOG_CTX);
    console.log(err);
})