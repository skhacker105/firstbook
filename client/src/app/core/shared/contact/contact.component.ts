import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';

interface IAction {
  maticon: string,
  action: string,
  display: string,
  isDelete: boolean
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input('contact') contact: Contact | undefined;

  actions: IAction[] = [
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

  constructor(private router: Router) { }

  onActionClick(a: IAction) {
    switch (a.action) {
      case 'edit': this.editClick(); break;
    }
  }

  editClick() {
    if (!this.contact) return;
    this.router.navigate(['contact/edit', this.contact._id]);
  }
}
