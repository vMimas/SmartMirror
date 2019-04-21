
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-weather-tile',
    templateUrl: './weather-tile.component.html',
    styleUrls: ['./weather-tile.component.scss']
})
export class WeatherTileComponent implements OnInit {

    private appId: string;
    private appCode: string;

    public weather: any[] = [];
    public dayOne: any;
    public test;

    public constructor(private http: HttpClient) {
        this.appId = '2Q8MPLLHU32OYbQcMOER';
        this.appCode = 'GbUWs-YamQQ_OxkUbsXkJw';
    }

    public ngOnInit() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            this.getWeather(position.coords)
            .subscribe(result => {
              this.weather = result.forecast;
              this.dayOne = this.weather[0];
          }, error => {
              console.error(error);
          });
        });
    } else {
        console.error('The browser does not support geolocation...');
    }

    }

    public getWeather(coordinates: any) {
      // tslint:disable-next-line:max-line-length
      return this.http.jsonp('https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=' + coordinates.latitude + '&longitude=' + coordinates.longitude + '&app_id=' + this.appId + '&app_code=' + this.appCode, 'jsonpCallback')
        .pipe(map(result => (result as any).dailyForecasts.forecastLocation));
    }

}


