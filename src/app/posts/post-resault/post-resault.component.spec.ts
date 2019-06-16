import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostResaultComponent } from './post-resault.component';

describe('PostResaultComponent', () => {
  let component: PostResaultComponent;
  let fixture: ComponentFixture<PostResaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostResaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostResaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
