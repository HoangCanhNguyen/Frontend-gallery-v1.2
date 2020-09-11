import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  verified = true;
  hide = true;
  selectedIndex = 0;

  basicInfo: any

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitBasicInfoForm(form: NgForm): void {
    this.basicInfo = form.value
    this.selectedIndex = this.selectedIndex + 1;
    this.verified = !this.verified;
  }

  onSubmitProfessionalInfoForm(form: NgForm): void {
    console.log(form.value);
  }
}
