import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { sendJsonResponse } from '../utils' ;
import { NextFunction } from 'express';
import { BlogService } from './BlogService';
import { description, Doc, param, post, response, route, summary } from 'doctopus';
import { SERVICE_IDENTIFIER } from '../../startup/types';
import { IBlogCtrl } from '../../interfaces';

const ns = '@BlogCtrl';
let LOG_CTX = chalk.cyan(`${ns} - Starting BlogCtrl`);
console.log(LOG_CTX);

@injectable()
export class BlogCtrl implements IBlogCtrl {
    private _blogService: BlogService;
    
    constructor(
        @inject(SERVICE_IDENTIFIER.BlogService) blogService: BlogService
    ) {
        this._blogService = blogService;
    }

    public helloWorld = async(req: any, res: any, next: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - helloWorld()`);
        console.log(LOG_CTX);
        const blogServiceResponse = await self._blogService.helloService();
        console.log(blogServiceResponse);

        return sendJsonResponse(res, 200, 'Ok', blogServiceResponse);
    }
}