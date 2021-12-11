import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkCastingCardComponent } from './bookmark-casting-card.component';

describe('BookmarkCastingCardComponent', () => {
  let component: BookmarkCastingCardComponent;
  let fixture: ComponentFixture<BookmarkCastingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkCastingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkCastingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
