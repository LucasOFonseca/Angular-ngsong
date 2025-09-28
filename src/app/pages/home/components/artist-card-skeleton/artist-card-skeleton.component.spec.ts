import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCardSkeletonComponent } from './artist-card-skeleton.component';

describe('ArtistCardSkeletonComponent', () => {
  let component: ArtistCardSkeletonComponent;
  let fixture: ComponentFixture<ArtistCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
