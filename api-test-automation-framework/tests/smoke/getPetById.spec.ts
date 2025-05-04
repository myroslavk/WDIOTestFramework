import { expect } from 'chai';
import { ErrorType, generateCreatePetBody } from '../../src/testData.ts';
import { petController } from '../../src/controllers/petController.ts';
import { CreatePetOptions, GetPetByIdOptions } from '../../src/models/petController.ts';

describe('Get pet by id', () => {
    const createPetRequestBody = generateCreatePetBody();
    const petId = createPetRequestBody.id;

    before(async () => {
        const response = await petController.createPet<CreatePetOptions>({ body: createPetRequestBody });

        expect(response.status).to.eql(200);
        expect(response.body.name).to.eql(createPetRequestBody.name);
        expect(response.body.photoUrls).to.deep.eq(createPetRequestBody.photoUrls);
        expect(response.body.category).to.deep.eq(createPetRequestBody.category);
        expect(response.body.tags).to.deep.eq(createPetRequestBody.tags);
        expect(response.body.status).to.eql(createPetRequestBody.status);
    });

    context('Positive', () => {
        it('Get pet by id', async () => {
            const response = await petController.getPetById<GetPetByIdOptions>({ pathParams: { petId }});

            expect(response.status).to.eql(200);
            expect(response.body.id).to.eql(createPetRequestBody.id);
            expect(response.body.name).to.eql(createPetRequestBody.name);
            expect(response.body.photoUrls).to.deep.eq(createPetRequestBody.photoUrls);
            expect(response.body.category).to.deep.eq(createPetRequestBody.category);
            expect(response.body.tags).to.deep.eq(createPetRequestBody.tags);
            expect(response.body.status).to.eql(createPetRequestBody.status);
        });
    });

    context('Negative', () => {
        const errorType = ErrorType.unknownErrorType;
        const incorrectIdValues = [false , null, undefined, NaN];
        incorrectIdValues.forEach(incorrectValue => {
            it(`Try to get pet by incorrect id = "${incorrectValue}"`, async () => {
                const response = await petController.getPetById({ pathParams: { petId: incorrectValue }});

                expect(response.status).to.eq(404);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.contain(incorrectValue);
            });
        });

        it('Try to get pet by id that contains special characters', async () => {
            const specialCharactersId = '[<>?"!@#$%^&*()|}\\,.;]';
            const response = await petController.getPetById({ pathParams: { petId: specialCharactersId }});

            expect(response.status).to.eq(400);
        });
    });
});
