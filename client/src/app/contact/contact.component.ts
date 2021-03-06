import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { Icon, Style } from 'ol/style';
import Point from 'ol/geom/Point';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import { Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  date = environment.date;
  map: any;
  label = "Enter your message";
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createMap();
    this.createContactForm();
  }

  createMap = () => {
    const iconFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([10.1114, 56.1585])),
      name: 'Somewhere near Aarhus',
    });
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map = new Map({
      target: 'hotel_map',
      layers: [
        new TileLayer({
          source: new OSM()
        }), vectorLayer
      ],
      view: new View({
        center: olProj.fromLonLat([10.1114, 56.1585]),
        zoom: 10
      }),

    });
  };

  createContactForm = () => {

    this.contactForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.pattern("^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,7})$")]],
      message: [null, [Validators.required]],
    });
  };


  sendMessage = () => {
    const message = this.contactForm.value;
    this.contactService.createMessage(message).subscribe(
      () => {
        this.toastr.success("Message received");
        this.contactForm.reset();
      }, err => this.toastr.error(err.error.message, "Message failed. Please retry."));
  };
}
