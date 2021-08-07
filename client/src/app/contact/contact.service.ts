import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContactMessage } from '../shared/model/message';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  createMessage = (message: IContactMessage) =>
    this.http.post<IContactMessage>(this.baseUrl + "contactMessage", message);

  getMessageById = (id: number) => this.http.get<IContactMessage>(this.baseUrl + "contactMessage/" + id);

  getMessages = () => this.http.get<IContactMessage>(this.baseUrl + "contactMessage");
}
