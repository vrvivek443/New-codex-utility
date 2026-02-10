// data-loaded.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { MasterDataStateService } from '../services/master-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {

  constructor(private masterDataService: MasterDataStateService) {}

  canActivate(): Observable<boolean> {
    return this.masterDataService.loaded$.pipe(
      filter(loaded => loaded),  // Wait until loaded is true
      take(1)  // Only take the first emitted value and complete
    );
  }
}
