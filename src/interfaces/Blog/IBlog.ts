import { Document } from 'mongoose';

export interface ILocation extends Document {
    country: string;
    city: string;
    placesOfInterest: Array<Array<string|string|number|number>>;
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

export interface IHistoricalData extends Document {
    date: string;
    pageViews: {
        perMillion: number,
        perUser: number
    };
    rank: number;
    reach: {
        perMillion: number
    };
}

export interface IUsageData extends Document {
    timeRange: {
        period: string,
        count: number
    };
    rank: {
        value: number,
        delta: number
    };
    reach: {
        rank: {
            value: number,
            delta: number
        },
        perMillion: {
            value: number,
            delta: number
        }
    };
    pageViews: {
        rank: {
            value: number,
            delta: number
        },
        perMillion: {
            value: number,
            delta: number
        },
        perUser: {
            value: number,
            delta: number
        }
    };
}

export interface IContentData extends Document {
    speed: {
        medianLoadTime: number,
        percentile: number
    };
}

export interface ITraffic extends Document {
    historicalData?: IHistoricalData[];
    usageData?: IUsageData[];
    contentData?: IContentData[];
}

// Un-strict declaration
export interface IBlog extends Document {
    blogUrl: string;
    blogTraffic?: {
        historicalData: any,
        usageData: any,
        contentData: any
    };
    blogs: any;
    createdAt: string;
    updatedAt: string;
}

export interface ITopBlogSites extends Document {
    scrapedAt: string;
    topTen: Array<string|number>;
}

export interface IBlogCountryMetric extends Document {
    country: string;
    year: string;
    entities: [{
        name: string,
        data: [
            {
                x: string,
                y: number
            }
        ]
    }];
}

export interface IBlogTimePeriodEntitiesMetric extends Document {
    timePeriod: string;
    entities: { [key: string]: number }
}

export interface IBlogMonetizeEntities extends Document {
    country: string;
    entities: [
        {
            entity: string,
            city: string
        }
    ]
}