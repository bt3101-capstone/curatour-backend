import chalk from 'chalk';
import { injectable, inject } from 'inversify';
import { NextFunction } from 'express';
import { Model, Mongoose } from 'mongoose';
import { IBlogRepository } from '../../interfaces';
// import { Blog } from './BlogSchema';

const ns = '@BlogCtrl';
let LOG_CTX = chalk.cyan(`${ns} - Starting BlogCtrl`);
console.log(LOG_CTX);

@injectable()
export class BlogRepository implements IBlogRepository {

    public constructor(){}

    // constructor(
    //     mongoose: Mongoose,
    //     private collection: Model<IBlog>,
    // ) {
    //     super(mongoose, collection);
    // }

    public async helloRepository() {
        LOG_CTX = chalk.cyan(`${ns} - helloRepository()`);
        console.log(LOG_CTX);

        return 'ok repo';
    }
}