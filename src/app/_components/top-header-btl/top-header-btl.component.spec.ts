import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderBtlComponent } from './top-header-btl.component';

describe('TopHeaderBtlComponent', () => {
  let component: TopHeaderBtlComponent;
  let fixture: ComponentFixture<TopHeaderBtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeaderBtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeaderBtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
