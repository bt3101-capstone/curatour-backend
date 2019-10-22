import _ from 'lodash';
import chalk from 'chalk';
import { injectable } from 'inversify';
import { Model } from 'mongoose';
import { IBlog, IBlogCountryMetric, IBlogTimePeriodEntitiesMetric, IBlogMonetizeEntities, IBlogRepository } from '../../interfaces/Blog';
import { DBResponse } from '../utils';
import Blog from './BlogPostSchema';
import BlogCountryMetric from './BlogCountrySchema';
import BlogMonetizeEntities from './BlogMonetizeEntitiesSchema';
import BlogTimePeriodEntitiesMetric from './BlogTimeEntitiesSchema';

const ns = '@BlogRepository';
let LOG_CTX = chalk.cyan(`${ns} - Starting BlogRepository`);
console.log(LOG_CTX);

@injectable()
export class BlogRepository implements IBlogRepository {

    private _model: Model<IBlog>;
    private _countryMetric: Model<IBlogCountryMetric>;
    private _countryMonetizeEntities: Model<IBlogMonetizeEntities>;
    private _timePeriodEntitiesMetric: Model<IBlogTimePeriodEntitiesMetric>;

    constructor() {
        this._model = Blog;
        this._countryMetric = BlogCountryMetric;
        this._countryMonetizeEntities = BlogMonetizeEntities;
        this._timePeriodEntitiesMetric = BlogTimePeriodEntitiesMetric;
    }

    public async helloRepository() {
        LOG_CTX = chalk.cyan(`${ns} - helloRepository()`);
        console.log(LOG_CTX);

        return 'ok repo';
    }

    /**
     * Get all BlogUrls for Autocomplete
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getAutocompleteUrls = async(): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getAutocompleteUrls()`);
        console.log(LOG_CTX);

        let resp, result;
        try {
            const queryResults = await self._model.find({}, {'blogUrl': 1, '_id': 0});
            result = queryResults.map(blog => blog.blogUrl);

            resp = {
                error: false,
                data: result,
            }
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp
        }
    }

    /**
     * Add Blogs
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public addBlog = async(blogDetails: Object): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - addBlog()`);
        console.log(LOG_CTX);

        let resp;
        try {
            const newBlogPost = new self._model(blogDetails);
            const result = await newBlogPost.save();
            LOG_CTX = chalk.green(`Success ${ns}.addBlog`);
            console.log(LOG_CTX);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Get Blogs
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getBlog = async(id: String): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlog()`);
        console.log(LOG_CTX);

        let resp;
        try {
            const result = await self._model.findById(id).lean();
            LOG_CTX = chalk.green(`Success ${ns}.getBlog`);
            console.log(LOG_CTX);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Get Blog Traffic Data (Single Blog) - historical/usage/content
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getBlogTraffic = async(blogDetails: Object): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogTrafficHistorical()`);
        console.log(LOG_CTX);

        let result, resp;
        const dataType = blogDetails['type']
        try {
            if (dataType == 'historicalData') {
                result = await self._model.aggregate(
                    [
                        { $match: { blogUrl: blogDetails['blogUrl'] }},
                        {
                            $project: {
                                "blogTraffic.historicalData": {
                                    $filter: {
                                        input: "$blogTraffic.historicalData",
                                        as: "historicalData",
                                        cond: {
                                            $and: [
                                                { $gte: [ "$$historicalData.date", blogDetails['startDate']] },
                                                { $lte: [ "$$historicalData.date", blogDetails['endDate']] }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ]
                )
                console.log('in historicalData');
                console.log(result);
                result = result[0]['blogTraffic'][dataType];
            } else if (dataType == 'usageData') {
                result = await self._model.find({ blogUrl: blogDetails['blogUrl'] }, 'blogTraffic.'+dataType).lean();
                console.log('in usageData');
                result = result[0]['blogTraffic'][dataType];
            } else {
                result = await self._model.find({ blogUrl: blogDetails['blogUrl'] }, 'blogTraffic.'+dataType).lean();
                console.log('in contentData');
                result = result[0]['blogTraffic'][dataType];
            }

            LOG_CTX = chalk.green(`Success ${ns}.getBlogTraffic - ${dataType}`);
            console.log(LOG_CTX);
            console.log(result);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            console.log(e);
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Get Blog Traffic Data (Single Blog) - historical only
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getLatestBlogTraffic = async(blogUrl: String): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getLatestBlogTrafficHistorical()`);
        console.log(LOG_CTX);

        let result, resp;
        try {
            result = await self._model.find({ 'blogUrl': blogUrl });
            result = result[0]['blogTraffic']['historicalData'];
            result = (_.sortBy(result, 'date')).slice(-1)[0];

            LOG_CTX = chalk.green(`Success ${ns}.getLatestBlogTraffic - historicalData`);
            console.log(LOG_CTX);
            console.log(result);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            console.log(e);
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Delete Blogs
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public deleteBlog = async(idsToRemove: String[]): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - deleteBlog()`);
        console.log(LOG_CTX);

        let resp;
        try {
            const result = await self._model.deleteMany({ _id: { $in: idsToRemove }})
            LOG_CTX = chalk.green(`Success ${ns}.deleteBlog`);
            console.log(LOG_CTX);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Get Aggregated Blog Country Metric Data (All Blogs)
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getBlogCountryMetric = async(blogCountryFilters: Object) => {
        const country = blogCountryFilters['country'];
        const year = blogCountryFilters['year'];

        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogCountryMetric()`);
        console.log(LOG_CTX);

        let resp;
        try {
            let result = await self._countryMetric.find({'country': country, 'year': year}).lean();
            result = {
                'country': result[0]['country'],
                'year': result[0]['year'],
                'entities': result[0]['entities']
            }
            LOG_CTX = chalk.green(`Success ${ns}.getBlogCountryMetric`);
            console.log(LOG_CTX);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Get Monetizable Entities Data (Single Country)
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getBlogMonetizeEntities = async(country: String): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogMonetizeEntities()`);
        console.log(LOG_CTX);

        let result, resp;
        try {
            result = await self._countryMonetizeEntities.find({'country': country}, 'entities');
            result = result[0]['entities'];

            LOG_CTX = chalk.green(`Success ${ns}.getBlogMonetizeEntities`);
            console.log(LOG_CTX);
            console.log(result);

            resp = {
                error: false,
                data: result,
            };
        } catch(e) {
            console.log(e);
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp;
        }
    }

    /**
     * Get all BlogUrls for Autocomplete
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: BlogRepository
     */
    public getTimePeriodEntitiesMetric = async(): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getTimePeriodEntitiesMetric()`);
        console.log(LOG_CTX);

        let resp, result;
        try {
            result = await self._timePeriodEntitiesMetric.find();

            resp = {
                error: false,
                data: result,
            }
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
        } finally {
            return resp
        }
    }
}