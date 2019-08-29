import { Document } from 'mongoose';

export interface ILocation extends Document {
    country: string;
    city: string;
    placesOfInterest: Array<Array<string|number|number>>;
}