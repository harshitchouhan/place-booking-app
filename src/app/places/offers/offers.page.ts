import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];

  isLoading = true;

  private _placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this._placesSub = this.placesService.places.subscribe((places) => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false
    });
  }

  ngOnDestroy() {
    if (this._placesSub) this._placesSub.unsubscribe();
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    console.log(offerId);
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', offerId]);
  }
}
