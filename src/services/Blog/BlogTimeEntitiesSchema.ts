import * as mongoose from 'mongoose';
import * as types from '../../startup/types';
import { IBlogTimePeriodEntitiesMetric } from '../../interfaces/Blog/IBlog';

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

export default mongoose.model<IBlogTimePeriodEntitiesMetric>(types.BlogTimePeriodEntitiesMetric, BlogTimePeriodEntitiesMetric);