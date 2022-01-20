import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForProducerComponent } from './for-producer.component';

describe('ForProducerComponent', () => {
  let component: ForProducerComponent;
  let fixture: ComponentFixture<ForProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForProducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
