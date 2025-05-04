import supertest from 'supertest';
import queryString from 'query-string';
import { Method } from '../models/general.ts';

class RequestHelper {
    baseURL = 'https://petstore.swagger.io/v2';

    async send(url: string, method: Method, options: any = { body: {}, pathParams: {}, queryParams: {}, headers: {}}) {
        const generatedURL = this.generateURL(url, options.pathParams, options.queryParams);
        const headers = this.generateHeaders(options.headers);
        const body = { ...options.body };
        const agent = supertest(this.baseURL);
        let result;
        switch (method) {
            case Method.GET:
                result = await agent
                    .get(generatedURL)
                    .set(headers);
                break;
            case Method.POST:
                result = await agent
                    .post(generatedURL)
                    .send(body)
                    .set(headers)
                    .trustLocalhost(true);
                break;
            case Method.PUT:
                result = await agent
                    .put(generatedURL)
                    .send(body)
                    .set(headers);
                break;
            case Method.DELETE:
                result = await agent
                    .delete(generatedURL)
                    .send(body)
                    .set(headers);
                break;
            default:
                throw new Error(`Method "${method}" is not covered`);
            }

        return result;
    }

    generateHeaders = (headers: { [key: string]: string } = { }) => {
        // If Content-Type is not specified - set 'application/json'
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    };

    generateURL = (
        baseURL: string,
        pathParams: { [key: string]: string } = { },
        queryParams: { [key: string]: string } = { }
    ) => {
        let updatedURL = baseURL;

        // Replace path parameters
        for (const key in pathParams) {
            if (pathParams.hasOwnProperty(key)) {
                const placeholder = `:${key}`;
                updatedURL = updatedURL.replace(placeholder, pathParams[key]);
            }
        }

        // Update query parameters using query-string
        updatedURL += queryString.stringify({ ...queryParams }).toString();

        return updatedURL;
    };
}

export const requestHelper = new RequestHelper();
