import { DBResponse } from '../services/utils'

export interface IBlogService {
    helloService(): Promise<Object>;
    addBlog(blogDetails: Object): Promise<DBResponse>;
}