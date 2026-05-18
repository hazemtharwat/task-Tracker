import { Timestamp } from "@angular/fire/firestore";

export interface Task {
  id?:string|undefined,
  title: string|undefined;
  date: Date;
  done: boolean|null;
  progress:number|null;
  Priority:String|null,
}