import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductoComponent } from './delete-producto.component';

describe('DeleteProductoComponent', () => {
  let component: DeleteProductoComponent;
  let fixture: ComponentFixture<DeleteProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
