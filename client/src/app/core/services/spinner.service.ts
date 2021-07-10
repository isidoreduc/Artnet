import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  counter = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  busyServer = () => {
    this.counter++;
    this.spinnerService.show(undefined, 
      {
        type: "ball-newton-cradle",
        bdColor: "rgba(0,0,0,0.7)",
        color: "#fff"
      })
  };

  idleServer = () => {
    this.counter = 0;
    this.spinnerService.hide()
  }


}
