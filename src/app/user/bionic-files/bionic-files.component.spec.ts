import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BionicFilesComponent } from './bionic-files.component';

describe('BionicFilesComponent', () => {
  let component: BionicFilesComponent;
  let fixture: ComponentFixture<BionicFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BionicFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BionicFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
