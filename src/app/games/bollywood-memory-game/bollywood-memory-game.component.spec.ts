import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BollywoodMemoryGameComponent } from './bollywood-memory-game.component';

describe('BollywoodMemoryGameComponent', () => {
  let component: BollywoodMemoryGameComponent;
  let fixture: ComponentFixture<BollywoodMemoryGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BollywoodMemoryGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BollywoodMemoryGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
