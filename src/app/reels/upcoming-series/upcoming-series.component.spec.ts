import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingSeriesComponent } from './upcoming-series.component';

describe('UpcomingSeriesComponent', () => {
  let component: UpcomingSeriesComponent;
  let fixture: ComponentFixture<UpcomingSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
