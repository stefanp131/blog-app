import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentaryComponent } from './create-commentary.component';

describe('CreateCommentaryComponent', () => {
  let component: CreateCommentaryComponent;
  let fixture: ComponentFixture<CreateCommentaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommentaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
