import { Document } from 'mongoose';

export interface IBlogPost extends Document {
    blogUrl: string;
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
    createdAt: string;
    updatedAt: string;
}

export interface IBlogMetric extends Document {
    blogUrl: string;
    blogTrafficCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface ITopBlogSites extends Document {
    scrapedAt: string;
    topTen: Array<string|number>;
}