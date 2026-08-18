import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITarea } from '../models/i-tarea';

@Component({
  selector: 'app-data-form',
  imports: [ReactiveFormsModule],
  templateUrl: './data-form.html',
  styleUrls: ['./data-form.scss'],
})
export class DataForm implements OnInit {
  lista: ITarea[] = [];
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarTareas();
    this.taskForm = this.fb.group({
      tarea: new FormControl('', [Validators.required]),
      prioridad: new FormControl('Alta', [Validators.required]),
    });
  }

  guardarTarea(): void {
    const tarea = this.taskForm.value.tarea?.trim();
    const prioridad = this.taskForm.value.prioridad ?? '';

    if (!tarea) {
      return;
    }

    const newTask: ITarea = { tarea, prioridad };
    this.lista.push(newTask);
    this.guardarEnLocalStorage();
    this.taskForm.reset();
  }

  clearList(event: Event): void {
    this.lista = [];
    this.guardarEnLocalStorage();
  }

  deleteTask(event: Event, index: number): void {
    event.preventDefault();
    this.lista.splice(index, 1);
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('tareas', JSON.stringify(this.lista));
  }

  private cargarTareas(): void {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (!tareasGuardadas) {
      return;
    }
    try {
      const parsed = JSON.parse(tareasGuardadas);
      if (Array.isArray(parsed)) {
        this.lista = parsed.filter(
          (it) =>
            it &&
            typeof it.tarea === 'string' &&
            typeof it.prioridad === 'string'
        ) as ITarea[];
      }
    } catch {
      this.lista = [];
    }
  }
}
