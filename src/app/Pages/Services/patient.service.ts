import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface AppResponse {
  AP: number;
  DID: number;
  Date: string;
  DoctorFirstName: string;
  DoctorLastName: string;
  Hour: string;
  PID: number;
  SID: number;
}

export interface Slots {
  slot_id: number;
  date: string;
  hour: string;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'https://backend-git-yahia-elalfy-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com';

  constructor(private httpClient: HttpClient) {}

  saveUser(userData: object) {
    return this.httpClient.post(`${this.apiUrl}/signup`, userData);
  }

  signinfunc(userData: object) {
    return this.httpClient.post(`${this.apiUrl}/signin`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }

  getDoctors() {
    const headers = this.getHeaders();
    return this.httpClient.get(`${this.apiUrl}/getdoctors`, { headers });
  }

  addslot(drdata: object) {
    const headers = this.getHeaders();
    return this.httpClient.post(`${this.apiUrl}/addslot`, drdata, { headers });
  }

  getappserv() {
    const headers = this.getHeaders();
    return this.httpClient.get<AppResponse[]>(`${this.apiUrl}/getuserappointments`, { headers });
  }

  onReserve(payload: object) {
    const headers = this.getHeaders();
    return this.httpClient.post(`${this.apiUrl}/makeappointment`, payload, { headers });
  }

  getslotserv() {
    const headers = this.getHeaders();
    return this.httpClient.get<Slots[]>(`${this.apiUrl}/getdoctorslotsbyid`, { headers });
  }

  deleteapp(userData: any) {
    const headers = this.getHeaders();
    return this.httpClient.post(`${this.apiUrl}/cancelappointment`, userData, { headers });
  }

  updateapp(userData: any) {
    const headers = this.getHeaders();
    return this.httpClient.post(`${this.apiUrl}/cancelappointment`, userData, { headers });
  }
}
