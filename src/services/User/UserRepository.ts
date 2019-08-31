import bcrypt from 'bcrypt';
import chalk from 'chalk';
import { Model } from 'mongoose';
import { injectable } from 'inversify';
import { DBResponse } from '../utils';
import { IUserRegister, IUserAuthenticate, IUserRepository, IUserCredential } from '../../interfaces/User';
import { userModel } from './UserCredentialSchema';

const saltRounds = 10;

const ns = '@UserRepository';
let LOG_CTX = chalk.cyan(`${ns} - Starting UserRepository`);
console.log(LOG_CTX);

@injectable()
export class UserRepository implements IUserRepository {

    private _model: Model<IUserCredential>

    constructor() {
        this._model = userModel;
    }

    /**
     * Create User
     * @returns {DBResponse} - Response after interacting with Mongoose
     * @memberOf: UserRepository
     */
    public register = async(registerDetails: IUserRegister): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - register()`);
        console.log(LOG_CTX);
        
        let result, resp;
        try {
            const newUser = new self._model(registerDetails);
            await bcrypt.hash(newUser.password, saltRounds).then(async(hash) => {
                newUser.password = hash;
                result = await newUser.save();
            })

            resp = {
                error: false,
                data: result,
            };

            LOG_CTX = chalk.green(`Success ${ns}.register`);
            console.log(LOG_CTX);
        } catch(e) {
            resp = {
                error: true,
                data: e,
            };
            console.log(e);
        } finally {
            return resp;
        }
    }

    public authenticate = async(authenticateDetails: IUserAuthenticate): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - authenticate()`);
        console.log(LOG_CTX);

        let result, token, resp;
        try {
            const user = await self._model.findOne({ username: authenticateDetails.username });
            console.log(user);
            const match = await bcrypt.compare(authenticateDetails.password, user.password);

            if (match) {
                result = {
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "blog": user.blog
                }
            }

            resp = {
                error: false,
                data: result,
            };

            LOG_CTX = chalk.green(`Success ${ns}.authenticate`);
            console.log(LOG_CTX);
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