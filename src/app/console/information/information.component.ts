import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  editQuote = false;
  quote = "You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like there is heaven on earth"
  quoteAuthor = "William W. Purkey"

  editDescription = false;
  background = "After having worked in several technical professions in the film industry, Brat became a director before turning to plastic art to express his vision of the world. He feeds on all forms of art every day, from painting to music, including comics, photography, architecture and even design, in order to shape his universe and observe the world and its changes. permanent. Working in a figurative style, he paints in acrylic, synthetic or glitter on rigid materials such as pléxi, wood fiber, metal, cardboard or even on skateboards glued to each other."
  pointOfView = "Brat's artistic reflection revolves around the collective unconscious. Each of his paintings and sculptures aims to give rise to intimate feelings and to bring the viewer to transpose his own vision of the world around him. Often depicting winged figures as in the series “Metamorphosis”, the artist's compositions draw a parallel between the world and the very existence of human beings and symbolize the allegorical transformation of the soul freed from all vanity."
  events = "The artist's committed works have earned him an exhibition in France, Switzerland, the United Kingdom, Poland, the United Arab Emirates and even Malaysia, China, Mexico and Belgium on the occasion of the Affordable Art Fair."

  editWorkflow = false;
  stages = [2001, 2010, 2020];
  workflowTitle1 = ['History of the Museum', 'Moving in', 'Art & Science'];
  workflowTitle2 = ['The Archive', 'New Home', 'Event'];
  workflowDescription = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing et elit, se sed do se eiusmod tempor incididunt ut labore et sa nes in dolore si magna aliqua. Ut enim ad minim veniam, in qu is nostrud e exercitation ullamco laboris nisi ut sen don nins aliquip ex ea commodo consequat. Duis aute irure do dolor eu est laborum. Sed ut perspic iatis unde omnis iste natus i error sit don eu fugiat est nulla duis aute. Voluptatem accusantium doloremque laudantium, intota rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi no architecto beatae vitae dicta sunt explicabo men enim ipsam volupt',

    'Lorem ipsum dolor sit amet, consectetur adipisicing et elit, se sed do se eiusmod tempor incididunt ut labore et sa nes in dolore si magna aliqua. Ut enim ad minim veniam, in qu is nostrud e exercitation ullamco laboris nisi ut sen don nins aliquip ex ea commodo consequat. Duis aute irure do dolor eu est laborum. Sed ut perspic iatis unde omnis iste natus i error sit don eu fugiat est nulla duis aute. Voluptatem accusantium doloremque laudantium, intota rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi no architecto beatae vitae dicta sunt explicabo men enim ipsam volupt',

    'Lorem ipsum dolor sit amet, consectetur adipisicing et elit, se sed do se eiusmod tempor incididunt ut labore et sa nes in dolore si magna aliqua. Ut enim ad minim veniam, in qu is nostrud e exercitation ullamco laboris nisi ut sen don nins aliquip ex ea commodo consequat. Duis aute irure do dolor eu est laborum. Sed ut perspic iatis unde omnis iste natus i error sit don eu fugiat est nulla duis aute.Voluptatem accusantium doloremque laudantium, intota rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi no architecto beatae vitae dicta sunt explicabo men enim ipsam volupt'
  ]


  constructor() { }

  ngOnInit(): void {
  }

  onSaveEditedContent(content: string, form: NgForm) {
    console.log(form.value);
    switch (content) {
      case 'des':
        this.editDescription = false;
        break;
      case 'workflow':
        this.editWorkflow = false;
        break;
      case 'quote':
        this.editQuote = false;
        break
    }
  }
}
