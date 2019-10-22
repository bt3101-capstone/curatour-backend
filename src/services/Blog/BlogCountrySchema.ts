import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlogCountryMetric } from '../../interfaces/Blog/IBlog';

const BlogCountryMetric = new mongoose.Schema(
    {
        country: String,
        year: String,
        entities: [{
            name: String,
            data: [{
                x: String,
                y: Number
            }]
        }],
        createdAt: String,
        updatedAt: String
    }, {
        collection: types.BlogCountryMetric,
        timestamps: true
    }
)

export default mongoose.model<IBlogCountryMetric>(types.BlogCountryMetric, BlogCountryMetric);