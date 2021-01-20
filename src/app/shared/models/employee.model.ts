export class Employee {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public email: string,
        public password: string,
        public roleId: number,
        public token: string,
    ){

    }
}
