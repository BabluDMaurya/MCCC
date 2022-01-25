import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSeriesComponent } from './completed-series.component';

describe('CompletedSeriesComponent', () => {
  let component: CompletedSeriesComponent;
  let fixture: ComponentFixture<CompletedSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
