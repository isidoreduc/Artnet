import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  date = environment.date;
  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void { }

}
