import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { BlogRepository } from './BlogRepository';
import { SERVICE_IDENTIFIER } from '../../startup/types';
import { IBlogService } from '../../interfaces/Blog';
import { DBResponse } from '../utils';

const ns = '@BlogService';
let LOG_CTX = chalk.cyan(`${ns} - Starting BlogService`);
console.log(LOG_CTX);

@injectable()
export class BlogService implements IBlogService {
    static get inject() {
        return [
            SERVICE_IDENTIFIER.BlogRepository,
        ];
    }

    private _blogRepository: BlogRepository;

    public constructor(
        @inject(SERVICE_IDENTIFIER.BlogRepository) blogRepository: BlogRepository
    ) {
        this._blogRepository = blogRepository;
    }

    public helloService = async() => {
        LOG_CTX = chalk.cyan(`${ns} - helloService()`);
        console.log(LOG_CTX);

        return {data: 'Test Response from BlogService!'}
    }

    public addBlog = async(blogDetails: Object): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - addBlog()`);
        console.log(LOG_CTX);

        return self._blogRepository.addBlog(blogDetails);
    }

    public getBlog = async(id: String): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlog()`);
        console.log(LOG_CTX);

        return self._blogRepository.getBlog(id);
    }

    public deleteBlog = async(blogDetails: Object): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - deleteBlog()`);
        console.log(LOG_CTX);
        const idsToRemove = blogDetails['idsToRemove'];

        return self._blogRepository.deleteBlog(idsToRemove);
    }
}