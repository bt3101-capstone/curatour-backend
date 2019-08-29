import { Container } from 'inversify';
import { BlogCtrl, BlogService, BlogRepository } from '../services/Blog';
import { IBlogCtrl, IBlogService, IBlogRepository } from '../interfaces';
import { SERVICE_IDENTIFIER } from '../startup/types';

let DIContainer = new Container();
DIContainer.bind<IBlogRepository>(SERVICE_IDENTIFIER.BlogRepository).to(BlogRepository);
DIContainer.bind<IBlogService>(SERVICE_IDENTIFIER.BlogService).to(BlogService);
DIContainer.bind<IBlogCtrl>(SERVICE_IDENTIFIER.BlogCtrl).to(BlogCtrl);

export { DIContainer };