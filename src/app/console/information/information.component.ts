import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { UploadImageService } from 'src/app/shared/service/upload-image.service';
import { Subscription } from 'rxjs';
import { AuthenticateService } from 'src/app/shared/service/authenticate.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  vendorAvatarURL = 'https://cdn.singulart.com/artists/pictures/cropped/artwork/base/artist_artwork_1647_ba964e906901ecde5a3fc4496de3d90f.jpeg';
  vendorCoverImageURL = 'https://cdn.singulart.com/artists/pictures/cropped/studio/base/artist_studio_1647_86d10186556c5e046c57e679ab7e736e.jpeg'

  editQuote = false;
  quote = "You’ve gotta dance like there’s nobody watching, love like you’ll never be hurt, sing like there’s nobody listening, and live like there is heaven on earth"
  quoteAuthor = "William W. Purkey"

  editDescription = false;
  background = "After having worked in several technical professions in the film industry, Brat became a director before turning to plastic art to express his vision of the world. He feeds on all forms of art every day, from painting to music, including comics, photography, architecture and even design, in order to shape his universe and observe the world and its changes. permanent. Working in a figurative style, he paints in acrylic, synthetic or glitter on rigid materials such as pléxi, wood fiber, metal, cardboard or even on skateboards glued to each other."
  pointOfView = "Brat's artistic reflection revolves around the collective unconscious. Each of his paintings and sculptures aims to give rise to intimate feelings and to bring the viewer to transpose his own vision of the world around him. Often depicting winged figures as in the series “Metamorphosis”, the artist's compositions draw a parallel between the world and the very existence of human beings and symbolize the allegorical transformation of the soul freed from all vanity."
  events = "The artist's committed works have earned him an exhibition in France, Switzerland, the United Kingdom, Poland, the United Arab Emirates and even Malaysia, China, Mexico and Belgium on the occasion of the Affordable Art Fair."

  editWorkflow1 = false;
  editWorkflow2 = false;
  editWorkflow3 = false;

  stages = [2001, 2010, 2020];
  workflowTitle1 = ['History of the Museum', 'Moving in', 'Art & Science'];
  workflowTitle2 = ['The Archive', 'New Home', 'Event'];
  workflowDescription = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing et elit, se sed do se eiusmod tempor incididunt ut labore et sa nes in dolore si magna aliqua. Ut enim ad minim veniam, in qu is nostrud e exercitation ullamco laboris nisi ut sen don nins aliquip ex ea commodo consequat. Duis aute irure do dolor eu est laborum. Sed ut perspic iatis unde omnis iste natus i error sit don eu fugiat est nulla duis aute. Voluptatem accusantium doloremque laudantium, intota rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi no architecto beatae vitae dicta sunt explicabo men enim ipsam volupt',

    'Lorem ipsum dolor sit amet, consectetur adipisicing et elit, se sed do se eiusmod tempor incididunt ut labore et sa nes in dolore si magna aliqua. Ut enim ad minim veniam, in qu is nostrud e exercitation ullamco laboris nisi ut sen don nins aliquip ex ea commodo consequat. Duis aute irure do dolor eu est laborum. Sed ut perspic iatis unde omnis iste natus i error sit don eu fugiat est nulla duis aute. Voluptatem accusantium doloremque laudantium, intota rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi no architecto beatae vitae dicta sunt explicabo men enim ipsam volupt',

    'Lorem ipsum dolor sit amet, consectetur adipisicing et elit, se sed do se eiusmod tempor incididunt ut labore et sa nes in dolore si magna aliqua. Ut enim ad minim veniam, in qu is nostrud e exercitation ullamco laboris nisi ut sen don nins aliquip ex ea commodo consequat. Duis aute irure do dolor eu est laborum. Sed ut perspic iatis unde omnis iste natus i error sit don eu fugiat est nulla duis aute.Voluptatem accusantium doloremque laudantium, intota rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi no architecto beatae vitae dicta sunt explicabo men enim ipsam volupt'
  ]
  workflowImages = [
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/h1-time-line-img-1.jpg',
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/h1-time-line-img-2.jpg',
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/h1-time-line-img-3.jpg'
  ]

  workflowImagesForEditing = [
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/h1-time-line-img-1.jpg',
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/h1-time-line-img-2.jpg',
    'https://musea.qodeinteractive.com/wp-content/uploads/2019/09/h1-time-line-img-3.jpg'
  ]

  imageContent: string = null;
  current_user: any

  constructor(
    private uploadImageService: UploadImageService,
  ) { }

  ngOnInit(): void {

    this.uploadImageService.imageContentSubject.subscribe(res => {
      this.imageContent = res;
    });

    this.uploadImageService.imageURLSubject.subscribe(res => {
      switch (this.imageContent) {
        case 'workflow-1':
          this.workflowImagesForEditing[0] = res;
          break;
        case 'workflow-2':
          this.workflowImagesForEditing[1] = res;
          break;
        case 'workflow-3':
          this.workflowImagesForEditing[2] = res;
          break;
        case 'vendor-avatar':
          this.vendorAvatarURL = res;
          this.uploadImageService.uploadAvatar();
          break;
        case 'vendor-cover-image':
          this.vendorCoverImageURL = res;
          this.uploadImageService.uploadAvatar();
          break;
      }
    })

  }

  onSaveEditedContent(content: string, form: NgForm) {
    console.log(form.value);

    this.workflowImagesForEditing.forEach((value, index) => {
      if (value !== this.workflowImages[index]) {
        this.workflowImages[index] = value;
      }
    })

    if (this.imageContent) {
      this.uploadImageService.uploadAvatar();
    }

    switch (content) {
      case 'des':
        this.editDescription = false;
        this.background = form.value.background;
        this.pointOfView = form.value.pointOfView;
        this.events = form.value.events;
        break;
      case 'workflow1':
        this.editWorkflow1 = false;
        this.stages[0] = form.value.stage1;
        this.workflowTitle1[0] = form.value.miniTitle1;
        this.workflowTitle2[0] = form.value.bigTitle1;
        this.workflowDescription[0] = form.value.des1;
        break;
      case 'workflow2':
        this.editWorkflow2 = false;
        this.stages[1] = form.value.stage2;
        this.workflowTitle1[1] = form.value.miniTitle2;
        this.workflowTitle2[1] = form.value.bigTitle2;
        this.workflowDescription[1] = form.value.des2;
        break;
      case 'workflow3':
        this.editWorkflow3 = false;
        this.stages[2] = form.value.stage3;
        this.workflowTitle1[2] = form.value.miniTitle3;
        this.workflowTitle2[2] = form.value.bigTitle3;
        this.workflowDescription[2] = form.value.des3;
        break;
      case 'quote':
        this.editQuote = false;
        this.quote = form.value.quote;
        this.quoteAuthor = form.value.author;
        break
    }
  }

  onCancelEditing() {
    this.workflowImages.forEach((value, index) => {
      if (value !== this.workflowImagesForEditing[index]) {
        this.workflowImagesForEditing[index] = value;
      }
    })
  }

  preview(files: FileList, content: string) {
    this.uploadImageService.preview(files, content);
  }
}
