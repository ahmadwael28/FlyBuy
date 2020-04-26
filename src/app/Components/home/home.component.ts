import { Component, OnInit } from '@angular/core';
import { BackendLinkService } from 'src/app/Service/backend-link.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private Service:BackendLinkService) { }

  dataSamples;
  originalData;
  ngOnInit(): void {

    //console.log(this.Service.getAllProducts());

    let observable = this.Service.getAllProducts();
    let dispose = observable.subscribe((data) => {
    console.log(data);
    console.log(data[0].Image);

    this.dataSamples = data;
    this.originalData = data;

    this.dataSamples.forEach(element => {
        element.Image = `http://localhost:3000/static/${element.Image}`
    });

    // this.ImagePath = `http://localhost:3000/static/${data[0].Image}`
    dispose.unsubscribe();
  },
  (err)=>{
    console.log(err);
  });

  }
  

}
