export interface IBlogCtrl {
    helloWorld(req: any, res: any, nextFunction: any): Promise<Object>;
    addBlog(req: any, res: any, nextFunction: any): Promise<void>;
    getBlog(req: any, res: any, nextFunction: any): any;
    getBlogTraffic(req: any, res: any, nextFunction: any): any;
    deleteBlog(req: any, res: any, nextFunction: any): any;
}