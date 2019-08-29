import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlogPost } from '../../interfaces/IBlog';

const BlogPost = new mongoose.Schema(
    {
        blogId: String,
        blogUrl: String,
        blogPost: String,
        placesOfInterest: [{ type: String }],
        spacyNer: [{ startIdx: Number, endIdx: Number, entity: String }],
        awsNer: [{ type: String }],
        createdAt: String,
        updatedAt: String
    }, {
        collection: types.Blog,
        timestamps: true
    }
);

export default mongoose.model<IBlogPost>(types.BlogPost, BlogPost);