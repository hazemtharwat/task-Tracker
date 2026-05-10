import { Timestamp } from "@angular/fire/firestore";

export interface Task {
  id?:string,
  title: string|null;
  date: Date|Timestamp;
  done: boolean|null;
  progress:number|null;
  Priority:String|null,
}