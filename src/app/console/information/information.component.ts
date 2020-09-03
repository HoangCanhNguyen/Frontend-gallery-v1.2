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

  editDescription = false;
  background = "After having worked in several technical professions in the film industry, Brat became a director before turning to plastic art to express his vision of the world. He feeds on all forms of art every day, from painting to music, including comics, photography, architecture and even design, in order to shape his universe and observe the world and its changes. permanent. Working in a figurative style, he paints in acrylic, synthetic or glitter on rigid materials such as pléxi, wood fiber, metal, cardboard or even on skateboards glued to each other."
  pointOfView = "Brat's artistic reflection revolves around the collective unconscious. Each of his paintings and sculptures aims to give rise to intimate feelings and to bring the viewer to transpose his own vision of the world around him. Often depicting winged figures as in the series “Metamorphosis”, the artist's compositions draw a parallel between the world and the very existence of human beings and symbolize the allegorical transformation of the soul freed from all vanity."
  events = "The artist's committed works have earned him an exhibition in France, Switzerland, the United Kingdom, Poland, the United Arab Emirates and even Malaysia, China, Mexico and Belgium on the occasion of the Affordable Art Fair."

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

  onEditDescription() {
    this.editDescription = true;
  }
  onCancelEditDescription() {
    this.editDescription = false;
  }
  saveEdittedDes(form: NgForm) {
    this.editDescription = false;
    this.background = form.value.background;
    this.pointOfView = form.value.pointOfView;
    this.events = form.value.events;
  }
}
