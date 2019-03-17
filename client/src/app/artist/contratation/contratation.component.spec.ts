import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratationComponent } from './contratation.component';

describe('ContratationComponent', () => {
  let component: ContratationComponent;
  let fixture: ComponentFixture<ContratationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
