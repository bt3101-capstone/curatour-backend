import { DBResponse } from '../services/utils'

export interface IBlogService {
    helloService(): Promise<Object>;
    addBlog(blogDetails: Object): Promise<DBResponse>;
    getBlog(id: String): Promise<DBResponse>;
    deleteBlog(blogDetails: Object): Promise<DBResponse>;
}