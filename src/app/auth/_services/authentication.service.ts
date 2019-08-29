import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import "rxjs/add/operator/map";
import { environment } from "../../../environments/environment";

const API_URL = environment.loginUrl;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }
    Register(data) {
        return this.http.post(API_URL + '/customer/register', data, httpOptions);
    }
    // RegisterAsLedger(data){
    //     return this.http.post(API_URL + '/customer/register.json', data, httpOptions);
    // }
    login(data) {
        // return this.http.post(API_URL + '/api/login', data, httpOptions)
        // const options = {
        //     headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/x-www-form-urlencoded' })
        // };
        // let body = new FormData();
        // let body = {
        //     'username': data.userName,
        //     'password': data.password,
        //     'client_id': 'pisces',
        //     'grant_type': 'password',
        //     'client_secret': '63f6cd23-d45a-431a-bf8d-2f96bc54a586',
        // };
        // body.append('username', data.userName);
        // body.append('password', data.password);
        // body.append('client_id', 'pisces');
        // body.append('grant_type', 'password');
        // body.append('client_secret', '63f6cd23-d45a-431a-bf8d-2f96bc54a586')
        // console.log(body)
        // return this.http.post(API_URL + '/auth/realms/master/protocol/openid-connect/token?', body, options);
        return this.http.post(API_URL + '/get_access_token', data);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }
}
