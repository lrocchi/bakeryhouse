import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';

@Injectable()
export class FilesService {

  constructor(private http: Http) { }

    downloadPDF(filename, filetype): any {
    return this.http.get('api/file/' + filename,
    { responseType: ResponseContentType.Blob });
  }

  showFileNames() {
    return this.http.get('api/files');
  }
}