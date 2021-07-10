import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date: Date;
  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    this.date = new Date();
  }

}
