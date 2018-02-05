import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTeeComponent } from './choose-tee.component';

describe('ChooseTeeComponent', () => {
  let component: ChooseTeeComponent;
  let fixture: ComponentFixture<ChooseTeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseTeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
