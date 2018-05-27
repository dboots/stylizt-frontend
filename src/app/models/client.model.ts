export class Client {
    name: string;
    email: string;
    zip: string;
    image: string;
    owner: string;

    constructor(
        name: string,
        email: string,
        owner: string
    ) {
        this.name = name;
        this.email = email;
        this.owner = owner; 
    }
}