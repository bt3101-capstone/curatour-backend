import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlog } from '../../interfaces/Blog/IBlog';

const BlogPost = new mongoose.Schema(
    {
        blogUrl: String,
        blogPost: String,
        countries: [{ type: String }],
        cities: [{ type: String }],
        placesOfInterest: [{ type: String }],
        spacyNer: [{ startIdx: Number, endIdx: Number, entity: String }],
        awsNer: [{ type: String }],
        writtenAt: String
    }, {
        collection: types.BlogPost
    }
);

const Blog = new mongoose.Schema(
    {
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
                            delta: String
                        }
                    },
                    pageViews: {
                        rank: {
                            value: Number,
                            delta: Number
                        },
                        perMillion: {
                            value: Number,
                            delta: String
                        },
                        perUser: {
                            value: Number,
                            delta: String
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
    }
)

export default mongoose.model<IBlog>(types.Blog, Blog);