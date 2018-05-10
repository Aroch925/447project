import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../auth/user';
import { UserService } from './../auth/user.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  result1: string;
  result2: string;
  result3: string;
  result4: string;
  result5: string;
  result6: string;
  result7: string;
  result8: string;
  result9: string;
  result10: string;

  info = ['', '', '', '', '', '', '', '', '', ''];
  n = 30;
  pictures = Array(this.n).join('.').split('.');
  panel_description: string;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(37.09024, -95.712891),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.setCounties();
  }

  setCounties() {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getResults(currentUser.userName).subscribe(
      data => {
        this.setFusionLayer(data);
        this.result1 = data['result1'];
        this.result2 = data['result2'];
        this.result3 = data['result3'];
        this.result4 = data['result4'];
        this.result5 = data['result5'];
        this.result6 = data['result6'];
        this.result7 = data['result7'];
        this.result8 = data['result8'];
        this.result9 = data['result9'];
        this.result10 = data['result10'];
        this.getInfo(this.result1, 0);
        this.getInfo(this.result2, 1);
        this.getInfo(this.result3, 2);
        this.getInfo(this.result4, 3);
        this.getInfo(this.result5, 4);
        this.getInfo(this.result6, 5);
        this.getInfo(this.result7, 6);
        this.getInfo(this.result8, 7);
        this.getInfo(this.result9, 8);
        this.getInfo(this.result10, 9);
        this.getPhotos(this.result1, 0);
        this.getPhotos(this.result2, 3);
        this.getPhotos(this.result3, 6);
        this.getPhotos(this.result4, 9);
        this.getPhotos(this.result5, 12);
        this.getPhotos(this.result6, 15);
        this.getPhotos(this.result7, 18);
        this.getPhotos(this.result8, 21);
        this.getPhotos(this.result9, 24);
        this.getPhotos(this.result10, 27);
        this.panel_description = 'Click For More Info';
      }
    );

  }

  setFusionLayer(counties) {
    const arr = [counties['result1'], counties['result2'], counties['result3'], counties['result4'], counties['result5'],
                counties['result6'], counties['result7'], counties['result8'], counties['result9'], counties['result10']];
    const where = this.getWhereString(arr);
    const layer = new google.maps.FusionTablesLayer({
      query: {
        select: 'geometry',
        from: '1xdysxZ94uUFIit9eXmnw1fYc6VcQiXhceFd_CVKa',
        where: where
      },
      styles: [{
        markerOptions: {
          iconName: 'large_red'
        },
        polygonOptions: {
          fillOpacity : 0.5
        }
      }]
    });
    layer.setMap(this.map);
  }

  getWhereString(counties) {
    let whereString = '\'Geographic Name\' IN (';
    for (const i of counties) {
      whereString += ('\'' + i.slice(0, -4) + ', ' + this.stateLookup(i.slice(-2)) + '\'');
      whereString += ',';
    }
    whereString = whereString.slice(0, -1);
    whereString += ')';

    return whereString;
  }

  getInfo(result, index) {
    const county = result.slice(0, -4) + ', ' + this.stateLookup(result.slice(-2));
    // tslint:disable-next-line:max-line-length
    this.http.get('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + county).subscribe(
      data => {
        this.info[index] = data['query']['pages'][Object.keys(data['query']['pages'])[0]]['extract'];
      }
    );
  }

  getPhotos(result, index) {
    const options = {
      'api_key': '3110b3dc88002e87bc291048a3bdc6bb',
      'method': 'flickr.photos.search', // You can replace this with whatever method,
      'per_page': '3',
      'extras': 'url_m',
      'format': 'json',
      'nojsoncallback': '1',
      'text': result  // This is where you'll put your "file name"
    };
    let url = 'https://api.flickr.com/services/rest/';
    let first = true;
    for (const item in options) {
      if (options.hasOwnProperty(item)) {
        url += (first ? '?' : '&') + item + '=' + options[item];
        first = false;
      }
    }
    this.http.get(url).subscribe(
      data => {
        const arrlen = data['photos']['photo'].length;
        // tslint:disable-next-line:max-line-length
        this.pictures[index] = data['photos']['photo'][0]['url_m'];
        this.pictures[index + 1] = data['photos']['photo'][1]['url_m'];
        this.pictures[index + 2] = data['photos']['photo'][2]['url_m'];
      }
    );

  }


  resetMap() {
    const center = new google.maps.LatLng(37.09024, -95.712891);
    this.map.setZoom(4);
    this.map.setCenter(center);
  }

  zoomIn1() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result1 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }
  zoomIn2() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result2 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }

  zoomIn3() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result3 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }
  zoomIn4() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result4 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }

  zoomIn5() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result5 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }

  zoomIn6() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result6 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }
  zoomIn7() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result7 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }

  zoomIn8() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result8 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }
  zoomIn9() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result9 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }

  zoomIn10() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.result10 +
    '&key=AIzaSyCiQ2sFkylhbHIgpKNb3iIbPN2cFmbkles').subscribe(
      data => {
        this.map.setZoom(9);
        this.map.setCenter(data['results'][0]['geometry']['location']);
      });
  }

  stateLookup(abr: string) {
    const states = [
      ['Arizona', 'AZ'],
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Pennsylvania', 'PA'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ];

    for (let i = 0; i < states.length; i++) {
      if (states[i][1] === abr) {
          return(states[i][0]);
      }
    }
  }
}
