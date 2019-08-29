import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlog } from '../../interfaces/IBlog';

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
        blogTrafficCount: Number,
        blogs: [{ type: BlogPost }],
        createdAt: String,
        updatedAt: String
    }, {
        collection: types.Blog,
        timestamps: true
    }
)

export default mongoose.model<IBlog>(types.Blog, Blog);