import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMonthYearComponent } from './dialog-month-year.component';

describe('DialogMonthYearComponent', () => {
  let component: DialogMonthYearComponent;
  let fixture: ComponentFixture<DialogMonthYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMonthYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogMonthYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
