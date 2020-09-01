import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCollectorLoginComponent } from './artist-collector-login.component';

describe('ArtistCollectorLoginComponent', () => {
  let component: ArtistCollectorLoginComponent;
  let fixture: ComponentFixture<ArtistCollectorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistCollectorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCollectorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
