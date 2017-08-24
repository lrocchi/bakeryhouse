import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AuthHttp, AuthConfig, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  // public token: string;

  private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) {}



  login(uname: string, pwd: string): Observable<boolean> {

    return this.http.post('api/users/auth',{username: uname, password: pwd}).map(
              (response: Response) => {
                  // login successful if there's a jwt token in the response
                  const jresponse = response.json();
                  if (jresponse) {
                    if(jresponse.success){
                      console.log(this.jwtHelper.decodeToken(jresponse.token), this.jwtHelper.isTokenExpired(jresponse.token));
                      // store username and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('token', jresponse.token);

                    }
                    return jresponse.success;
                  } else {
                      // return false to indicate failed login
                      return true;
                  }
              }
            );



     }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || { };
}

logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('currUser');

    }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  /* Credo ricavi il JWT da localStorage*/
  public loggedIn() {
    return tokenNotExpired('token');
  }

}
