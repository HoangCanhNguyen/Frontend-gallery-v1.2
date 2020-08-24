import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  searchByTypingSubject = new Subject<string>();
  searchByPriceSubject = new Subject<{ minPrice: number, maxPrice: number }>();

  constructor() { }

  search(content: any): void {
    if (typeof content === 'string') {
      this.searchByTypingSubject.next(content);
    }
    else if (typeof content === 'object') {
      this.searchByPriceSubject.next(content);
    }
  }
}
