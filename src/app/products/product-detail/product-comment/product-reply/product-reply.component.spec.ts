import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReplyComponent } from './product-reply.component';

describe('ProductReplyComponent', () => {
  let component: ProductReplyComponent;
  let fixture: ComponentFixture<ProductReplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
