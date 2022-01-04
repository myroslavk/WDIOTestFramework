export const generateCreatePetBody = () => {
    return {
        id: Math.floor(Math.random() * 10000 + 1),
        category: {
            id: 1,
            name: 'Category_1'
        },
        name: 'Moon Active petty',
        photoUrls: [
            TestData.TestUrl
        ],
        tags: [
            {
                id: 1,
                name: 'Tag_1'
            }
        ],
        status: 'Sweetest petty in the world!'
    };
};

export const TestData = {
    TestUrl: 'https://www.testUrl.com'
};

export const ErrorType = {
    unknownErrorType: 'unknown'
};
