import { LocalTime } from "@js-joda/core";
import { Timestamp } from "rxjs";
import { User } from "./user.model";

export class Reservation {
    constructor(
        public id: number,
        public date: Date,
        public startHour: LocalTime,
        public endHour: LocalTime,
        public amountPersons: number,
        public description: string,
        public user: User,
    ){}
}
