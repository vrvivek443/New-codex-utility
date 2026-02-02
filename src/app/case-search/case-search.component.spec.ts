import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSearchComponent } from './case-search.component';

describe('CaseSearchComponent', () => {
  let component: CaseSearchComponent;
  let fixture: ComponentFixture<CaseSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseSearchComponent]
    });
    fixture = TestBed.createComponent(CaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
