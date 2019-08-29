/** Libraries */
export const nconf = 'nconf';
export const mongoose = 'mongoose';

/** Services */
export const Blog = 'Blog';
export const BlogPost = 'BlogPost';

export const SERVICE_IDENTIFIER = {
    BlogCtrl: Symbol.for("BlogCtrl"),
    BlogService: Symbol.for("BlogService"),
    BlogRepository: Symbol.for("BlogRepository"),
}