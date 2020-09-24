import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Picture } from '../model/picture.model';
import { PicturesService } from './pictures.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Picture[]> {

  constructor(
    private pictureService: PicturesService
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Picture[]> {
    return this.pictureService.getData()
  }
}
