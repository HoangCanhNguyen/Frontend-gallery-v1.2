import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicProfileComponent } from './profile/basic-profile/basic-profile.component';
import { ArtistProfileComponent } from './profile/artist-profile/artist-profile.component';
import { ConsoleComponent } from './console/console.component';
import { InformationComponent } from './console/information/information.component';
import { ArtworksComponent } from './console/artworks/artworks.component';
import { ArtistCollectorLoginComponent } from './console/artist-collector-login/artist-collector-login.component';
import { LayoutComponent } from './layout/layout.component';

import { AuthGuard } from 'src/app/shared/guard/auth-guard.guard';
import { EditArtworkComponent } from './console/artworks/edit-artwork/edit-artwork.component';
import { AdminComponent } from './admin/admin.component';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { PictureManagerComponent } from './admin/picture-manager/picture-manager.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SignUpComponent } from './console/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'home/:pic_id/:category/:pic_name',
        redirectTo: 'list/:id/:category/:pic_name',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
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
        path: 'account/profile',
        component: ProfileComponent,
        children: [
          {
            path: 'user',
            component: BasicProfileComponent,
            canActivate: [AuthGuard],
            data: {
              expectedRole: 'user',
            },
          },
          { path: ':role/:id/:username', component: ArtistProfileComponent },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  {
    path: 'console',
    component: ConsoleComponent,
    children: [
      { path: '', component: ArtistCollectorLoginComponent },
      {
        path: 'info',
        component: InformationComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'vendor',
        },
      },
      {
        path: 'artworks',
        component: ArtworksComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'vendor',
        },
      },
      {
        path: 'artworks/new-artwork',
        component: EditArtworkComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'vendor',
        },
      },
      {
        path: 'artworks/:id/:category/:title/edit-artwork',
        component: EditArtworkComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'vendor',
        },
      },
      {
        path: 'vendor/signup',
        component: SignUpComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'vendor',
        },
      },
    ],
  },
  {
    path: 'console/artworks/:id/:category/:pic_name',
    redirectTo: 'list/:id/:category/:pic_name',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'account/manager', component: AccountManagerComponent },
      { path: 'picture/manger', component: PictureManagerComponent },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
