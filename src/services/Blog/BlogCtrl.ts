import boom from 'boom';
import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { sendJsonResponse } from '../utils' ;
import { Request, Response, NextFunction } from 'express';
import { BlogService } from './BlogService';
import { SERVICE_IDENTIFIER } from '../../startup/types';
import { IBlogCtrl } from '../../interfaces/Blog';

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

    public getAutocompleteUrls = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogUrls()`);
        console.log(LOG_CTX);

        return async function() {
        const addBlogDataResp = await self._blogService.getAutocompleteUrls();
            if (!addBlogDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', addBlogDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', addBlogDataResp);
            }
        }()
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

    public getBlogTraffic = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogTraffic()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!body.data) {
                throw boom.badRequest('data for getting blog traffic is required!')
            }

            const getBlogTrafficDataResp = await self._blogService.getBlogTraffic(body.data);
            if (!getBlogTrafficDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', getBlogTrafficDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', getBlogTrafficDataResp);
            }
        }()
    }

    public getLatestBlogTraffic = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getLatestBlogTraffic(); historicalData`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!req.params.url) {
                throw boom.badRequest('url for getting latest blog historical data is required!')
            }

            const getLatestBlogTrafficDataResp = await self._blogService.getLatestBlogTraffic(req.params.url);
            if (!getLatestBlogTrafficDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', getLatestBlogTrafficDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', getLatestBlogTrafficDataResp);
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

    public getBlogCountryMetric = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogCountryMetric()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!body.data) {
                throw boom.badRequest('data for getting blog country metric is required!')
            }

            const getBlogCountryMetricDataResp = await self._blogService.getBlogCountryMetric(body.data);
            if (!getBlogCountryMetricDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', getBlogCountryMetricDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', getBlogCountryMetricDataResp);
            }
        }()
    }

    public getBlogMonetizeEntities = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getBlogMonetizeEntities()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!req.params.country) {
                throw boom.badRequest('country for getting country monetize entities data is required!')
            }

            const getBlogMonetizeEntitiesDataResp = await self._blogService.getBlogMonetizeEntities(req.params.country);
            if (!getBlogMonetizeEntitiesDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', getBlogMonetizeEntitiesDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', getBlogMonetizeEntitiesDataResp);
            }
        }()
    }

    public getTimePeriodEntitiesMetric = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - getTimePeriodEntitiesMetric()`);
        console.log(LOG_CTX);

        return async function() {
        const getTimePeriodEntitiesResp = await self._blogService.getTimePeriodEntitiesMetric();
            if (!getTimePeriodEntitiesResp.error) {
                sendJsonResponse(res, 200, 'Ok', getTimePeriodEntitiesResp);
            } else {
                sendJsonResponse(res, 500, 'error', getTimePeriodEntitiesResp);
            }
        }()
    }
}