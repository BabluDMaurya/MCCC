import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSplashComponent } from './inner-splash.component';

describe('InnerSplashComponent', () => {
  let component: InnerSplashComponent;
  let fixture: ComponentFixture<InnerSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerSplashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
