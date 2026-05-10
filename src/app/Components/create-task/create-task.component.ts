import { TasksService } from './../../Core/services/tasks.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { TaskModalComponent } from '../task-List/task-List.component';
import { Task } from "../../Core/task's Modul/task's modul";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  @Output('tasksData') tasksData=new EventEmitter();
  private bottomSheetRef = inject(MatBottomSheetRef<CreateTaskComponent>);
  private tasksService = inject(TasksService);
  newTaskInputValue!: string;
  campaignTwo: any;
  constructor(private fb: FormBuilder) {}
  CreateTaskFrom = this.fb.group({
    title: ['', [Validators.required]],
    Priority: ['Hight', [Validators.required]],
    done: [false, [Validators.required]],
    progress: [0, [Validators.required]],
    date: [new Date(), [Validators.required]],
  });
  async createTaks() {
    const itemTask = this.CreateTaskFrom.getRawValue() as Task;
    this.tasksService.sendTaskData(itemTask)
    await this.tasksService.createTask(itemTask);
  }

  async onsubmit() {
    if (this.CreateTaskFrom.invalid) {
      this.CreateTaskFrom.markAllAsTouched();
      return;
    }
    if (this.CreateTaskFrom.value) {
      await this.createTaks();
      this.bottomSheetRef.dismiss(this.CreateTaskFrom.value);

      console.log(this.CreateTaskFrom.getRawValue());
    }
  }
}
