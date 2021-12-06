import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInnerComponent } from './training-inner.component';

describe('TrainingInnerComponent', () => {
  let component: TrainingInnerComponent;
  let fixture: ComponentFixture<TrainingInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
