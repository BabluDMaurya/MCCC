import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectYourGenderComponent } from './select-your-gender.component';

describe('SelectYourGenderComponent', () => {
  let component: SelectYourGenderComponent;
  let fixture: ComponentFixture<SelectYourGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectYourGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectYourGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
