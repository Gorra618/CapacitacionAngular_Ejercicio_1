import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-data-form',
  imports: [ReactiveFormsModule],
  templateUrl: './data-form.html',
  styleUrl: './data-form.scss',
})
export class DataForm {
  lista: { tarea: string; prioridad: string }[] = [];
  taskForm = new FormGroup({
    tarea: new FormControl('', [Validators.required]),
    prioridad: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      tarea: ['', Validators.required],
      prioridad: ['', Validators.required],
    });
  }

  guardarTarea(): void {
    const tarea = this.taskForm.value.tarea?.trim();
    const prioridad = this.taskForm.value.prioridad ?? '';

    if (!tarea) {
      return;
    }

    this.lista.push({ tarea, prioridad });
    this.taskForm.reset();
  }

  clearTasks(event:Event){
    this.lista = []
  }

}
