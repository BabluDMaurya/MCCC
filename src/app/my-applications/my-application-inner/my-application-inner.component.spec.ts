import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApplicationInnerComponent } from './my-application-inner.component';

describe('MyApplicationInnerComponent', () => {
  let component: MyApplicationInnerComponent;
  let fixture: ComponentFixture<MyApplicationInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyApplicationInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApplicationInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
