import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsCategoryCardComponent } from './bts-category-card.component';

describe('BtsCategoryCardComponent', () => {
  let component: BtsCategoryCardComponent;
  let fixture: ComponentFixture<BtsCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtsCategoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
