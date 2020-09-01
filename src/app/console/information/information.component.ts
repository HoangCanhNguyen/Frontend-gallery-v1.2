import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  imageURL: string = "https://cdn.singulart.com/artists/v2/pictures/cropped/studio/base/1686_studio_d84dd1b5ae4f4c05d126dd48f8177b4d.jpeg";

  editQuote = false;
  quote = "You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like there is heaven on earth"
  quoteAuthor = "William W. Purkey"

  constructor() { }

  ngOnInit(): void {
  }

  onEditQuote() {
    this.editQuote = true;
  }
  onCancelEditQuote() {
    this.editQuote = false;
  }
  saveEdittedQuote(form: NgForm) {
    this.editQuote = false;
    this.quote = form.value.quote
    this.quoteAuthor = form.value.author
  }
}
