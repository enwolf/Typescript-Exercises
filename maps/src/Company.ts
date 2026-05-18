import faker from "faker"

export class Company
{
 
    companyName: string;
    catchPharese: string;
    location: 
    {
        latitude: number;
        longitude: number;
    };

    constructor() 
    {

        this.companyName = faker.company.companyName();
        this.catchPharese = faker.company.catchPhrase();
        this.location = 
        {
            latitude: parseFloat(faker.address.latitude()),
            longitude: parseFloat(faker.address.longitude())
        };
    }

};
