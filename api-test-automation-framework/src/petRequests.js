import supertest from 'supertest';
import { generateHeaders } from './generateHeaders';

const baseUrl = 'https://petstore.swagger.io/v2';
/**
 * @param petId - path parameter for getting pet
 * @param headers - request headers should be an object with key-value pair
 * @returns response
 */
const getPetById = async (petId, headers) => {
    return await supertest(baseUrl)
        .get(`/pet/${petId}`)
        .set(generateHeaders(headers));
};
/**
 * @param body - request body
 * @param headers - request headers should be an object with key-value pair
 * @returns response
 */
const createPet = async (body, headers) => {
    return await supertest(baseUrl)
        .post('/pet')
        .set(generateHeaders(headers))
        .send(body);
};

export const petRequests = {
    getPetById,
    createPet
};
