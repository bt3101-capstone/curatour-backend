import { Container } from 'inversify';
import { BlogCtrl, BlogService, BlogRepository } from '../services/Blog';
import { IBlogCtrl, IBlogService, IBlogRepository } from '../interfaces/Blog';
import { UserCtrl, UserService, UserRepository } from '../services/User';
import { IUserCtrl, IUserService, IUserRepository } from '../interfaces/User';
import { SERVICE_IDENTIFIER } from '../startup/types';

let DIContainer = new Container();
DIContainer.bind<IBlogRepository>(SERVICE_IDENTIFIER.BlogRepository).to(BlogRepository);
DIContainer.bind<IBlogService>(SERVICE_IDENTIFIER.BlogService).to(BlogService);
DIContainer.bind<IBlogCtrl>(SERVICE_IDENTIFIER.BlogCtrl).to(BlogCtrl);

DIContainer.bind<IUserRepository>(SERVICE_IDENTIFIER.UserRepository).to(UserRepository);
DIContainer.bind<IUserService>(SERVICE_IDENTIFIER.UserService).to(UserService);
DIContainer.bind<IUserCtrl>(SERVICE_IDENTIFIER.UserCtrl).to(UserCtrl);
export { DIContainer };