/** Libraries */
export const nconf = 'nconf';
export const mongoose = 'mongoose';

/** Services */
export const Blog = 'Blog';
export const BlogPost = 'BlogPost';
export const BlogCountryMetric = 'BlogCountryMetric';
export const BlogTimePeriodEntitiesMetric = 'BlogTimePeriodEntitiesMetric';
export const BlogMonetizeEntities = 'BlogMonetizeEntities';
export const UserCredential = 'UserCredential';

export const SERVICE_IDENTIFIER = {
    BlogCtrl: Symbol.for("BlogCtrl"),
    BlogService: Symbol.for("BlogService"),
    BlogRepository: Symbol.for("BlogRepository"),
    UserCtrl: Symbol.for("UserCtrl"),
    UserService: Symbol.for("UserService"),
    UserRepository: Symbol.for("UserRepository")
}