import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreationLayoutComponent } from './post-creation-layout.component';

describe('PostCreationLayoutComponent', () => {
  let component: PostCreationLayoutComponent;
  let fixture: ComponentFixture<PostCreationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
