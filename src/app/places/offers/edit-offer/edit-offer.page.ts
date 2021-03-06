import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  private _placeSub: Subscription;

  place: Place;

  form: FormGroup;

  isLoading = false;

  placeId: string;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }

      this.placeId = paramMap.get('placeId');
      this.isLoading = true;

      this._placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe((place) => {
        this.place = place;
        this.form = new FormGroup({
          title: new FormControl(this.place.title, Validators.required),
          description: new FormControl(this.place.description, [Validators.required, Validators.maxLength(180)]),
        });

        this.isLoading = false;
      });
    });
  }

  ngOnDestroy() {
    if (this._placeSub) this._placeSub.unsubscribe();
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Updating place...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placesService.updatePlace(this.place.id, this.form.value.title, this.form.value.description).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl('/places/tabs/offers');
        });
      });
  }
}
