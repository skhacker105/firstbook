import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStoreComponent } from './contact-store.component';

describe('ContactStoreComponent', () => {
  let component: ContactStoreComponent;
  let fixture: ComponentFixture<ContactStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
