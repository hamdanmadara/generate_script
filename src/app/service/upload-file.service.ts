import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private apiUrl = 'https://ridamadara.pythonanywhere.com/uploadfile'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Example GET request to fetch data from the API
   postData(data: any): Observable<any> {
    // Define headers if needed
   
    return this.http.post<any>(this.apiUrl, data);
  }
}
