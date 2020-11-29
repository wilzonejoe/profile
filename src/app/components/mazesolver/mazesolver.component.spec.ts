import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MazesolverComponent } from './mazesolver.component';

describe('MazesolverComponent', () => {
  let component: MazesolverComponent;
  let fixture: ComponentFixture<MazesolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MazesolverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazesolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
