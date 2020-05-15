import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BackendLinkService } from '../../Service/backend-link.service';

@Component({
  selector: 'app-admin-products-section',
  templateUrl: './admin-products-section.component.html',
  styleUrls: ['./admin-products-section.component.css']
})
export class AdminProductsSectionComponent implements OnInit {

  currentProduct;
  constructor(private Service:BackendLinkService) { }

  @Output() currentProductChanged = new EventEmitter();

  ChangeCurrentProduct(product) {
    //set current product
    console.log("child method invoked");
        this.currentProduct = product;
        this.currentProductChanged.emit(this.currentProduct);
    }
  ngOnInit(): void {
  }

  delete(id)
  {
    let DeleteProductobservable = this.Service.RemoveProduct(id);
    let DeleteProductdispose = DeleteProductobservable.subscribe((data) => {
    
    DeleteProductdispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });

  location.reload();

  //this.ProductsInput = this.ProductsInput.filter(p => p.productId._id != id);

  }

  @Input() ProductsInput;
  @Input() CategoryNameInput;

}
