import { Arc } from "./Arc";

export interface Anime {
    _id: string,
    name: string,
    year: number,
    imageURL: string,

    arcs: Array<Arc>
}
