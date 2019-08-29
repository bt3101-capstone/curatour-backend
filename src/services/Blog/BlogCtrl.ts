import boom from 'boom';
import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { sendJsonResponse } from '../utils' ;
import { Request, Response, NextFunction } from 'express';
import { BlogService } from './BlogService';
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

    public addBlog = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - addBlog()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!body.data) {
                throw boom.badRequest('data for blog addition is required!')
            }

            const addBlogDataResp = await self._blogService.addBlog(body.data);
            if (!addBlogDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', addBlogDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', addBlogDataResp);
            }
        }()
    }

    public getBlog = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlog()`);
        console.log(LOG_CTX);

        return async function() {
            if (!req.params.id) {
                throw boom.badRequest('id for getting blog is required!')
            }

            const getBlogDataResp = await self._blogService.getBlog(req.params.id);
            if (!getBlogDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', getBlogDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', getBlogDataResp);
            }
        }()
    }

    public deleteBlog = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - deleteBlog()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!body.data) {
                throw boom.badRequest('data for blog deletion is required!')
            }

            const deleteBlogDataResp = await self._blogService.deleteBlog(body.data);
            if (!deleteBlogDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', deleteBlogDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', deleteBlogDataResp);
            }
        }()
    } 
}