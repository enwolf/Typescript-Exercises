import faker from "faker"
import { Mappable } from './CustomeMap';

export class Company implements Mappable
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

        markerContent(): string{
        return `
          <div>
            <h1>Company Name: ${this.companyName} </h1>
            <h3>Catch Phrase: ${this.catchPharese}</h3>
          </div>
        `; //same as writing => return "Company Name: " + this.companyName; or return `Company Name: ${this.companyName}`;
    }

};
