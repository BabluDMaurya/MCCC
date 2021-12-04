import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCountryStateCityComponent } from './your-country-state-city.component';

describe('YourCountryStateCityComponent', () => {
  let component: YourCountryStateCityComponent;
  let fixture: ComponentFixture<YourCountryStateCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourCountryStateCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCountryStateCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
