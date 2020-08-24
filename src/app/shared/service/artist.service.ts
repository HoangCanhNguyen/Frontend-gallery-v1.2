import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import {API_URL} from '../../env'

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private GET_ARTIST_URL = `${API_URL}/getartist`
  private GET_BY_ID =  `${API_URL}/getartistbyid`


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private htppClient: HttpClient) { }

  getArtistInfo(): Observable<any> {
    return this.htppClient.get(this.GET_ARTIST_URL)
  }

  getArtistById(id):Observable<any> {
    return this.htppClient.post(this.GET_BY_ID, id, this.httpOptions)
  }
}
