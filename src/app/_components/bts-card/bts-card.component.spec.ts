import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsCardComponent } from './bts-card.component';

describe('BtsCardComponent', () => {
  let component: BtsCardComponent;
  let fixture: ComponentFixture<BtsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
