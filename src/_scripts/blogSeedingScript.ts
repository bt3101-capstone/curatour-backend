import chalk from 'chalk';
import mongoose from 'mongoose';
import superagent from 'superagent';

import * as types from '../startup/types';
import { configure as configureNconf } from '../startup/nconf';
import { IBlog } from '../interfaces/Blog';

import { seedingData } from '../seedingData/trafficData';

let ns = chalk.cyan('@blogSeedingScript');
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
 * Run script to create `blog` collection in MongoDB Atlas.
 * NODE_ENV=prod ts-node src/_scripts/blogSeedingScript.ts - `change prod to test soon`
 */

(async() => {
    let mongoUrl = `mongodb${ATLAS}://${MONGO_USER && MONGO_PASSWORD ? `${MONGO_USER}:${MONGO_PASSWORD}@` : ''}${MONGO_HOST}${SPARES ? `${SPARES}` : ''}${DB_NAME}`;
    const conn = await mongoose.connect(mongoUrl, {useNewUrlParser: true});
    console.log(`${DB_NAME} database connection successful!`);
    console.log(conn);
    console.log(mongoUrl);

    // Create blog collection Schema
    mongoose.set('useCreateIndex', true);
    const blogSchema = new mongoose.Schema({
        blogUrl: String,
        blogTraffic: [
            {
                historicalData: [{
                    date: String,
                    pageViews: {
                        perMillion: Number,
                        perUser: Number
                    },
                    rank: Number,
                    reach: {
                        perMillion: Number
                    }
                }],
                usageData: [{
                    timeRange: {
                        period: String,
                        count: Number
                    },
                    rank: {
                        value: Number,
                        delta: Number
                    },
                    reach: {
                        rank: {
                            value: Number,
                            delta: Number
                        },
                        perMillion: {
                            value: Number,
                            delta: Number
                        }
                    },
                    pageViews: {
                        rank: {
                            value: Number,
                            delta: Number
                        },
                        perMillion: {
                            value: Number,
                            delta: Number
                        },
                        perUser: {
                            value: Number,
                            delta: Number
                        }
                    }
                }],
                contentData: [{
                    speed: {
                        medianLoadTime: Number,
                        percentile: Number
                    }
                }]
            }
        ],
        blogs: [{
            blogUrl: String,
            blogPost: String,
            countries: [{ type: String }],
            cities: [{ type: String }],
            placesOfInterest: [{ type: String }],
            spacyNer: [{ startIdx: Number, endIdx: Number, entity: String }],
            awsNer: [{ type: String }],
            writtenAt: String
        }],
        createdAt: String,
        updatedAt: String
    }, {
        collection: types.Blog,
        timestamps: true
    });

    mongoose.model<IBlog>(types.Blog, blogSchema);

    // const blogEntry = mongoose.model<IBlog>(types.Blog, blogSchema);
    // const db = mongoose.connection;

    // const trafficData = seedingData['blogs'];
    // trafficData.forEach(async(blog) => {
    //     db.once('open', () => {
    //         console.log('Connection successful!');
    //     });

    //     const blogUrl = blog['blogUrl'];
    //     const blogTraffic = blog['blogTraffic'];
    //     const blogs = blog['blogs'];

    //     const newBlog = new blogEntry({
    //         blogUrl,
    //         blogTraffic,
    //         blogs
    //     });

    //     newBlog.save((e, blogData) => {
    //         if (e) {
    //             console.log('Error when adding new Blog data!');
    //         }
    //         console.log(blogUrl + " saved to Blog collection.")
    //     });
    // });

    const trafficData = seedingData['blogs'];
    trafficData.forEach(async(blog) => {
        const blogUrl = blog['blogUrl'];
        const blogTraffic = blog['blogTraffic'];
        const blogs = blog['blogs'];
        const seedDataFormat = {
            "blogUrl": blogUrl,
            "blogTraffic": blogTraffic,
            "blogs": blogs
        }
        

        let res;
        try {
            // res = await blogService.addBlog({
            //     blogUrl,
            //     blogTraffic,
            //     blogs
            // });
            res = await superagent.post('localhost:3000/blog/add').send({ data: seedDataFormat });
        } catch(e) {
            LOG_CTX = chalk.red(`Error ${ns} - when adding documents`);
            console.log(LOG_CTX);
            console.log(e);
        }
    });

})()
.catch((err) => {
    LOG_CTX = chalk.red(`Error ${ns} - when uploading documents.`);
    console.log(LOG_CTX);
    console.log(err);
})