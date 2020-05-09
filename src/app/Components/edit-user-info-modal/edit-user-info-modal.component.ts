import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-user-info-modal',
  templateUrl: './edit-user-info-modal.component.html',
  styleUrls: ['./edit-user-info-modal.component.css']
})
export class EditUserInfoModalComponent implements OnInit {

  constructor() { }

  @Input()  ShowModal;
  @Input() currentUser;
  
  ngOnInit(): void {
  }

}
