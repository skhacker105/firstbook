import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-inventory-store',
  templateUrl: './inventory-store.component.html',
  styleUrls: ['./inventory-store.component.css']
})
export class InventoryStoreComponent implements OnInit, OnDestroy {
  
  currentQuery: string = '';
  pageSize = 15;
  currentPage = 1;
  total = 30;
  maxPages = 8;
  querySub$: Subscription | undefined;
  routeChangeSub$: Subscription | undefined;

  constructor(
    private helperService: HelperService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.helperService.setAddEntityConfig('/inventory/create');
    this.routeChangeSub$ = this.route.params.subscribe((params) => {
      this.currentQuery = params['query'] ? params['query'] : '';
      // this.initRequest(this.currentQuery);
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

}
