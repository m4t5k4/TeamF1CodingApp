import { Timestamp } from "rxjs";

export class Reservation {
    constructor(
        public id: number,
        public persoonId: number,
        public datum: Date,
        public startHour: Date,
        public endHour: Date,
        public amountPersons: number,
        public description: string,
    ){}
}
