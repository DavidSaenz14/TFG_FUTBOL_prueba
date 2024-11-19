import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadiosComponent } from './estadios.component';

describe('EstadiosComponent', () => {
  let component: EstadiosComponent;
  let fixture: ComponentFixture<EstadiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
