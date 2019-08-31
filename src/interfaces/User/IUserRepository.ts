import { IUserRegister, IUserAuthenticate } from '../User'
import { DBResponse } from "../../services/utils";

export interface IUserRepository {
    register(registerDetails: IUserRegister): Promise<DBResponse>;
    authenticate(authenticateDetails: IUserAuthenticate): Promise<DBResponse>;
}