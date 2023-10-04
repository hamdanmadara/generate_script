import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScriptComponent } from './input-script.component';

describe('InputScriptComponent', () => {
  let component: InputScriptComponent;
  let fixture: ComponentFixture<InputScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
