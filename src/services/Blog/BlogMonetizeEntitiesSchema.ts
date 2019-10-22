import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlogMonetizeEntities } from '../../interfaces/Blog/IBlog';

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

export default mongoose.model<IBlogMonetizeEntities>(types.BlogMonetizeEntities, BlogMonetizeEntities);