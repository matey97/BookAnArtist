import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationResponseComponent } from './reclamation-response.component';

describe('ReclamationResponseComponent', () => {
  let component: ReclamationResponseComponent;
  let fixture: ComponentFixture<ReclamationResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
