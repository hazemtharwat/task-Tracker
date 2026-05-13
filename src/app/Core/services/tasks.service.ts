import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { BehaviorSubject, map, Observable, timestamp } from 'rxjs';
import { Task } from "../task's Modul/task's modul";
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksFrom = new BehaviorSubject<any[]>([]);
  tasksFromList$ = this.tasksFrom.asObservable();
  private _firestore = inject(Firestore);
  private collectionName = 'TasksList';
  tasksRef = collection(
    this._firestore,
    this.collectionName,
  ) as CollectionReference<Task>;

  constructor() {}
  //createTask
  setTaskData(tasks: any) {
    const currentValue=this.tasksFrom.value
    this.tasksFrom.next([...currentValue,tasks]);
  }
  async createTask(data: Task): Promise<void> {
    const itemCollection = collection(this._firestore, this.collectionName);
    await addDoc(itemCollection, data);
  }
  getTasksData(): Observable<Task[]> {
    return collectionData(this.tasksRef,{idField:'id'}).pipe(map((item)=>item.map(el=>{
      if(el['date'] instanceof Timestamp){
        return {
          ...el,
          date:el['date'].toDate()
        }
      }
      return el;
    }
  )));
  }
  async updateItem(id: Task, data: any): Promise<void> {
    const item = doc(this._firestore, `${this.collectionName}/${id}`);
    await updateDoc(item,data);
  }
  async deleteItem(id: string): Promise<void> {
    const item = doc(this._firestore, `${this.collectionName}/${id}`);
    await deleteDoc(item);
  }
}
