import chalk from 'chalk';
import { injectable, inject } from "inversify";
import { IUserRegister, IUserAuthenticate, IUserService } from "../../interfaces/User";
import { UserRepository } from '.';
import { SERVICE_IDENTIFIER } from "../../startup/types";
import { DBResponse } from '../utils';

const ns = '@UserService';
let LOG_CTX = chalk.cyan(`${ns} - Starting UserService`);
console.log(LOG_CTX);

@injectable()
export class UserService implements IUserService {
    private _userRepository: UserRepository;

    constructor(
        @inject(SERVICE_IDENTIFIER.UserRepository) userRepository: UserRepository
    ) {
        this._userRepository = userRepository
    }

    public register = async(registerDetails: IUserRegister): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - register()`);
        console.log(LOG_CTX);

        return self._userRepository.register(registerDetails);
    }

    public authenticate = async(authenticateDetails: IUserAuthenticate): Promise<DBResponse> => {
        const self = this;
        LOG_CTX = chalk.cyan(`${ns} - signIn()`);
        console.log(LOG_CTX);

        return self._userRepository.authenticate(authenticateDetails);
    }
}