import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelsInner1Component } from './reels-inner1.component';

describe('ReelsInner1Component', () => {
  let component: ReelsInner1Component;
  let fixture: ComponentFixture<ReelsInner1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReelsInner1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelsInner1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
