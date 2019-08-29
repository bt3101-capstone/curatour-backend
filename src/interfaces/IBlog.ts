import { Document } from 'mongoose';

export interface IBlogPost extends Document {
    blogPostUrl: string;
    blogPost: string;
    countries: string[];
    cities: string[];
    placesOfInterest: string[];
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