import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrHeaderComponent } from './dr-header.component';

describe('DrHeaderComponent', () => {
  let component: DrHeaderComponent;
  let fixture: ComponentFixture<DrHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
