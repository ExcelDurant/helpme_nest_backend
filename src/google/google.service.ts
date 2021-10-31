import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class GoogleService {
    constructor(private httpService: HttpService) {}

    getAddress(latitude, longitude): any {
        let API_KEY = "AIzaSyCyPxV13R9jmgqdYVffi_yCIduBg4khhn0"
        return this.httpService.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`) .pipe(
            map(response => {
                return {
                    // street:response.data.results,
                    street:response.data.results[2].address_components[0].long_name,
                    city:response.data.results[2].address_components[1].long_name,
                    country:response.data.results[2].address_components[4].long_name
                }
            }),
          );
      }
}
