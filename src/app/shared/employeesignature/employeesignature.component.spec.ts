import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesignatureComponent } from './employeesignature.component';

describe('EmployeesignatureComponent', () => {
  let component: EmployeesignatureComponent;
  let fixture: ComponentFixture<EmployeesignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
