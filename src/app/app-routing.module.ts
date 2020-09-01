import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicProfileComponent } from './profile/basic-profile/basic-profile.component';
import { ArtistProfileComponent } from './profile/artist-profile/artist-profile.component';
import { VendorComponent } from './auth/vendor/vendor.component';
import { ConsoleComponent } from './console/console.component';
import { InformationComponent } from './console/information/information.component';
import { BiographyComponent } from './console/biography/biography.component';
import { ArtworksComponent } from './console/artworks/artworks.component';
import { ArtistCollectorLoginComponent } from './console/artist-collector-login/artist-collector-login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'home/:pic_id/:category/:pic_name',
    redirectTo: 'list/:id/:category/:pic_name',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ProductsComponent,
    children: [
      { path: '', component: ProductListComponent },
      {
        path: ':id/:category/:pic_name',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: 'artists',
    component: ArtistsComponent,
    children: [
      { path: '', component: ArtistListComponent },
      { path: ':artist_id/:artist_name', component: ArtistDetailComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'customer/:role/:id/:username',
        component: BasicProfileComponent,
      },
      { path: ':role/:id/:username', component: ArtistProfileComponent },
    ],
  },
  { path: 'vendor/register', component: VendorComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'console', component: ConsoleComponent, children: [
      { path: '', component: ArtistCollectorLoginComponent },
      { path: 'info', component: InformationComponent },
      { path: 'biography', component: BiographyComponent },
      { path: 'artworks', component: ArtworksComponent }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
