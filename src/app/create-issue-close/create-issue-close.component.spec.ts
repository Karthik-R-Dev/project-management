import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueCloseComponent } from './create-issue-close.component';

describe('CreateIssueCloseComponent', () => {
  let component: CreateIssueCloseComponent;
  let fixture: ComponentFixture<CreateIssueCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIssueCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIssueCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
