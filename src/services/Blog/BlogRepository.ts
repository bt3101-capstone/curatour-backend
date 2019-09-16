import chalk from 'chalk';
import { injectable } from 'inversify';
import { Model } from 'mongoose';
import { IBlog, IBlogRepository } from '../../interfaces/Blog';
import { DBResponse } from '../utils';
import Blog from './BlogPostSchema';

const ns = '@BlogRepository';
let LOG_CTX = chalk.cyan(`${ns} - Starting BlogRepository`);
console.log(LOG_CTX);

@injectable()
export class BlogRepository implements IBlogRepository {

    private _model: Model<IBlog>;

    constructor() {
        this._model = Blog;
    }

    public async helloRepository() {
        LOG_CTX = chalk.cyan(`${ns} - helloRepository()`);
        console.log(LOG_CTX);

        return 'ok repo';
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
                                blogTraffic: {
                                    historicalData: {
                                        $filter: {
                                            input: "$blogTraffic.historicalData",
                                            as: "b",
                                            cond: {
                                                $and: [
                                                    { $gte: [ "$$b.date", blogDetails['startDate']] },
                                                    { $lte: [ "$$b.date", blogDetails['endDate']] }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    ]
                )
            } else {
                result = await self._model.find({ blogUrl: blogDetails['blogUrl'] }, 'blogTraffic.'+dataType).lean();
            }

            LOG_CTX = chalk.green(`Success ${ns}.getBlogTraffic - ${dataType}`);
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
}