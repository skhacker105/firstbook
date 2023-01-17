// Decorators
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddEntity } from './core/models/add-entity.model';
import { HelperService } from './core/services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  addEntity: AddEntity | undefined
  constructor(private helperService: HelperService, private router: Router) {}

  ngOnInit(): void {
    this.helperService.addEntity.subscribe(res => {
      this.addEntity = res;
    });
  }

  rerouteToAddEntity() {
    if (this.addEntity)
    this.router.navigateByUrl(this.addEntity.url);
  }
}
