import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [new Place('p1', 'Manhattan Mansion', 'In the heart of New York City.', 'https://images.unsplash.com/photo-1588947484738-1d9afc3224d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', 149.99), new Place('p2', "L'Amour Toujours", 'A romantic place in Paris!', 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', 189.99), new Place('p3', 'The Foggy Palace', 'Not your average city trip!', 'https://images.unsplash.com/photo-1478399305562-fbc9c0adb0e6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80', 99.99)];

  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
}
