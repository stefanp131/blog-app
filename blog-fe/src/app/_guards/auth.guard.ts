import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    if (!this.accountService.currentUserSource.value) {
      this.snackBar.open('You shall not pass!', 'Dismiss', { duration: 5000 });
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
