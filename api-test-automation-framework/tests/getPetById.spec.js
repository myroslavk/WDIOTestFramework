import { petRequests } from '../src/petRequests';
import { expect } from 'chai';
import { ErrorType, generateCreatePetBody } from '../src/testData';

describe('Get pet by id', () => {
    const createPetRequestBody = generateCreatePetBody();
    const id = createPetRequestBody.id;

    before(async () => {
        const response = await petRequests.createPet(createPetRequestBody);

        expect(response.status).to.eql(200);
        expect(response.body.id).to.eql(createPetRequestBody.id);
        expect(response.body.name).to.eql(createPetRequestBody.name);
        expect(response.body.photoUrls).to.deep.eql(createPetRequestBody.photoUrls);
        expect(response.body.category).to.deep.eql(createPetRequestBody.category);
        expect(response.body.tags).to.deep.eql(createPetRequestBody.tags);
        expect(response.body.status).to.eql(createPetRequestBody.status);
    });

    context('Positive', () => {
        it('Get pet by id', async () => {
            const response = await petRequests.getPetById(id);

            expect(response.status).to.eql(200);
            expect(response.body.id).to.eql(createPetRequestBody.id);
            expect(response.body.name).to.eql(createPetRequestBody.name);
            expect(response.body.photoUrls).to.deep.eql(createPetRequestBody.photoUrls);
            expect(response.body.category).to.deep.eql(createPetRequestBody.category);
            expect(response.body.tags).to.deep.eql(createPetRequestBody.tags);
            expect(response.body.status).to.eql(createPetRequestBody.status);
        });
    });

    context('Negative', () => {
        const errorType = ErrorType.unknownErrorType;
        const incorrectIdValues = [false , null, undefined, NaN];
        incorrectIdValues.forEach(incorrectValue => {
            it(`Try to get pet by incorrect id = "${incorrectValue}"`, async () => {
                const response = await petRequests.getPetById(incorrectValue);

                expect(response.status).to.eq(404);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.contain(incorrectValue);
            });
        });

        it('Try to get pet by id that contains special characters', async () => {
            const specialCharactersId = '[<>?"!@#$%^&*()|}\\,.;]';
            const response = await petRequests.getPetById(specialCharactersId);

            expect(response.status).to.eq(400);
        });
    });
});
