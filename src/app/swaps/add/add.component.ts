import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  date: string | undefined | Date



  constructor( ) { 

   }

   ngOnInit() {
    this.setDataField();
    debugger;
   }



  setDataField(): void {
    this.date = new Date();
    this.date = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`
  }



  async createSwap(form: NgForm): Promise<void> {
    console.log(form);
    debugger
  }

}
