// Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Third party libraries
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Firebase
import { FirebaseOptionsToken } from 'angularfire2';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Enviroment and Interceptor setup
import { environment } from '../environments/environment';
import { HeadersInterceptor } from 'src/app/JWT-token.interceptor';

//Project Component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistInfoComponent } from './artists/artist-list/artist-info/artist-info.component';
import { ProfileComponent } from './profile/profile.component';
import { BasicProfileComponent } from './profile/basic-profile/basic-profile.component';
import { ArtistProfileComponent } from './profile/artist-profile/artist-profile.component';
import { SignUpComponent } from './console/sign-up/sign-up.component';
import { ConsoleComponent } from './console/console.component';
import { InformationComponent } from './console/information/information.component';
import { ArtworksComponent } from './console/artworks/artworks.component';
import { ArtistCollectorLoginComponent } from './console/artist-collector-login/artist-collector-login.component';
import { LayoutComponent } from './layout/layout.component';
import { EditArtworkComponent } from './console/artworks/edit-artwork/edit-artwork.component';
import { AdminComponent } from './admin/admin.component';
import { PictureManagerComponent } from './admin/picture-manager/picture-manager.component';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PreloadComponent } from './preload/preload.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ArtistsComponent,
    ArtistDetailComponent,
    ArtistListComponent,
    ArtistInfoComponent,
    ProfileComponent,
    BasicProfileComponent,
    ArtistProfileComponent,
    SignUpComponent,
    ConsoleComponent,
    InformationComponent,
    ArtworksComponent,
    ArtistCollectorLoginComponent,
    LayoutComponent,
    EditArtworkComponent,
    AdminComponent,
    PictureManagerComponent,
    AccountManagerComponent,
    DashboardComponent,
    PreloadComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatRippleModule,
    NgbPaginationModule,
    MDBBootstrapModule.forRoot(),
    MatChipsModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    Ng5SliderModule,
    MatPaginatorModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: FirebaseOptionsToken, useValue: environment.firebaseConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
