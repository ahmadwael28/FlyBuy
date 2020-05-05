import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css']
})
export class ProductsSectionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  goProductDetails(id)
  {
      this.router.navigateByUrl(`Products/${id}`);
  }

  @Input() ProductsInput;
  @Input() CategoryNameInput;
}
