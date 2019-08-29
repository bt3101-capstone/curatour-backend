import { Document } from 'mongoose';

export interface ILocation extends Document {
    country: string;
    city: string;
    placesOfInterest: string[];
}