import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];

  private _placesSub: Subscription;

  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this._placesSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
    });
  }

  ngOnDestroy() {
    if (this._placesSub) this._placesSub.unsubscribe();
  }

  onFilterUpdate(event: any) {
    console.log(event.detail);
  }
}
