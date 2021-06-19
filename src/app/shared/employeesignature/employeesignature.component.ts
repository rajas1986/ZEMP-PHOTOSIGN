import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NotificationService } from '../notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup,FormArray, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employeesignature',
  templateUrl: './employeesignature.component.html',
  styleUrls: ['./employeesignature.component.css']
})

export class EmployeesignatureComponent implements OnInit {
  imageSignatureSrc:any;
  imagePhotoSrc:any;
  uploadedFiles:any={};
  uploadContentSet:any={};
  fileList:any={};
  fileDetails:any={};
  isFileUploaded = false;
  empSignatureString  = "";
  empSignatureSet = false;
  empPhotoString  = "";
  empPhotoSet = false;
  csrfToken;
  control: FormArray;
  fileUploadControl = new FormControl('',Validators.required);
  signatureUploadControl = new FormControl('',Validators.required);

  // Testing File upload
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private employeeService: EmployeeService, 
              private sanitizer:DomSanitizer,
              private notificationService: NotificationService
            ) { }
  
  ngOnInit() {
    this.employeeService.getEmpPhoto().subscribe(
      (response) => {
        this.csrfToken = response['headers'].get('X-CSRF-Token');
        this.empSignatureString = response.body.d.results[1].DocId;
        if(this.empSignatureString==""){
          this.empSignatureSet = true;
        } else {
          this.empSignatureSet = false;
        }

        this.empPhotoString = response.body.d.results[0].DocId;
        //console.log(this.empPhotoString);
        if(this.empPhotoString==""){
          this.empPhotoSet = true;
        } else {
          this.empPhotoSet = false;
        }
        //this.empPhotoSet = true;
        //console.log(this.empSignatureString);
      },
      (error) => {
        console.log(error);
      }
    );

    this.employeeService.getEmpPhotoRev().subscribe(
      (response) => {
        //this.dataSource = response;
        this.fileDetails['photo_doccat'] = response.body.d.results[0].DocCat;
        this.fileDetails['photo_objid'] = response.body.d.results[0].ObjId;
        this.fileDetails['photo_desc'] = response.body.d.results[0].Desc;
        this.fileDetails['signature_doccat'] = response.body.d.results[1].DocCat;
        this.fileDetails['signature_objid'] = response.body.d.results[1].ObjId;
        this.fileDetails['signature_desc'] = response.body.d.results[1].Desc;
        //console.log("helloooo");
        //console.log(this.fileDetails);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get f(){
    return this.myForm.controls;
  }
        
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
        
  submit(){
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource').value);
    console.log(this.myForm.get('fileSource'));
    //let slug=`@${this.myForm.get('fileSource').value.name}@${this.fileDetails.signature_doccat}@${this.fileDetails.signature_objid}`;
    this.fileDetails.signature_doccat = "ZHRAADHAR"
    let slug=`@${this.myForm.get('fileSource').value.name}@${this.fileDetails.signature_doccat}@${this.fileDetails.signature_objid}@@`;
    this.employeeService.uploadFile(formData,this.csrfToken,slug,this.myForm.get('fileSource').value.name).subscribe(res=>{
      //this.spinner.hide('loading');
      console.log(res);
      if(res.body.d.ErrTyp== "E"){
        this.notificationService.warn(res.d.ErrMsg)
      }
      else{
        
        //this.csrfToken = res['headers'].get('X-CSRF-Token');
        this.uploadContentSet["ClaimNo"] = res.body.d.ClaimNo;
        this.uploadContentSet["DocCat"] = res.body.d.DocCat;
        //this.getDocCategorySet(this.docCategoryData.Pernr);
        //this.getUploadedFile(this.docCategoryData.Pernr);
        
        // this.employeeService.uploadContentSet(this.uploadContentSet,this.csrfToken).subscribe(response=>{
        //   //this.spinner.hide('loading');
        //   if(response.d.ErrTyp== "E"){
        //     this.notificationService.warn(response.d.ErrMsg)
        //   }
        //   else{
        //     console.log(response);
        //     this.isFileUploaded = true;
        //     this.notificationService.primary('Signature Uploaded Successfully.')
        //   }
        // },
        // error=>{
        //   console.log(error);
        //   //this.spinner.hide('loading');
        //   this.notificationService.info(error.error.error.message.value);
        // })
        
      }
    },
    error=>{
      //this.spinner.hide('loading');
      this.notificationService.info(error.error.error.message.value);
    })
    // this.employeeService.uploadTestFile(formData).subscribe(response=>{
    //   //console.log(response);
    // },
    // error=>{
    //   //console.log(error);
    //   this.notificationService.info(error.error.error.message.value);
    // })


  }

  obtainSignatureFileName(event){
    this.fileList = event[0];
    if (this.fileList) {
      const file = this.fileList;

      const reader = new FileReader();
      reader.onload = e => this.imageSignatureSrc = reader.result;

      reader.readAsDataURL(file);
  }
  }

  uploadSignature(fileUpload){
    //this.spinner.show('loading');
    // this.docCategoryData.Fkey
    let slug=`@${this.fileList.name}@${this.fileDetails.signature_doccat}@${this.fileDetails.signature_objid}`;
    //let slug= `ZSIGN@${this.fileList.name}@${this.docCategoryData.DocCategory}@${this.docCategoryData.Filekey}@X@@${this.docCategoryData.Pernr}`;
    const formData = new FormData();
    //console.log(this.fileList);
    //formData.append("file", this.fileList); 
    this.employeeService.uploadFile(this.fileList,this.csrfToken,slug,this.fileList.name).subscribe(res=>{
      //this.spinner.hide('loading');
      console.log(res);
      if(res.body.d.ErrTyp== "E"){
        this.notificationService.warn(res.d.ErrMsg)
      }
      else{
        
        //this.csrfToken = res['headers'].get('X-CSRF-Token');
        this.uploadContentSet["ClaimNo"] = res.body.d.ClaimNo;
        this.uploadContentSet["DocCat"] = res.body.d.DocCat;
        //this.getDocCategorySet(this.docCategoryData.Pernr);
        //this.getUploadedFile(this.docCategoryData.Pernr);
        this.employeeService.uploadContentSet(this.uploadContentSet,this.csrfToken).subscribe(response=>{
          //this.spinner.hide('loading');
          if(response.d.ErrTyp== "E"){
            this.notificationService.warn(response.d.ErrMsg)
          }
          else{
            console.log(response);
            this.isFileUploaded = true;
            this.notificationService.primary('Signature Uploaded Successfully.')
          }
        },
        error=>{
          console.log(error);
          //this.spinner.hide('loading');
          this.notificationService.info(error.error.error.message.value);
        })
      }
    },
    error=>{
      //this.spinner.hide('loading');
      this.notificationService.info(error.error.error.message.value);
    })
  }

  obtainPhotoFileName(event){
    this.fileList = event[0];
    if (this.fileList) {
      const file = this.fileList;

      const reader = new FileReader();
      reader.onload = e => this.imagePhotoSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  uploadPhoto(fileUpload){
    //this.spinner.show('loading');
    // this.docCategoryData.Fkey
    let slug=`@${this.fileList.name}@${this.fileDetails.photo_doccat}@${this.fileDetails.photo_objid}`;
    //let slug= `ZSIGN@${this.fileList.name}@${this.docCategoryData.DocCategory}@${this.docCategoryData.Filekey}@X@@${this.docCategoryData.Pernr}`;
    const formData = new FormData();
    //console.log(this.fileList);
    //formData.append("file", this.fileList); 
    this.employeeService.uploadFile(this.fileList,this.csrfToken,slug,this.fileList.name).subscribe(res=>{
      //this.spinner.hide('loading');
      console.log(res);
      if(res.body.d.ErrTyp== "E"){
        this.notificationService.warn(res.d.ErrMsg)
      }
      else{
        
        //this.csrfToken = res['headers'].get('X-CSRF-Token');
        this.uploadContentSet["ClaimNo"] = res.body.d.ClaimNo;
        this.uploadContentSet["DocCat"] = res.body.d.DocCat;
        //this.getDocCategorySet(this.docCategoryData.Pernr);
        //this.getUploadedFile(this.docCategoryData.Pernr);
        this.employeeService.uploadContentSet(this.uploadContentSet,this.csrfToken).subscribe(response=>{
          //this.spinner.hide('loading');
          if(response.d.ErrTyp== "E"){
            this.notificationService.warn(response.d.ErrMsg)
          }
          else{
            console.log(response);
            this.isFileUploaded = true;
            this.notificationService.primary('Photo Uploaded Successfully.')
          }
        },
        error=>{
          console.log(error);
          //this.spinner.hide('loading');
          this.notificationService.info(error.error.error.message.value);
        })
      }
    },
    error=>{
      //this.spinner.hide('loading');
      this.notificationService.info(error.error.error.message.value);
    })
  }

}
