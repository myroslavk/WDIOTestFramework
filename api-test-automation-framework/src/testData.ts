import { CreatePetRequestBody } from "./models/petController.ts";

export const generateCreatePetBody = (): Required<CreatePetRequestBody> => {
    return {
        id: Math.floor(Math.random() * 10000000 + 1),
        category: {
            id: 1,
            name: 'Category1'
        },
        name: 'Apollo',
        photoUrls: [
            TestData.TestUrl
        ],
        tags: [
            {
                id: 1,
                name: 'Tag1'
            }
        ],
        status: 'Sweetest kitten in the world!'
    };
};

export const TestData = {
    TestUrl: 'https://www.testUrl.com'
};

export const ErrorType = {
    unknownErrorType: 'unknown'
};
