import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  @Input() ProductsInput;
  @Input() CategoryNameInput;
}
