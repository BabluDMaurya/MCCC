import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHeaderBTComponent } from './top-header-bt.component';

describe('TopHeaderBTComponent', () => {
  let component: TopHeaderBTComponent;
  let fixture: ComponentFixture<TopHeaderBTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHeaderBTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHeaderBTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
