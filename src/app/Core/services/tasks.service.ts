import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../task\'s Modul/task\'s modul';
import { promises } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
    private _firestore = inject(Firestore);
    private collectionName='TasksList'
  constructor() { }
  //createTask
  async createTask(data:Task):Promise<void>{
    const itemCollection=collection(this._firestore,this.collectionName)
   await  addDoc(itemCollection,data)
  }
  getTasksData():Observable<Task[]>{
  const tasksRef = collection(this._firestore, 'tasks') as CollectionReference<Task>;;
  return collectionData(tasksRef)
  }
}
