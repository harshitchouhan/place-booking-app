import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  relevantPlaces: Place[];

  private _placesSub: Subscription;
  private filter = 'all';

  constructor(private placesService: PlacesService, private authService: AuthService) {}

  ngOnInit() {
    this._placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.onFilterUpdate(this.filter);
    });
  }

  ngOnDestroy() {
    if (this._placesSub) this._placesSub.unsubscribe();
  }

  onFilterUpdate(filter: string) {
    const isShown = (place: Place) => filter === 'all' || place.userId !== this.authService.userId;
    this.relevantPlaces = this.loadedPlaces.filter(isShown);
    this.filter = filter;
  }
}
