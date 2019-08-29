import { Response } from 'express';
/**
 * Helper function to format Response
 * @param res 
 * @param status 
 * @param message 
 * @param data 
 * @param additionalMetadata 
 */
export const sendJsonResponse = function(res: Response, status: number, message: string, data = {}, additionalMetadata = {}) {
    let result;
    if (data !== {}) {
        result = data['data'];
    }
    const jsonResponse: any = {
        data: {
            result
        },
        metadata: {
            status,
            message,
        },
    };
    Object.assign(jsonResponse.metadata, additionalMetadata);

    return res
        .status(status)
        .send(jsonResponse);
};

export interface DBResponse {
    error: boolean;
    data: any;
}