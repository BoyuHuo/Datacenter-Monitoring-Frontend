export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
    // addressList: object[];

    constructor(id, firstName, lastName, email, phone, company = '') {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.company = company;
    }

}
