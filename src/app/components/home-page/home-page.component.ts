import { Component, OnInit } from '@angular/core';

import { List } from 'src/app/models/List';
import { HomePageService } from 'src/app/services/home-page.service';
import { ListMutationService } from 'src/app/services/list-mutation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  lists:List[];
  loading:boolean;
  createListActive:boolean;
  createListName:string;

  constructor(private homePageService:HomePageService,
              private listMutationService:ListMutationService){ }

  ngOnInit() {
     this.loading = true;
     this.homePageService
         .getAllLists()
         .subscribe(lists => {
          this.lists = lists;
          this.loading = false;
         });
    this.createListActive = false;
  }

  activateCreateList():void{
    this.createListActive = true;
  }

  createList():void{
    this.loading = true;
    this.listMutationService
        .createList(this.createListName)
        .subscribe(newList => {
          this.homePageService
              .getAllLists()
              .subscribe(lists => {
                this.lists = lists;
                this.loading = false;
               });
         });
    this.createListName = undefined;
    this.createListActive = false;
  }

  listEventReciever(event:any):void{
    this.loading = true;
    this.homePageService
        .getAllLists()
        .subscribe(lists => {
          this.lists = lists;
          this.loading = false;
         });
  }
}
