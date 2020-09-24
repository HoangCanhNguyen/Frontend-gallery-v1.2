import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Picture } from '../model/picture.model';
import { PicturesService } from './pictures.service'
import { PreloadService } from './preload.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Picture[]> {

  constructor(
    private pictureService: PicturesService,
    private preload: PreloadService
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Picture[]> {
    this.preload.show();
    return this.pictureService.getData()
  }
}
