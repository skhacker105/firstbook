import { Component, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input('contact') contact: Contact | undefined;

  actions=[
    {
      maticon: 'edit',
      action: 'edit',
      display: 'Edit',
      isDelete: false
    },
    {
      maticon: 'open_in_browser',
      action: 'view',
      display: 'View',
      isDelete: false
    },
    {
      maticon: 'chat',
      action: 'chat',
      display: 'Chat',
      isDelete: false
    },
    {
      maticon: 'delete_forever',
      action: 'delete',
      display: 'Delete',
      isDelete: true
    }
  ];
}
