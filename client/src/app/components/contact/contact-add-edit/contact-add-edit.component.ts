import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.css']
})
export class ContactAddEditComponent {
  createContactForm: FormGroup | undefined;
  id: string | null | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.createContactForm = this.fb.group({
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      type: new FormControl(''),
      contact1: new FormControl(''),
      contact2: new FormControl(''),
      address: new FormControl('')
    });
    this.id = this.route.snapshot.paramMap.get('contactId');
    if (!this.id) return;
    this.contactService
      .getSingleContact(this.id)
      .subscribe((res) => {
        this.createContactForm ? this.createContactForm.patchValue({ ...res.data }) : null;
      });
  }

  onSubmit(): void {
    if (!this.createContactForm) return;
    if (!this.id) {
      this.contactService
        .createContact(this.createContactForm.value)
        .subscribe((res) => {
          if (!res.data) return;
          this.router.navigate([`/contact/details/${res.data._id}`]);
        });
    } else {
      this.contactService
      .editContact(this.id, this.createContactForm.value)
      .subscribe((res) => {
        res.data ? this.router.navigateByUrl(`/contact`) : null;
      });
    }
  }

  get title(): AbstractControl | null | undefined {
    return this.createContactForm?.get('title');
  }

  get firstName(): AbstractControl | null | undefined {
    return this.createContactForm?.get('firstName');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.createContactForm?.get('lastName');
  }

  get type(): AbstractControl | null | undefined {
    return this.createContactForm?.get('type');
  }

  get contact1(): AbstractControl | null | undefined {
    return this.createContactForm?.get('contact1');
  }

  get contact2(): AbstractControl | null | undefined {
    return this.createContactForm?.get('contact2');
  }

  get address(): AbstractControl | null | undefined {
    return this.createContactForm?.get('address');
  }
}
