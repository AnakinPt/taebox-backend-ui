import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User, Address } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private customerUrl = `${environment.backend}/customer`;
    private addressUrl = `${environment.backend}/address`;

    constructor(readonly http: HttpClient) { }

    users(): Observable<User[]> {
        return this.http.get<User[]>(this.customerUrl);
    }

    user(id: number): Observable<User> {
        return this.http.get<User>(`${this.customerUrl}/${id}`);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.customerUrl, user);
    }

    updateAddress(address: Address): Observable<Address> {
        return this.http.put<Address>(this.addressUrl, address);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(this.customerUrl, user);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(`${this.customerUrl}/${id}`);
    }
}
