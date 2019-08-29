import { Document } from 'mongoose';

export interface IBlog extends Document {
    blogId: string;
    blogUrl: string;
    blogPost: string;
    placesOfInterest: string[];
    spacyNer: string[];
    awsNer: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IBlogMetric extends Document {
    blogId: string;
    blogTrafficCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface ITopBlogSites extends Document {
    scrapedAt: string;
    topFive: string[];
}