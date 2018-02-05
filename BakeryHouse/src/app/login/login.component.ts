import { Component, OnInit, HostBinding } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../_services/auth.service';


@Component({
  // selector: 'app-root',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  returnUrl: string;

  LOGO = './img/Logo.png';
  @HostBinding('class.Ccm-LoginBody') someField = true;


  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService) { }




  ngOnInit() {
       // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate([this.returnUrl]);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

}
