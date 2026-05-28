

//Instructions to every other classs
//on hnow they can be an argument to "addMarker"

export interface Mappable {
    location: {
        latitude: number;
        longitude: number;
    };

    markerContent(): string;

}



export class CustomeMap {

    private googleMap: google.maps.Map;

    constructor(divId: string) {
      this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
      
        zoom: 1,
        center: { 
            lat: 0, 
            lng: 0 
        }
      });
    }

    addMarker(mappable: Mappable): void {

        const marker = new google.maps.Marker({
           
            map: this.googleMap,
        
            position: {
                lat: mappable.location.latitude,
                lng: mappable.location.longitude
            }       
        });    

        marker.addListener("click", () => {
            const infowWindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            });

            infowWindow.open(this.googleMap, marker);
        });
    }

}


    /*addUserMarker(user: User): void {
        new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: user.location.latitude,
                lng: user.location.longitude
         }       
        });    
    }

    addCompanyMarker(company: Company): void {
        new google.maps.Marker({
            map: this.googleMap,
            position: { 
                lat: company.location.latitude,
                lng: company.location.longitude
            }
        });*/


