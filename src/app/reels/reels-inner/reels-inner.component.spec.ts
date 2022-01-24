import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelsInnerComponent } from './reels-inner.component';

describe('ReelsInnerComponent', () => {
  let component: ReelsInnerComponent;
  let fixture: ComponentFixture<ReelsInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReelsInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
