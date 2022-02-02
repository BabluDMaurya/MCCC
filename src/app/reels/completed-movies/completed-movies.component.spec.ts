import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedMoviesComponent } from './completed-movies.component';

describe('CompletedMoviesComponent', () => {
  let component: CompletedMoviesComponent;
  let fixture: ComponentFixture<CompletedMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
