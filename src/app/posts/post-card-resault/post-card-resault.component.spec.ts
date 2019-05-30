import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardResaultComponent } from './post-card-resault.component';

describe('PostCardResaultComponent', () => {
  let component: PostCardResaultComponent;
  let fixture: ComponentFixture<PostCardResaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardResaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardResaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
