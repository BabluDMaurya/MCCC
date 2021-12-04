import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMobileNumberComponent } from './your-mobile-number.component';

describe('YourMobileNumberComponent', () => {
  let component: YourMobileNumberComponent;
  let fixture: ComponentFixture<YourMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourMobileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
