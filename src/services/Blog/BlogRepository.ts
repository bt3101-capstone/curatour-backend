import chalk from 'chalk';
import { injectable } from 'inversify';
import { Model } from 'mongoose';
import { IBlog, IBlogRepository } from '../../interfaces';
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
}