import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { BrotherService } from '../_services/brother.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router, private brother: BrotherService) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
    this.router.navigate(['/login']);
    this.brother.setMessage('Hello');
  }
}
