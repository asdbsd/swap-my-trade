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

   }





  async createSwap(form: NgForm): Promise<void> {
    console.log(form);
    debugger
  }

}
