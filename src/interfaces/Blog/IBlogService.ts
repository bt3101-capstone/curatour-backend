import { DBResponse } from '../../services/utils'

export interface IBlogService {
    helloService(): Promise<Object>;
    getAutocompleteUrls(): Promise<DBResponse>;
    addBlog(blogDetails: Object): Promise<DBResponse>;
    getBlog(id: String): Promise<DBResponse>;
    getBlogTraffic(blogDetails: Object): Promise<DBResponse>;
    getLatestBlogTraffic(blogUrl: String): Promise<DBResponse>;
    getBlogMonetizeEntities(country: String): Promise<DBResponse>;
    getBlogCountryMetric(blogCountryFilters: Object): Promise<DBResponse>;
    getTimePeriodEntitiesMetric(): Promise<DBResponse>;
    deleteBlog(blogDetails: Object): Promise<DBResponse>;
}