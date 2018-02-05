import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoleColumnsComponent } from './hole-columns.component';

describe('HoleColumnsComponent', () => {
  let component: HoleColumnsComponent;
  let fixture: ComponentFixture<HoleColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoleColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoleColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
