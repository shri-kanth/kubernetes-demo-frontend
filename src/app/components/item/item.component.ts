import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Item } from 'src/app/models/Item';
import { ItemMutationService } from 'src/app/services/item-mutation.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item:Item;
  
  @Output() itemEventEmitter:EventEmitter<any> = new EventEmitter();

  constructor(private itemMutationService:ItemMutationService) { }

  ngOnInit() {
  }

  deleteItem():void{
      this.itemMutationService
          .deleteItem(this.item)
          .subscribe(result => {
            this.itemEventEmitter.emit("ITEM_DELETED");
          });
  }
}
