import { Component, OnInit, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  nPages;
  CurrentPage = 1;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  @Input() Npages;

  ngOnChanges(changes:SimpleChange)
  {
    console.log(this.Npages);
    this.nPages = Array(this.Npages).fill(this.Npages);
    this.UpdateProductsSectionManually(1);
    this.UpdateButtons();
  }


  Previous()
  {
    if(this.CurrentPage > 1)
    {
      this.CurrentPage--;
    this.UpdateButtons();
    this.RequestPage.emit(this.CurrentPage);
    }
  }

  Next()
  {
    if(this.CurrentPage < this.nPages.length)
    {
      this.CurrentPage++;
      this.UpdateButtons();
      this.RequestPage.emit(this.CurrentPage);
    }
  }

  UpdateButtons()
  {
    if(this.CurrentPage == 1)
    {
      document.getElementById("prev").classList.add("disabled");
      document.getElementById("next").classList.remove("disabled");
    }
    else if(this.CurrentPage == this.nPages.length)
    {
      document.getElementById("next").classList.add("disabled");
      document.getElementById("prev").classList.remove("disabled");
    }
  }


  @Output() RequestPage = new EventEmitter<number>();

  UpdateProductsSection(event): void {
    var selectedPage = event.target.innerText;
    this.CurrentPage = Number.parseInt(selectedPage);
    this.RequestPage.emit(this.CurrentPage);
    this.UpdateButtons();
  }

  UpdateProductsSectionManually(pageno): void {
    this.CurrentPage = Number.parseInt(pageno);
    this.RequestPage.emit(this.CurrentPage);
    this.UpdateButtons();
  }

}
