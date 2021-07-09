import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-breadcrumb',
  templateUrl: './section-breadcrumb.component.html',
  styleUrls: ['./section-breadcrumb.component.scss']
})
export class SectionBreadcrumbComponent implements OnInit {

  constructor(public breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
  }

}
