import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/customer/login/login.component';
import { SignupComponent } from './auth/customer/signup/signup.component';
import { PictureFilterPipe } from 'src/app/products/product-list/filter.pipe';

// third-party libraries
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductCommentComponent } from './products/product-detail/product-comment/product-comment.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { ProductReplyComponent } from './products/product-detail/product-comment/product-reply/product-reply.component';
import { FilterComponent } from './products/product-list/filter/filter.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailComponent } from './artists/artist-detail/artist-detail.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistInfoComponent } from './artists/artist-list/artist-info/artist-info.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProfileComponent } from './profile/profile.component';
import { BasicProfileComponent } from './profile/basic-profile/basic-profile.component';
import { ArtistProfileComponent } from './profile/artist-profile/artist-profile.component';
import { CustomerComponent } from './auth/customer/customer.component';
import { VendorComponent } from './auth/vendor/vendor.component';
import { SignUpComponent } from './auth/vendor/sign-up/sign-up.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    CheckoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ProductCommentComponent,
    ProductReplyComponent,
    FilterComponent,
    PictureFilterPipe,
    ArtistsComponent,
    ArtistDetailComponent,
    ArtistListComponent,
    ArtistInfoComponent,
    ProfileComponent,
    BasicProfileComponent,
    ArtistProfileComponent,
    CustomerComponent,
    VendorComponent,
    SignUpComponent,
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
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatRippleModule,
    Ng5SliderModule,
    NgbPaginationModule,
    MDBBootstrapModule.forRoot(),
    MatChipsModule,
    AngularFireStorageModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, SignupComponent],
})
export class AppModule { }
