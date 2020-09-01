import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PicturesService } from '../shared/service/pictures.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  new_pic_list: any = [];

  selectedFile: File = null;
  fb: string;
  downloadURL: Observable<string>;

  constructor(
    private router: Router,
    private picServivce: PicturesService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

}
