import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchResultLayoutComponent } from './post-search-result-layout.component';

describe('PostSearchResultLayoutComponent', () => {
  let component: PostSearchResultLayoutComponent;
  let fixture: ComponentFixture<PostSearchResultLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSearchResultLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSearchResultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
