import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeephotoComponent } from './employeephoto.component';

describe('EmployeephotoComponent', () => {
  let component: EmployeephotoComponent;
  let fixture: ComponentFixture<EmployeephotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeephotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeephotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
