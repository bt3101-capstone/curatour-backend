import { DBResponse } from '../services/utils';

export interface IBlogRepository {
    helloRepository(): Promise<Object>;
    addBlog(blogDetails: Object): Promise<DBResponse>;
}