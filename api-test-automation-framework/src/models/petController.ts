import { DefaultOptions } from "./general.ts";

export interface CreatePetOptions extends DefaultOptions {
    body: CreatePetRequestBody
}

export interface CreatePetRequestBody {
    id?: number
    category?: Category,
    name?: string,
    photoUrls?: string[],
    tags?: Tag[],
    status?: string
}

export interface Category {
    id: number,
    name: string,
}

export interface Tag {
    id: number,
    name: string
}

export interface GetPetByIdOptions extends  DefaultOptions {
    pathParams: {
        petId: number
    }
}