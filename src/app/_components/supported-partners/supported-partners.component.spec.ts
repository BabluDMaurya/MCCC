import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportedPartnersComponent } from './supported-partners.component';

describe('SupportedPartnersComponent', () => {
  let component: SupportedPartnersComponent;
  let fixture: ComponentFixture<SupportedPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportedPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
