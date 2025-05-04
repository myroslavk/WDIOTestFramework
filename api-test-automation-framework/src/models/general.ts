export enum Method {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface DefaultOptions {
    body?: object,
    pathParams?: object,
    queryParams?: object,
    headers?: object,
}