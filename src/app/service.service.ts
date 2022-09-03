import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  postusers(data: any) {
    return this.http.post<any>('http://localhost:3000/users/', data);
  }
  getusers() {
    return this.http.get<any>('http://localhost:3000/users/');
  }
  updateuser(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/users/' + id, data);
  }
  deleteuser(id: number) {
    return this.http.delete<any>('http://localhost:3000/users/' + id);
  }
}
