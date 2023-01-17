import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/core/models/contact.model';
import { ContactService } from 'src/app/core/services/contact.service';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-contact-store',
  templateUrl: './contact-store.component.html',
  styleUrls: ['./contact-store.component.css']
})
export class ContactStoreComponent {
  currentQuery: string = '';
  pageSize = 15;
  currentPage = 1;
  total = 30;
  maxPages = 8;
  querySub$: Subscription | undefined;
  routeChangeSub$: Subscription | undefined;
  contacts: Contact[] = [];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.helperService.setAddEntityConfig('/contact/create');
    this.routeChangeSub$ = this.route.params.subscribe((params) => {
      this.currentQuery = params['query'] ? params['query'] : '';
      this.initRequest(this.currentQuery);
    });

    this.querySub$ = this.helperService
      .searchQuery
      .subscribe(() => {
        this.currentPage = 1;
      });
  }

  ngOnDestroy(): void {
    this.routeChangeSub$ ? this.routeChangeSub$.unsubscribe() : null;
    this.querySub$ ? this.querySub$.unsubscribe() : null;
    this.helperService.resetAddEntityConfig();
  }

  initRequest(query: string): void {
    query = this.generateQuery(query);
    this.contactService
      .search(query)
      .subscribe((res) => {
        this.total = res.itemsCount ? res.itemsCount : 0;
        this.contacts = res.data ? res.data : [];
      });
  }

  generateQuery(query: string): string {
    if (query === 'default') {
      return `?sort={"creationDate":-1}`
        + `&skip=${(this.currentPage - 1) * this.pageSize}`
        + `&limit=${this.pageSize}`;
    }

    return `?query={"searchTerm":"${query}"}`
      + `&sort={"creationDate":-1}`
      + `&skip=${(this.currentPage - 1) * this.pageSize}`
      + `&limit=${this.pageSize}`;
  }

  pageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.initRequest(this.currentQuery);
  }
}
