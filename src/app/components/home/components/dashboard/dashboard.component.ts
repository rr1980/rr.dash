import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { HomeModel } from 'src/app/components/home/models/home.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public homeData: HomeModel;

  constructor(private homeService: HomeService) { };

  ngOnInit() {

    this.homeService.Model.subscribe((response) => {
      this.homeData = response;
    });
  };
};
