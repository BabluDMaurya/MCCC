import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSuccessComponent } from './final-success.component';

describe('FinalSuccessComponent', () => {
  let component: FinalSuccessComponent;
  let fixture: ComponentFixture<FinalSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
