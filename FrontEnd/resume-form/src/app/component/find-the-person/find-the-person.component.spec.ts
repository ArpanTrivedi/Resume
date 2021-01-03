import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindThePersonComponent } from './find-the-person.component';

describe('FindThePersonComponent', () => {
  let component: FindThePersonComponent;
  let fixture: ComponentFixture<FindThePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindThePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindThePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
