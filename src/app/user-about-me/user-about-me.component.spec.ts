import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutMeComponent } from './user-about-me.component';

describe('UserAboutMeComponent', () => {
  let component: UserAboutMeComponent;
  let fixture: ComponentFixture<UserAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAboutMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
