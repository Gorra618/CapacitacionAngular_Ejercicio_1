import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-data-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './data-form.html',
  styleUrl: './data-form.scss',
})
export class DataForm implements OnInit {
  tarea: string = '';
  prioridad: string = '';
  lista: string[] = [];

  ngOnInit(): void {}

  seveTask(event: Event) {
    this.lista.push(this.tarea);
  }

  cleanTask(event: Event) {
    this.lista = [];
  }

  priority(event: Event) {
    const input = event.target as HTMLInputElement;
    this.prioridad = input.value;
  }

  newTask(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tarea = input.value;
  }
}
