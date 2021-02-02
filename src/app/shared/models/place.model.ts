import { TableLocation } from "./table-location.model";

export class Place {
    constructor(
        public id: number,
        public name: String,
        public tableLocation : TableLocation,
        public active : Boolean
    ){}
}
