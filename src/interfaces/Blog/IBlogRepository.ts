import { DBResponse } from '../../services/utils';

export interface IBlogRepository {
    helloRepository(): Promise<Object>;
    addBlog(blogDetails: Object): Promise<DBResponse>;
    getBlog(id: String): Promise<DBResponse>;
    deleteBlog(idsToRemove: String[]): Promise<DBResponse>;
}