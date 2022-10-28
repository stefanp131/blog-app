import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/posts'])
        this.snackBar.open('Successfully registered in!', 'Dismiss', {
          duration: 5000,
        });
      },
      error: () => {
        this.snackBar.open('Something went wrong!', 'Dismiss', {
          duration: 5000,
        });
      },
    });
  }
}
