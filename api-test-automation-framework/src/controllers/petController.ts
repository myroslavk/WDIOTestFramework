import { PetEndpoint } from '../endpoints.ts';
import { requestHelper } from '../helpers/requestHelper.ts';
import { Method } from '../models/general.ts';

class PetController {
    async getPetById<Options>(options: Options) {
        return await requestHelper.send(PetEndpoint.PET_BY_ID, Method.GET, options);
    }

    async createPet<Options>(options: Options) {
        return await requestHelper.send(PetEndpoint.PET, Method.POST, options);
    }
}

export const petController = new PetController();
