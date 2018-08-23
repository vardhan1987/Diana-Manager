import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIntentComponent } from './home-intent.component';

describe('HomeIntentComponent', () => {
  let component: HomeIntentComponent;
  let fixture: ComponentFixture<HomeIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
