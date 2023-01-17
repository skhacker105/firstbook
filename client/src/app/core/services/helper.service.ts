// Decorators
import { Injectable } from '@angular/core';

// RXJS
import { Subject } from 'rxjs';

// JWT Decoding
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AddEntity } from '../models/add-entity.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  isUserLogged = new Subject<boolean>();
  searchQuery = new Subject<string>();
  cartStatus = new Subject<string>();
  addEntity = new BehaviorSubject<AddEntity | undefined>(undefined);

  saveSession(token: any): void {
    localStorage.setItem('token', token);
  }

  clearSession(): void {
    localStorage.clear();
  }

  getProfile(): any {
    try {
      const decoded: any = decode(this.getToken());

      return decoded.sub;
    } catch (err) {
      return {};
    }
  }

  isLoggedIn(): boolean {
    try {
      const decoded: any = decode(this.getToken());

      if (decoded.exp > Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  isAdmin(): boolean {
    try {
      const decoded: any = decode(this.getToken());

      if (decoded.exp < Date.now() / 1000 || !decoded.sub.isAdmin) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    let val = localStorage.getItem('token');
    return val ? val : '';
  }

  setAddEntityConfig(url: string) {
    this.addEntity.next({ url });
  }

  resetAddEntityConfig() {
    this.addEntity.next(undefined);
  }
}
