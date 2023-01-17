import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})
export class ContactAddEditComponent {
  createBookForm: FormGroup | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.createBookForm = this.fb.group({
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      type: new FormControl(''),
      contact1: new FormControl(''),
      contact2: new FormControl(''),
      address: new FormControl('')
    });
  }

  onSubmit(): void {
    if (!this.createBookForm) return;
    this.contactService
      .createContact(this.createBookForm.value)
      .subscribe((res) => {
        if (!res.data) return;
        this.router.navigate([`/contact/details/${res.data._id}`]);
      });
  }

  get title(): AbstractControl | null | undefined {
    return this.createBookForm?.get('title');
  }

  get firstName(): AbstractControl | null | undefined {
    return this.createBookForm?.get('firstName');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.createBookForm?.get('lastName');
  }

  get type(): AbstractControl | null | undefined {
    return this.createBookForm?.get('type');
  }

  get contact1(): AbstractControl | null | undefined {
    return this.createBookForm?.get('contact1');
  }

  get contact2(): AbstractControl | null | undefined {
    return this.createBookForm?.get('contact2');
  }

  get address(): AbstractControl | null | undefined {
    return this.createBookForm?.get('address');
  }
}
