import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map} from 'rxjs/operators';

import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import { Item } from 'src/app/models/Item';

const createItemMutation = gql
`mutation createItemMutation($input:createItemInput){
    item:createItem(input:$input){
      id
      name
      listId
      position
    }
}`;

const deleteItemMutation = gql
`mutation deleteItemMutation($id:ID!){
  success:deleteItem(id:$id)
}`;

const moveItemMutation = gql
`mutation moveItemMutation($id:ID!,$input:moveItemInput){
    item:moveItem(id:$id,input:$input){
      id
      name
      listId
      position
    }
}`;

@Injectable({
  providedIn: 'root'
})
export class ItemMutationService {

  constructor(private apollo: Apollo) { }

  createItem(itemName:String,listID:Number):Observable<Item> {
    let input = {"name":itemName, "listId":listID};
    return this.apollo.mutate({
        mutation: createItemMutation,
        variables:{input:input}
      }).pipe(map(result => result.data['item']));
  }

  deleteItem(item:Item):Observable<boolean>{
    return this.apollo.mutate({
        mutation: deleteItemMutation,
        variables:{id:item.id}
      }).pipe(map(result => result['success']));
  }

  moveItem(item:Item,newListId:Number,newPosition:Number):Observable<Item>{
    let input = {"listId":newListId,"position":newPosition};
    return this.apollo.mutate({
        mutation: moveItemMutation,
        variables:{id:item.id,
                   input:input}
      }).pipe(map(result => result.data['item']));
  }
}
