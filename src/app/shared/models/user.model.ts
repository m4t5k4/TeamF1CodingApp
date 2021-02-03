import { Role } from "./role.model";

export class User {
    constructor(
        public id: number,
        public firstname: String,
        public lastname: String,
        public username: String,
        public password: String,
        public roles: Role[]
    ){}
}
