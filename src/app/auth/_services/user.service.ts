import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../_models/index";
import { environment } from "../../../environments/environment";
import { ProgressHttp } from "angular-progress-http";
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class UserService {
    constructor(private http: HttpClient,
        private httpProgress: ProgressHttp,
        private router: Router) {
    }

    // ActivateAccount(activateCode, id) {
    //     return this.http.get(API_URL + '/customer/activate?activateCode=' + activateCode + "&id=" + id);
    // }
    // forgotPassword(email) {
    //     return this.http.get(API_URL + '/forgetPasswordEmail/customer?email=' + email);
    // }
    // ChangePassword(data, token) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/customers/myAccount/changePassword', data, options);
    // }
    // EnableReset(signature, email) {
    //     return this.http.get(API_URL + '/checkResetPwdLink?signature=' + signature + '&email=' + email);
    // }
    // ResetPassword(data) {
    //     return this.http.post(API_URL + '/resetPassword', data, httpOptions);
    // }

    // UpdateAccount(data, token) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/customers/update', data, options);
    // }

    // GetWorkers(data, user) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'username': user['username'], 'authzCode': user['authzCode'] })
    //     };
    //     return this.http.post(API_URL + '/ledger/my_workers', data, options);
    // }

    // GetworkerInfo(id) {
    //     return this.http.get(API_URL + '/worker/' + id);
    // }

    // GetUserProfile(token) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get(API_URL + '/userProfile', options);
    // }

    // GetProducts(token) {
    //     return this.http.post(API_URL + '/products/search', { id: 403 });
    // }

    // PlaceOrder(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/orders/create', data, options);
    // }
    // Pay(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/orionPay', data, options);
    // }

    // UploadScript(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/upload', data, options);
    // }

    // GetNBAIETH() {
    //     return this.http.get(API_PRICE + 'NBAIETH');
    // }

    // GetETHBTC() {
    //     return this.http.get(API_PRICE + 'ETHBTC');
    // }

    // GetBTCPrice() {
    //     return this.http.get(BTC_PRICE);
    // }

    // GetLedgerList() {
    //     return this.http.get<object[]>(API_URL + '/worker/ledgerList', httpOptions);
    // }
    // GetLedgerInfo(token, id) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get(API_URL + '/worker/ledgerDetails/' + id, options);
    // }
    // GetLedgerStatus(address) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     };
    //     return this.http.get(API_URL + '/worker/ledgerStatus/' + address, options);
    // }
    // CreateTask(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/createTask', data, options);
    // }
    // // DispatchTask(data) {
    // //     return this.http.post('http://192.168.88.152:8080/task/submit', data, httpOptions)
    // // }

    // SubmitTask(token, formData, progressCallback, resultCallback) {
    //     const headers = new Headers();
    //     headers.append('Authorization', `Bearer ${token}`);
    //     const options = new RequestOptions({ headers: headers });
    //     this.httpProgress.withUploadProgressListener(progress => {
    //         progressCallback(progress);
    //     })
    //         // .withDownloadProgressListener(progress => { console.log(`Downloading ${progress.percentage}%`); })
    //         .post(API_URL + '/uploadScript', formData, options)
    //         .subscribe((res) => {
    //             // console.log('uploadScript', res);
    //             resultCallback(res);
    //         },
    //         err => {
    //             if (err.status == 401) {
    //                 this.router.navigateByUrl('login?returnUrl=/profile');
    //             }
    //         });
    // }

    // CheckResult(token, orderId) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(`${API_URL}/checkResult?orderId=${orderId}`, {}, options);
    // }

    // GetWorkersByLedgerIp(token, ledgerIp) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get<object[]>(`${API_URL}/mem/worker/${ledgerIp}`, options);
    // }
    // // verify() {
    // //     return this.http.get('/api/verify', this.jwt()).map((response: Response) => response.json());
    // // }

    // // // private helper methods
    // // private jwt() {
    // //     // create authorization header with jwt token
    // //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // //     if (currentUser && currentUser.token) {
    // //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    // //         return new RequestOptions({ headers: headers });
    // //     }
    // // }
    // GetTaskCountByLedgerIP(ledgerIp) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     };
    //     return this.http.get(API_URL + '/superLedger/taskcount/ledgerip/' + ledgerIp, options);
    // }

    // GetTaskHistoryByWallet(token, address) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get<object[]>(API_URL + '/customers/taskHistory/' + address, options);
    // }

    // GetWorkersListByLedger(ledgerIp) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     };
    //     return this.http.get(API_URL + '/mem/worker/' + ledgerIp, options);
    // }

    // GetWorkerListByLedgerAndType(data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     };
    //     return this.http.post(API_URL + '/mem/worker/', data, options);
    // }

    // BindingCard(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/binding_card/', data, options);
    // }

    // GetCreditCard(token) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get<object[]>(API_URL + '/credit_cards/', options);
    // }

    // DeleteCreditCard(token, id) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get(API_URL + '/delete_credit_card/' + id, options);
    // }

    // UpdateCreditCard(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/update_card/', data, options);
    // }

    // SetDefaultCreditCard(token, id) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get(API_URL + '/set_default_card/' + id, options);
    // }

    // GetDepositStatusByLedger(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.post(API_URL + '/coin_balance/', data, options);
    // }

    // GetTaskDetailsByContractAddress(token, contractAddress) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return this.http.get(API_URL + '/customers/taskdetail/' + contractAddress, options);
    // }

    // GetUserList() {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     };
    //     return this.http.get(API_URL + '/worker/all_users', options);
    // }

    // private tokenHeader(token) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    //     };
    //     return options;
    // }



}
