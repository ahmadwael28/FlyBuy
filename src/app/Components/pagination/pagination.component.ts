import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  nPages;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  @Input() Npages;

  ngOnChanges(changes:SimpleChange)
  {
    console.log(this.Npages);
    this.nPages = Array(this.Npages).fill(this.Npages);
  }

  @Output() RequestPage = new EventEmitter<number>();

  UpdateProductsSection(event): void {
    var selectedPage = event.target.innerText;
    this.RequestPage.emit(selectedPage);
  }

}
