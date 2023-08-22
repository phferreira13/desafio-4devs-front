import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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


  constructor(private loginService: LoginService) {}

  onSubmit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.loginService.login(this.email, this.password)
      .subscribe(res => {
        console.log(res);
        
        console.log('Login successful!');

      });

    }
  }
}
