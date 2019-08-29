import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { BlogRepository } from './BlogRepository';
import { SERVICE_IDENTIFIER } from '../../startup/types';
import { IBlogService } from '../../interfaces';

const ns = '@BlogCtrl';
let LOG_CTX = chalk.cyan(`${ns} - Starting BlogCtrl`);
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
}