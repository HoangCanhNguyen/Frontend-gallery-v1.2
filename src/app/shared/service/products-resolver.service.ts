import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Picture } from '../model/picture.model';
import { PicturesService } from './pictures.service'
import { VendorService } from './vendor.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Picture[]> {

  constructor(
    private pictureService: PicturesService,
    private vendorService: VendorService
  ) { }

  resolve(activatedRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): Observable<Picture[]> {

    if (activatedRoute.routeConfig.path === ':artist_id/:artist_name') {
      return this.vendorService.onGetVendorDetail(activatedRoute.params.artist_id)
    }

    if (routeState.url === "/artists") {
      return this.vendorService.onGetVendorList();
    }

    if (activatedRoute.routeConfig.path === '') {
      return this.pictureService.getData()
    }

    if (activatedRoute.routeConfig.path === ':id/:category/:pic_name') {
      return this.pictureService.getPicById({ "id": activatedRoute.params.id })
    }

  }
}
