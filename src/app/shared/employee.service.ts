import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

let newheaders = { 
  'Content-Type':  'application/json', 
  //'Authorization': 'Basic ' + btoa('P50002103:1q1q1q'),
  'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  'Pragma': 'no-cache',
  'Expires': '0'
}

const httpOptions = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/jpeg')
      // .set('Authorization', 'Basic ' + btoa('P10053423:rr@123'))
      .set('Authorization', 'Basic ' + btoa('P37100256:rr@123'))
      //.set('Authorization', 'Basic ' + btoa('P50002103:p0p0p0'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};

const newHttpOptions  = {
  headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + btoa('P37100256:rr@123'))
      //.set('Authorization', 'Basic ' + btoa('P50002103:p0p0p0'))
      .set('X-CSRF-Token' , 'fetch'),
  observe: 'response' as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmpPhoto():any {
    //return of(dataNew);
    return this.http.get("/sap/opu/odata/sap/ZHR_ESS_PERSINFO_JIO_SRV/EmpPhotoSignSet?$filter eq ''",newHttpOptions);
  }

  getEmpPhotoRev():any {
    //return of(dataNew);
    return this.http.get("/sap/opu/odata/sap/ZHR_ESS_PERSINFO_JIO_SRV/FotoSignDoccatSet?$filter eq ''",newHttpOptions);
  }

  uploadFile(uploadFile,csrfToken,slug,filename){
    newheaders['X-CSRF-Token']=csrfToken;
    newheaders["Content-Disposition"]=`attachment; filename="${filename}"`;
    newheaders["Content-Type"]="image/jpeg";
    //newheaders["Content-Type"]="application/pdf";
    newheaders['SLUG']=slug;
    const httpOptions = new HttpHeaders(newheaders);
    return this.http.post<any>("/sap/opu/odata/sap/ZHR_FILEUPLOADER_JIO1_SRV/AttachmentSet", uploadFile, {headers: httpOptions,observe: 'response' as 'body'});
  }

  uploadContentSet(uploadFileData,csrfToken){
    newheaders['X-CSRF-Token']=csrfToken;
    newheaders["Content-Type"]="application/json";
    const httpOptions = new HttpHeaders(newheaders);
    console.log(newheaders);
    return this.http.post<any>("/sap/opu/odata/sap/ZHR_FILEUPLOADER_JIO1_SRV/UploadContentSet", uploadFileData, {headers: httpOptions});
  }

  uploadTestFile(formData){
    return this.http.post<any>("http://localhost/testphp/upload.php", formData);
  }
}
