import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ProgressHttp } from "angular-progress-http";
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl + '/admin/';
const order = 'id desc';

@Injectable()
export class IpmiService {

    constructor(private http: HttpClient, private httpProgress: ProgressHttp, private router: Router) {
    }

    private tokenHeader(token) {
        const options = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
        };
        return options;
    }

    GetIpimsList(token, page_number, page_size) {
        return this.http.get(API_URL + `ipmis?order=${order}&page_number=${page_number}&page_size=${page_size}`, this.tokenHeader(token))
    }

    CreateIpim(token, data) {
        return this.http.post(API_URL + 'ipmis', data, this.tokenHeader(token));
    }

    SetPower(token, data) {
        return this.http.put(API_URL + 'ipmiController/power', data, this.tokenHeader(token));
    }

    // GetServers(token, page_number, page_size) {
    //   return this.http.get(API_URL + `/admin/servers?order=${order}&pageNumber=${page_number}&pageSize=${page_size}`, this.tokenHeader(token))
    // }

    CreateIpimByCsv(token, data) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        const options = new RequestOptions({ headers: headers });
        return this.httpProgress.post(API_URL + 'ipmis?type=csv', data, options);
    }

    // GetMinioInfo(token) {
    //   return this.http.get(API_URL + '/minio/', this.tokenHeader(token));
    // }

    GetGroupList(token, page_number, page_size, field: string, fieldOrder: boolean) {
        let order = field + (fieldOrder ? " desc" : " asc");
        return this.http.get(API_URL + `groups?order=${order}&pageNumber=${page_number}&pageSize=${page_size}`, this.tokenHeader(token));
    }

    CreateGroup(token, data) {
        return this.http.post(API_URL + 'groups', data, this.tokenHeader(token));
    }

    // EditGroup(token, data) {
    //     console.log('url', API_URL + `groups?groupid=${groupId}`)
    //     return this.http.post(API_URL + `groups?groupid=${groupId}`, data, this.tokenHeader(token));
    // }

    DeleteGroup(token, groupId) {
        return this.http.delete(API_URL + `groups?groupid=${groupId}`, this.tokenHeader(token));
    }

    GetServers(token, page_number, page_size, groupId, field: string, fieldOrder: boolean, reverse, powerStatus) {
        // console.log('field', reverse, powerStatus);
        if (groupId === 0) {
            groupId = '';
        }
        else {
            groupId = '&groupid=' + groupId;
        }
        let order = field + (fieldOrder ? " desc" : " asc");
        // console.log('url', API_URL + `servers?order=${order}&pageNumber=${page_number}&pageSize=${page_size}${groupId}${reverse}${powerStatus}`);
        return this.http.get(API_URL + `servers?order=${order}&pageNumber=${page_number}&pageSize=${page_size}${groupId}${reverse}${powerStatus}`, this.tokenHeader(token));
    }

    AddServerToGroup(token, data) {
        return this.http.post(API_URL + 'servers', data, this.tokenHeader(token));
    }

    DeleteServerFromGroup(token, groupId) {
        return this.http.delete(API_URL + `servers?groupid=${groupId}`, this.tokenHeader(token));
    }

    CreateServer(token, data) {
        return this.http.post(API_URL + 'servers', data, this.tokenHeader(token));
    }

    // EditServer(token, data, serverId) {
    //     return this.http.post(API_URL + `servers?groupid=${serverId}`, data, this.tokenHeader(token));
    // }

    GetImagesList(token, page_number, page_size) {
        return this.http.get(API_URL + `images?page_number=${page_number}&page_size=${page_size}`, this.tokenHeader(token));
    }

    CreateImage(token, data) {
        return this.http.post(API_URL + 'images', data, this.tokenHeader(token));
    }

    // EditImage(token, data) {
    //     const options = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token })
    //     };
    //    return this.http.put(API_URL + '/admin/images', data, options);
    // }
    EditImage(token, data) {
        // const options = {
        //     headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token })
        // };
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        const options = new RequestOptions({ headers: headers });
        return this.httpProgress.put(API_URL + 'images', data, options);
    }

    DeleteImage(token, id) {
        return this.http.delete(API_URL + `images?imageid=${id}`, this.tokenHeader(token));
    }

    GetContainersInfo(token, serverId) {
        return this.http.get(API_URL + `servers/containers?serverId=${serverId}`, this.tokenHeader(token));
    }

    GetMachineInfo(token) {
        return this.http.get(API_URL + `host`, this.tokenHeader(token));
    }

    Mining(token, data) {
        return this.http.put(API_URL + 'servers/mining', data, this.tokenHeader(token));
    }
}
