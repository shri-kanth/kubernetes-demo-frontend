import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

import { List } from 'src/app/models/List';
import { Item } from 'src/app/models/Item';

import { ListMutationService } from 'src/app/services/list-mutation.service';
import { ItemMutationService } from 'src/app/services/item-mutation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  createItemActive: boolean;

  createItemName: string;

  @Input() list: List;

  @Input() allLists: List[];

  @Output() listEventEmitter:EventEmitter<any> = new EventEmitter();

  constructor(private listMutationService:ListMutationService,
              private itemMutationService:ItemMutationService) { }

  ngOnInit() {
    this.createItemActive = false;
  }

  drop(event: CdkDragDrop<Item[]>) {  
    let previousList = this.allLists.find(list => String(list.id) == event.previousContainer.id); 
    let currentList = this.allLists.find(list => String(list.id) == event.container.id); 
    let currentPosition = event.currentIndex;
    let item = previousList.items[event.previousIndex];
    this.itemMutationService
        .moveItem(item,currentList.id,currentPosition)
        .subscribe(result => {
          this.listEventEmitter.emit("ITEM_MOVED");
        });
  }

  activateCreateItem():void{
    this.createItemActive = true;
  }

  createItem():void{
    this.itemMutationService
      .createItem(this.createItemName,this.list.id)
      .subscribe(result => {
        this.listEventEmitter.emit("ITEM_CREATED");
      });
      this.createItemActive = false;
      this.createItemName = undefined;
  }

  deleteList():void{
    this.listMutationService.deleteList(this.list).subscribe(result => {
      this.listEventEmitter.emit("LIST_DELETED");
    });
  }

  itemEventReciever(event):void{
    this.listEventEmitter.emit(event);
  }
}
