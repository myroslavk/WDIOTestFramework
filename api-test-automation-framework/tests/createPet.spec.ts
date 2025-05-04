import { petController } from '../src/controllers/petController.ts';
import { expect } from 'chai';
import { ErrorType, generateCreatePetBody, TestData } from '../src/testData.ts';
import { CreatePetOptions, Tag } from '../src/models/petController.ts';

describe('Create pet', () => {
    let createPetRequestBody;
    before(() => {
        createPetRequestBody = generateCreatePetBody();
    })

    context('Positive', () => {
        it('Create pet with full information', async () => {
            const response = await petController.createPet<CreatePetOptions>({ body: createPetRequestBody });

            expect(response.status).to.eql(200);
            expect(response.body.id).to.eql(createPetRequestBody.id);
            expect(response.body.name).to.eql(createPetRequestBody.name);
            expect(response.body.photoUrls).to.deep.eq(createPetRequestBody.photoUrls);
            expect(response.body.category).to.deep.eq(createPetRequestBody.category);
            expect(response.body.tags).to.deep.eq(createPetRequestBody.tags);
            expect(response.body.status).to.eql(createPetRequestBody.status);
        });

        const photoUrlsQuantities = [2, 10, 100];
        photoUrlsQuantities.forEach(photoUrlsQuantity => {
            it(`Create pet with photo urls quantity: "${photoUrlsQuantity}"`, async () => {
                const body = generateCreatePetBody();
                body.photoUrls = Array(photoUrlsQuantity).fill(TestData.TestUrl);

                const response = await petController.createPet<CreatePetOptions>({ body });

                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql(body.name);
                expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
                expect(response.body.photoUrls.length).to.eq(photoUrlsQuantity);
                expect(response.body.photoUrls.every(photoUrl => photoUrl == TestData.TestUrl)).to.be.true;
                expect(response.body.category).to.deep.eq(body.category);
                expect(response.body.tags).to.deep.eq(body.tags);
                expect(response.body.status).to.eql(body.status);
            });
        });

        const tagsQuantities = [2, 10, 100];
        tagsQuantities.forEach(tagsQuantity => {
            it(`Create pet with tags quantity = "${tagsQuantity}"`, async () => {
                const body = generateCreatePetBody();
                const tags: Tag[] = [];
                for (let i = 0; i < tagsQuantity; i += 1) {
                    tags.push({
                        id: i,
                        name: `tagName${i}`
                    });
                }
                body.tags = tags;

                const response = await petController.createPet<CreatePetOptions>({ body });

                expect(response.status).to.eql(200);
                expect(response.body.name).to.eql(body.name);
                expect(response.body.tags).to.deep.eq(body.tags);
                expect(response.body.tags.length).to.eq(tagsQuantity);
                expect(response.body.category).to.deep.eq(body.category);
                expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
                expect(response.body.status).to.eql(body.status);
            });
        });

        it('Create pet without "photoUrl" key', async () => {
            const body = { ...createPetRequestBody };
            delete body.photoUrls;

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.name).to.eql(body.name);
            expect(response.body.photoUrls).to.be.empty;
            expect(response.body.category).to.deep.eq(body.category);
            expect(response.body.tags).to.deep.eq(body.tags);
            expect(response.body.status).to.eql(body.status);
        });

        it('Create pet without "category" key', async () => {
            const body = { ...createPetRequestBody };
            delete body.category;

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.name).to.eql(body.name);
            expect(response.body.category).to.be.undefined;
            expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
            expect(response.body.tags).to.deep.eq(body.tags);
            expect(response.body.status).to.eql(body.status);
        });

        it('Create pet without "tags" key', async () => {
            const body = { ...createPetRequestBody };
            delete body.tags;

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.name).to.eql(body.name);
            expect(response.body.tags).to.be.empty;
            expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
            expect(response.body.category).to.deep.eq(body.category);
            expect(response.body.status).to.eql(body.status);
        });

        it('Create pet without "status" key', async () => {
            const body = { ...createPetRequestBody };
            delete body.status;

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.name).to.eql(body.name);
            expect(response.body.status).to.be.undefined;
            expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
            expect(response.body.category).to.deep.eq(body.category);
            expect(response.body.tags).to.eql(body.tags);
        });

        it('Create pet without "id" key', async () => {
            const body = { ...createPetRequestBody };
            delete body.id;

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.id).is.not.undefined;
            expect(response.body.name).to.eql(body.name);
            expect(response.body.status).to.eql(body.status);
            expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
            expect(response.body.category).to.deep.eq(body.category);
            expect(response.body.tags).to.eql(body.tags);
        });

        it('Create pet without "name" key', async () => {
            const body = { ...createPetRequestBody };
            delete body.name;

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.name).is.undefined;
            expect(response.body.id).to.eql(body.id);
            expect(response.body.status).to.eql(body.status);
            expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
            expect(response.body.category).to.deep.eq(body.category);
            expect(response.body.tags).to.eql(body.tags);
        });

        it('Create pet with empty "name" key', async () => {
            const body = { ...createPetRequestBody };
            body.name = '';

            const response = await petController.createPet<CreatePetOptions>({ body });

            expect(response.status).to.eql(200);
            expect(response.body.name).to.eq(body.name);
            expect(response.body.id).to.eql(body.id);
            expect(response.body.status).to.eql(body.status);
            expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
            expect(response.body.category).to.deep.eq(body.category);
            expect(response.body.tags).to.eql(body.tags);
        });
    });

    context('Negative', () => {
        /**
         * Note: in the real-world test app we shouldn't expect 500 error codes in our negative tests.
         * But let say it is expected behaviour in there tests.
         */
        const errorMessage = 'something bad happened';
        const errorType = ErrorType.unknownErrorType;
        const incorrectIdValues = [false, {}];
        incorrectIdValues.forEach(incorrectValue => {
            it(`Try to create pet with incorrect id = "${incorrectValue}"`, async () => {
                const body = { ...createPetRequestBody }
                body.id = incorrectValue;

                const response = await petController.createPet({ body });

                expect(response.status).to.eq(500);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.eq(errorMessage);
            });
        });

        const incorrectIds = [-100, 0, null, NaN, ''];
        incorrectIds.forEach(id => {
            it(`Create pet "id" key = "${id}"`, async () => {
                const body = { ...createPetRequestBody };
                body.id = id;

                const response = await petController.createPet<CreatePetOptions>({ body });

                expect(response.status).to.eql(200);
                expect(response.body.id).not.eq(id);
                expect(response.body.name).to.eql(body.name);
                expect(response.body.status).to.eql(body.status);
                expect(response.body.photoUrls).to.deep.eq(body.photoUrls);
                expect(response.body.category).to.deep.eq(body.category);
                expect(response.body.tags).to.eql(body.tags);
            });
        });

        const incorrectNameValues = [{ }];
        incorrectNameValues.forEach(incorrectValue => {
            it(`Try to create pet with incorrect name = "${incorrectValue}"`, async () => {
                const body = { ...createPetRequestBody }
                body.name = incorrectValue;

                const response = await petController.createPet({ body });

                expect(response.status).to.eq(500);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.eq(errorMessage);
            });
        });

        const incorrectCategoryValues = [false, ''];
        incorrectCategoryValues.forEach(incorrectValue => {
            it(`Try to create pet with incorrect category = "${incorrectValue}"`, async () => {
                const body = { ...createPetRequestBody }
                body.category = incorrectValue;

                const response = await petController.createPet({ body });

                expect(response.status).to.eq(500);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.eq(errorMessage);
            });
        });

        const incorrectPhotoUrlsValues = [false, '', {}];
        incorrectPhotoUrlsValues.forEach(incorrectValue => {
            it(`Try to create pet with incorrect photoUrls = "${incorrectValue}"`, async () => {
                const body = { ...createPetRequestBody }
                body.photoUrls = incorrectValue;

                const response = await petController.createPet({ body });

                expect(response.status).to.eq(500);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.eq(errorMessage);
            });
        });

        const incorrectTagsValues = [false, '', {}];
        incorrectTagsValues.forEach(incorrectValue => {
            it(`Try to create pet with incorrect tags = "${incorrectValue}"`, async () => {
                const body = { ...createPetRequestBody }
                body.tags = incorrectValue;

                const response = await petController.createPet({ body });

                expect(response.status).to.eq(500);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.eq(errorMessage);
            });
        });

        const incorrectStatusValues = [{}];
        incorrectStatusValues.forEach(incorrectValue => {
            it(`Try to create pet with incorrect status = "${incorrectValue}"`, async () => {
                const body = { ...createPetRequestBody }
                body.status = incorrectValue;

                const response = await petController.createPet({ body });

                expect(response.status).to.eq(500);
                expect(response.body.type).to.eq(errorType);
                expect(response.body.message).to.eq(errorMessage);
            });
        });
    });
});
