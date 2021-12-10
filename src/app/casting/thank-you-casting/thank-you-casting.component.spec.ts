import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouCastingComponent } from './thank-you-casting.component';

describe('ThankYouCastingComponent', () => {
  let component: ThankYouCastingComponent;
  let fixture: ComponentFixture<ThankYouCastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouCastingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouCastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
