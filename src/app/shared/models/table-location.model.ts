import { Location } from "./location.model";

export class TableLocation {
    constructor(
        public id: number,
        public name: string,
        public zone: string,
        public location: Location
    ){}
}
