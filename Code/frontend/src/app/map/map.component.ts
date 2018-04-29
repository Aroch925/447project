import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: any;
  longitude: any;

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(37.09024, -95.712891),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    const marker1 = new google.maps.Marker({
      position: new google.maps.LatLng(39.9526, -75.1652),
      title: 'Philadelphia'
    });

    marker1.addListener('click', function() {
      this.map.setZoom(11);
      this.map.setCenter(marker1.getPosition());
    });

    const marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(34.0522, -118.2437),
      title: 'Orlando'
    });

    marker2.addListener('click', function() {
      this.map.setZoom(11);
      this.map.setCenter(marker2.getPosition());
    });

    const marker3 = new google.maps.Marker({
      position: new google.maps.LatLng(28.5383, -81.3792),
      title: 'Los Angeles'
    });

    marker3.addListener('click', function() {
      this.map.setZoom(11);
      this.map.setCenter(marker3.getPosition());
    });
    const marker4 = new google.maps.Marker({
      position: new google.maps.LatLng(35.5585, -75.4665),
      title: 'Outer Banks'
    });
    marker4.addListener('click', function() {
      this.map.setZoom(11);
      this.map.setCenter(marker4.getPosition());
    });
    const marker5 = new google.maps.Marker({
      position: new google.maps.LatLng(36.5323, -116.9325),
      title: 'Los Angeles'
    });
    marker5.addListener('click', function() {
      this.map.setZoom(11);
      this.map.setCenter(marker5.getPosition());
    });

    // To add the marker to the map, call setMap();
    marker1.setMap(this.map);
    marker2.setMap(this.map);
    marker3.setMap(this.map);
    marker4.setMap(this.map);
    marker5.setMap(this.map);
  }

}
