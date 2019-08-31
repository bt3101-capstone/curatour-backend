import boom from 'boom';
import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IUserCtrl } from '../../interfaces/User';
import { UserService } from './UserService';
import { SERVICE_IDENTIFIER } from '../../startup/types';
import { sendJsonResponse } from '../utils';

const ns = '@UserCtrl';
let LOG_CTX = chalk.cyan(`${ns} - Starting UserCtrl`);
console.log(LOG_CTX);

@injectable()
export class UserCtrl implements IUserCtrl {
    private _userService: UserService;

    constructor(
        @inject(SERVICE_IDENTIFIER.UserService) userService: UserService
    ) {
        this._userService = userService;
    }

    public register = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - register()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!body.data) {
                throw boom.badRequest('data for user registration is required!')
            }

            const registerUserDataResp = await self._userService.register(body.data);
            if (!registerUserDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', registerUserDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', registerUserDataResp);
            }
        }()
    }

    public authenticate = (req: Request, res: Response, nextFunction: NextFunction) => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - authenticate()`);
        console.log(LOG_CTX);
        const { body } = req;

        return async function() {
            if (!body.data) {
                throw boom.badRequest('data for user authentication is required!')
            }

            const authenticateUserDataResp = await self._userService.authenticate(body.data);
            if (!authenticateUserDataResp.error) {
                sendJsonResponse(res, 200, 'Ok', authenticateUserDataResp);
            } else {
                sendJsonResponse(res, 500, 'error', authenticateUserDataResp);
            }
        }()
    }
}