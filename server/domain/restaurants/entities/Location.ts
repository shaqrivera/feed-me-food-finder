export class Location {
    constructor(
        private readonly address1: string,
        private readonly address2: string,
        private readonly address3: string,
        private readonly city: string,
        private readonly zipCode: string,
        private readonly country: string,
        private readonly state: string,
        private readonly displayAddress: string[], 
      ) {}
      
      static create(
        address1: string,
         address2: string,
         address3: string,
         city: string,
         zipCode: string,
         country: string,
         state: string,
         displayAddress: string[]) {
            return new Location(address1, address2, address3, city, zipCode, country, state, displayAddress)
         }

         static restore (data: any) {
            return new Location(data.address1, data.address2, data.address3, data.city, data.zipCode, data.country, data.state, data.displayAddress)
         }
}