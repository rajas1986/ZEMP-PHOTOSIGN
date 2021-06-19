import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employeephoto',
  templateUrl: './employeephoto.component.html',
  styleUrls: ['./employeephoto.component.css']
})
export class EmployeephotoComponent implements OnInit {
  empPhotoString  = "";
  empPhotoSet = false;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmpPhoto().subscribe(
      (response) => {
        //this.dataSource = response;
        this.empPhotoString = response.body.d.results[0].DocId;
        //console.log(this.empPhotoString);
        if(this.empPhotoString==""){
          this.empPhotoSet = true;
        } else {
          this.empPhotoSet = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.employeeService.getEmpPhotoRev().subscribe(
      (response) => {
        //this.dataSource = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
