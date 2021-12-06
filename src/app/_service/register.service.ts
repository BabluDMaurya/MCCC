import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../_models/register.model';
import { Config } from '../_config/config';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';

const EMAILS = ['test@test.com', 'user@test.com']

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Register[]>(`${Config.BasePath}/users`);
  }
  check_email_mobile(register:Register){
    return this.http.post(`${Config.BasePath}/check_email_mobile`,register);
  }
  register_new(password:Register){
    return this.http.post(`${Config.BasePath}/register_new`,password);
  }
  state(){
    return this.http.get(`${Config.BasePath}/states`);
  }  
  cities(id:any){
    return this.http.post(`${Config.BasePath}/cities_by_id`,id);
  }
  delete(id: number) {
    return this.http.delete(`${Config.BasePath}/users/${id}`);
  }
  terms(){
    return this.http.get(`${Config.BasePath}/terms`);
  }
  countries(){
    return this.http.get(`${Config.BasePath}/countries`);
  }
  states(id:any){
    return this.http.post(`${Config.BasePath}/states_by_id`,id);
  }
  languages(){
    return this.http.get(`${Config.BasePath}/languages`);
  }
  isEmailcheck(date:any){
    return this.http.post(`${Config.BasePath}/check_email`,date);    
  }
  isPhonecheck(date:any){
    return this.http.post(`${Config.BasePath}/phone_number_check`,date);    
  }
  isEmailTaken(email: string): Observable<boolean> {
    let url = `${Config.BasePath}/check_email`;

    let content: any = {};
    content.email = email;

    let response$: Observable<boolean> = this.http.post<boolean>(url, content);
    return response$;
  }
  isPhoneTaken(phone: string): Observable<boolean> {
    let url = `${Config.BasePath}/phone_number_check`;

    let content: any = {};
    content.phone = phone;

    let response$: Observable<boolean> = this.http.post<boolean>(url, content);
    return response$;
  }
}