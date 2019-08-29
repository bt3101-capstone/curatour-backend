import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlog } from '../../interfaces/IBlog';

const Blog = new mongoose.Schema(
    {
        blogId: String,
        blogUrl: String,
        blogPost: String,
        placesOfInterest: [{ type: String }],
        spacyNer: [{ type: String }],
        awsNer: [{ type: String }],
        createdAt: String,
        updatedAt: String
    }, {
        collection: types.Blog,
        timestamps: true
    }
);

export default mongoose.model<IBlog>(types.Blog, Blog);