import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef  } from '@angular/core';
import { OrderService } from 'src/app/Service/order.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.css']
})
export class EditOrderStatusComponent implements OnInit {


  @ViewChild('body') body: ElementRef;
 // @Input()  ShowModal;
  @Input()  currentOrder;
  isValidFormSubmitted: boolean = false;
  updatedStatus;
  ngOnInit(): void {
  }

 

EditOrderForm = new FormGroup({
 Username: new FormControl( ''),
 Date: new FormControl(''),
 TotalPrice:new FormControl(''),
 Status:new FormControl('')
})

constructor(public orderService:OrderService,private toaster: ToastrService) {
  console.log("Edit Order Modal Component...")
 }
ngOnChanges(changes: SimpleChanges) {
  this.EditOrderForm.controls['Username'].setValue(this.currentOrder.Username);
  this.EditOrderForm.controls['Date'].setValue(this.currentOrder.Date);
  this.EditOrderForm.controls['TotalPrice'].setValue(this.currentOrder.TotalPrice);
  this.EditOrderForm.controls['Status'].setValue(this.currentOrder.Status);

}
  onSubmit() {
   console.log("Inside submit..");
   this.isValidFormSubmitted = true;
   if (this.EditOrderForm.valid) {
       this.editOrderStatus();
    }
  }
  editOrderStatus() {
   console.log('EditOrder is Invoked...');
   console.log(this.EditOrderForm.value);
   let { Status } = this.EditOrderForm.value;
   let order;
   order = {"Status": Status };

   let observable = this.orderService.editOrderStatus(this.currentOrder._id,order);

   let dispose = observable.subscribe((data) => {
     console.log(data);
     this.updatedStatus = data;
     if (this.updatedStatus) {
       console.log("Order Added Successfully!");
       this.toaster.success('Order Status edited successfully!');
     }

     dispose.unsubscribe();

   },
     (err) => {
       console.log(err);

     });

 }

 close()
 {
   (<HTMLBodyElement>document.getElementsByTagName("body")[0]).classList.remove('modal-open');
   (<HTMLCollection>document.getElementsByClassName('modal-backdrop'))[0].remove();
   //this.ShowModal = false;
   location.reload();
 }

}
