import { Component, OnInit, Input } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';

@Component({
  selector: 'app-admin-products-section',
  templateUrl: './admin-products-section.component.html',
  styleUrls: ['./admin-products-section.component.css']
})
export class AdminProductsSectionComponent implements OnInit {

  constructor(private Service:BackendLinkService) { }

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
