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
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from "../task's Modul/task's modul";
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasksFrom = new BehaviorSubject([]);
  tasksFromList$ = this.tasksFrom.asObservable();
  private _firestore = inject(Firestore);
  private collectionName = 'TasksList';
  tasksRef = collection(
    this._firestore,
    this.collectionName,
  ) as CollectionReference<Task>;

  constructor() {}
  //createTask
  sendTaskData(tasks: any) {
    this.tasksFrom.next(tasks);
  }
  async createTask(data: Task): Promise<void> {
    const itemCollection = collection(this._firestore, this.collectionName);
    await addDoc(itemCollection, data);
  }
  getTasksData(): Observable<Task[]> {
    return collectionData(this.tasksRef);
  }
  async updateItem(id: any, data: any): Promise<void> {
    const item = doc(this._firestore, `${this.collectionName}/${id}`);
    await updateDoc(data, item);
  }
  async deleteItem(id: string): Promise<void> {
    const item = doc(this._firestore, `${this.collectionName}/${id}`);
    await deleteDoc(item);
  }
}
