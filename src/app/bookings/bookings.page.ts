import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  private _bookingSub: Subscription;

  loadedBookings: Booking[];

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this._bookingSub = this.bookingService.bookings.subscribe((bookings) => {
      this.loadedBookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this._bookingSub) this._bookingSub.unsubscribe();
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: 'Cancelling...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }
}
