import { Injectable } from '@angular/core';
import { API_URL } from '../../env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  ADMIN_GET_PENDING_ACCOUNT = `${API_URL}/admin/account/pending`;
  ADMIN_DELETE_USER = `${API_URL}/user/test`;
  VENDOR_INFORMATION_URL = `${API_URL}/vendor/information`;

  VENDOR_DETAIL_URL = `${API_URL}/vendor/list`;
  constructor(private httpClient: HttpClient) {}

  onGetPendingAccount(): Observable<any> {
    return this.httpClient.get(this.ADMIN_GET_PENDING_ACCOUNT);
  }

  onApprove(id): Observable<any> {
    return this.httpClient.post(this.ADMIN_GET_PENDING_ACCOUNT, id);
  }

  onDelete(id): Observable<any> {
    return this.httpClient.delete(this.ADMIN_DELETE_USER + '/' + id);
  }

  onSubmitInformation(data): Observable<any> {
    return this.httpClient.post(this.VENDOR_INFORMATION_URL, data);
  }

  onGetVendorList(): Observable<any> {
    return this.httpClient.get(this.VENDOR_INFORMATION_URL);
  }

  onGetVendorDetail(_id: string): Observable<any> {
    return this.httpClient.get(this.VENDOR_DETAIL_URL + '/' + _id);
  }
}
