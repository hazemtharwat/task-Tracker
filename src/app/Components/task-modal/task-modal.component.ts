import { Component } from '@angular/core';
import { Task } from "../../Core/task's Modul/task's modul";
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [MatIconModule,DatePipe,MatButtonModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  tasksList:Task[] = [
    {
      id: 1,
      title: 'Study Angular basics',
      date: new Date('2026-05-01'),
      done: true,
    },
    {
      id: 2,
      title: 'Build calendar UI',
      date: new Date('2026-05-02'),
      done: true,
    },
    {
      id: 3,
      title: 'Connect Firebase',
      date: new Date('2026-05-03'),
      done: false,
    },
    {
      id: 4,
      title: 'Implement add task feature',
      date: new Date('2026-05-04'),
      done: true,
    },
    {
      id: 5,
      title: 'Fix bugs in UI',
      date: new Date('2026-05-04'),
      done: false,
    },
    {
      id: 6,
      title: 'Add task filtering by date',
      date: new Date('2026-05-05'),
      done: false,
    },
    {
      id: 7,
      title: 'Work on charts for monthly review',
      date: new Date('2026-05-06'),
      done: false,
    },
    {
      id: 8,
      title: 'Refactor code',
      date: new Date('2026-05-06'),
      done: true,
    },
  ];
}
