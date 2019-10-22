import chalk from 'chalk';
import mongoose from 'mongoose';

import * as types from '../startup/types';
import { configure as configureNconf } from '../startup/nconf';
import { IBlogMonetizeEntities } from '../interfaces/Blog';

import { seedingData } from '../seedingData/blogMonetizeEntitiesData';

let ns = chalk.cyan('@blogMonetizeEntitiesSeedingScript');
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
 * Run script to create `blogMonetizeEntities` collection in MongoDB Atlas.
 * NODE_ENV=prod ts-node src/_scripts/blogMonetizeEntitiesSeedingScript.ts - `change prod to test soon`
 */

(async() => {
    let mongoUrl = `mongodb${ATLAS}://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}${MONGO_HOST}${SPARES ? `${SPARES}` : ''}${DB_NAME}`;
    const conn = await mongoose.connect(mongoUrl, {useNewUrlParser: true});
    console.log(`${DB_NAME} database connection successful!`);
    console.log(conn);
    console.log(mongoUrl);

    // Create blog collection Schema
    mongoose.set('useCreateIndex', true);
    const BlogMonetizeEntities = new mongoose.Schema(
        {
            country: String,
            entities: [{
                entity: String,
                city: String
            }],
            createdAt: String,
            updatedAt: String
        }, {
            collection: types.BlogMonetizeEntities,
            timestamps: true
        }
    )

    const blogMonetizeEntities = mongoose.model<IBlogMonetizeEntities>(types.BlogMonetizeEntities, BlogMonetizeEntities);

    const db = mongoose.connection;
    const seedData = seedingData['monetizeEntities'];
    console.log(seedData);
    console.log(typeof seedData);
    for (var countryInfoIdx in seedData) {
        
        const countryInfo = seedData[countryInfoIdx];
        const country = countryInfo['country'];
        const entities = countryInfo['entities'];
        console.log(country);
        console.log(entities);
        db.once('open', () => {
            console.log('Connection successful!');
        });

        let newEntry = new blogMonetizeEntities({
            country,
            entities
        });

        newEntry.save((e, countryData) => {
            if (e) {
                console.log('Error when adding new blogMonetizeEntities data!');
            }
            console.log(countryData.country + " saved to blogMonetizeEntities collection.")
        });
    }
})()
.catch((err) => {
    LOG_CTX = chalk.red(`Error ${ns} - when uploading blogMonetizeEntities documents.`);
    console.log(LOG_CTX);
    console.log(err);
})