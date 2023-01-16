import { Component } from '@angular/core';
import { Contact } from 'src/app/core/models/contact.model';

@Component({
  selector: 'app-contact-store',
  templateUrl: './contact-store.component.html',
  styleUrls: ['./contact-store.component.css']
})
export class ContactStoreComponent {

  contacts: Contact[];
}
