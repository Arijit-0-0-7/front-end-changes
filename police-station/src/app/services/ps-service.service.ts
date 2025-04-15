import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class PsService {
 
  private url = 'http://localhost:8081/ps/';
 
  constructor(private http : HttpClient) { }
 
  public getAllStates() : Observable<any>{
    return this.http.get('http://localhost:8081/ps/getStates')
  }
 
  public getDistrictsByStates(state_cd : Number) :Observable<any>{
    return this.http.get(`${this.url}getDistricts/`+state_cd)
  }
 
  public getPlacesByDistricts(district_cd : number) :Observable<any>{
    return this.http.get(`${this.url}getPlaces/`+district_cd)
  }
  getAllPS() : Observable<any> {
    return this.http.get('http://localhost:8081/ps/get')
  }
 
  getPSbyId(id : Number) : Observable<Object>{
    return this.http.get(`${this.url}get/`+id);
  }
 
  createPS(ps : Object) : Observable<Object>{
    return this.http.post('http://localhost:8081/ps/save1',ps);
  }
 
  updatePS(id : number,ps : Object) : Observable<Object>{
    return this.http.put(`${this.url}update/`+id,ps);
  }
 
  deletePS(id : Number) : Observable<Object>{
    return this.http.delete(`${this.url}delete/`+id);
  }
}