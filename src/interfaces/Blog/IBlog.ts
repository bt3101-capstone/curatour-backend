import { Document } from 'mongoose';

export interface ILocation extends Document {
    country: string;
    city: string;
    placesOfInterest: Array<Array<string|number|number>>;
}

export interface IBlogPost extends Document {
    blogPostUrl: string;
    blogPost: string;
    locations: ILocation[];
    spacyNer: [{
        startIdx: number,
        endIdx: number,
        entity: string
    }];
    awsNer: string[];
    writtenAt: string;
}

export interface IBlog extends Document {
    blogUrl: string;
    blogTrafficCount: number;
    blogs: IBlogPost[];
    createdAt: string;
    updatedAt: string;
}

export interface ITopBlogSites extends Document {
    scrapedAt: string;
    topTen: Array<string|number>;
}