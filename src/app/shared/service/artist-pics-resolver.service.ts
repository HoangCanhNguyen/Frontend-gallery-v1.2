import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Picture } from '../model/picture.model';
import { PicturesService } from './pictures.service'

@Injectable({
  providedIn: 'root'
})
export class ArtistPicsResolverService implements Resolve<Picture[]> {

  constructor(
    private pictureService: PicturesService,
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Picture[]> {

    if (activatedRoute.routeConfig.path === ':artist_id/:artist_name') {
      return this.pictureService.onGetPicByArtist(activatedRoute.params.artist_name)
    }

  }
}
