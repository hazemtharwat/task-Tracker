import { TasksService } from './../../Core/services/tasks.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
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
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Task } from "../../Core/task's Modul/task's modul";
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('inputFocus') inputFocus!: ElementRef;
  private toster = inject(ToastrService);
  @Output('tasksData') tasksData = new EventEmitter();
  private bottomSheetRef = inject(MatBottomSheetRef<CreateTaskComponent>);
  private tasksService = inject(TasksService);
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {}
  CreateTaskFrom = this.fb.group({
    title: ['', [Validators.required]],
    Priority: ['High', [Validators.required]],
    done: [false],
    progress: [0],
    date: [new Date(), [Validators.required]],
  });
  ngOnInit(): void {
    if(this.data){
      this.CreateTaskFrom.patchValue({
      title: this.data.item.title,
      Priority: this.data.item.Priority,
      date: this.data.item.date,
      progress:this.data.item.progress
    });
    }
    
  }
  ngAfterViewInit(): void {
    this.inputFocus.nativeElement.focus();
  }
  async createTaks() {
    const itemTask = this.CreateTaskFrom.getRawValue() as Task;
    await this.tasksService
      .createTask(itemTask)
      .then(() => {
        this.tasksService.setTaskData(itemTask);

        this.toster.success('تمت الاضافه ');
      })
      .catch((err) => {
        this.toster.error(err);
      });
  }

  async onsubmit() {
    if (this.CreateTaskFrom.invalid) {
      this.CreateTaskFrom.markAllAsTouched();
      return;
    }
    if (this.data) {
      this.bottomSheetRef.dismiss({index: this.data.index,item: this.CreateTaskFrom.value,});
    } else {

          await this.createTaks();
    this.bottomSheetRef.dismiss();
    }
  
  }
}
