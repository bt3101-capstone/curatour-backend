import { IUserRegister, IUserAuthenticate } from '../User'
import { DBResponse } from "../../services/utils";

export interface IUserService {
    register(registerDetails: IUserRegister): Promise<DBResponse>;
    authenticate(authenticateDetails: IUserAuthenticate): Promise<DBResponse>;
}