import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  emailFormControl = new FormControl<string>(this.email, [Validators.required, Validators.email]);
  passwordFormControl = new FormControl<string>(this.password, [Validators.required]);


  constructor(private loginService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.loginService.login(this.email, this.password)
      .subscribe(res => {
        console.log(res);
        
        console.log('Login successful!');
        this.router.navigate(['/home']);

      });

    }
  }
}
