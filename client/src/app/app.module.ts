import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ArtistListComponent } from './artist-list/artist-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule, MatNativeDateModule,
  MatPaginator, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule,
  MatProgressSpinnerModule,
  MatOptionModule,
  MatToolbarModule, MatMenuModule, MatBadgeModule, MatExpansionModule, MatSlideToggleModule
} from '@angular/material';
import {NgbCarouselConfig, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { ArtistProfileComponent } from './artist-profile/artist-profile.component';
import { ArtistComponent } from './artist/artist.component';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { MatSliderModule } from '@angular/material/slider';
import { ContratationComponent } from './artist/contratation/contratation.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {StorageServiceModule} from 'angular-webstorage-service';
import { ReclamationComponent } from './contract-list/reclamation/reclamation.component';
import { ReclamationListComponent } from './reclamation-list/reclamation-list.component';
import { ReclamationResponseComponent } from './reclamation-list/reclamation-response/reclamation-response.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtistListComponent,
    ArtistProfileComponent,
    ArtistComponent,
    ArtistListComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContratationComponent,
    ContractListComponent,
    NotificationsComponent,
    ReclamationComponent,
    ReclamationListComponent,
    ReclamationResponseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatBadgeModule,
    MatExpansionModule,
    MatPaginatorModule,
    FormsModule,
    NgbModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    VgBufferingModule,
    FormsModule,
    BrowserModule,
    StorageServiceModule,
    NgbCarouselModule,
    MatSlideToggleModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
