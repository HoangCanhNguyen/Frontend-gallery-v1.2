import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-artist-collector-login',
  templateUrl: './artist-collector-login.component.html',
  styleUrls: ['./artist-collector-login.component.css']
})
export class ArtistCollectorLoginComponent implements OnInit {

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitLogInForm(form: NgForm) {
    console.log(form);
  }
}
