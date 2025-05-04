import { expect } from "chai";
import { petController } from "../../src/controllers/petController";
import { CreatePetOptions, GetPetByIdOptions } from "../../src/models/petController";
import { generateCreatePetBody } from "../../src/testData";

describe('API pet controller', () => {
    it('Create pet and get it', async () => {
        const createPetRequestBody = generateCreatePetBody();
        const createPetResponse = await petController.createPet<CreatePetOptions>({ body: createPetRequestBody });

        expect(createPetResponse.status).to.eql(200);
        expect(createPetResponse.body.id).to.eql(createPetRequestBody.id);
        expect(createPetResponse.body.name).to.eql(createPetRequestBody.name);
        expect(createPetResponse.body.photoUrls).to.deep.eq(createPetRequestBody.photoUrls);
        expect(createPetResponse.body.category).to.deep.eq(createPetRequestBody.category);
        expect(createPetResponse.body.tags).to.deep.eq(createPetRequestBody.tags);
        expect(createPetResponse.body.status).to.eql(createPetRequestBody.status);

        const petId = createPetResponse.body.id
        const getPetByIdResponse = await petController.getPetById<GetPetByIdOptions>({ pathParams: { petId }});

        expect(getPetByIdResponse.status).to.eql(200);
        expect(getPetByIdResponse.body.id).to.eql(createPetRequestBody.id);
        expect(getPetByIdResponse.body.name).to.eql(createPetRequestBody.name);
        expect(getPetByIdResponse.body.photoUrls).to.deep.eq(createPetRequestBody.photoUrls);
        expect(getPetByIdResponse.body.category).to.deep.eq(createPetRequestBody.category);
        expect(getPetByIdResponse.body.tags).to.deep.eq(createPetRequestBody.tags);
        expect(getPetByIdResponse.body.status).to.eql(createPetRequestBody.status);
    });
});