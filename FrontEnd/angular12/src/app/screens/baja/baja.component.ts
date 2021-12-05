import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.css']
})
export class BajaComponent implements OnInit {
  form!: FormGroup;
  seachForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }
    ngOnInit(): void {
  }
  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      ccfs: ['', Validators.required],
      numMMAA: ['', Validators.required],
      modalidadFun: ['', Validators.required],


      fechaDeceso: ['', Validators.required],
      motivoSalida: ['', Validators.required],
      motivoSalidadesc: ['', Validators.required],
      nombre: ['', Validators.required],
      ci: ['', Validators.required],
      telf: ['', Validators.required],
      email: ['', Validators.required],
      causasDeceso: ['', Validators.required],
      lesionesEncontradas: ['', Validators.required],
      diagnosticoFinal: ['', Validators.required],
      documento: ['', Validators.required],
      nombreGuarda: ['', Validators.required],
      nombreVeterinario: ['', Validators.required],
      nombreDirector: ['', Validators.required],
      precedencia: ['', Validators.required],


      informeForense: ['', Validators.required],
      informeLab: ['', Validators.required],
      otro: ['', Validators.required],





    });

    this.seachForm = this.formBuilder.group({
      selectBox: ['', Validators.required],
      selectedBox: ['', Validators.required],

      codIdentificacion: [''],
      especie: [''],
      nombreComun: [''],
      sexo: [''],
      edad: [''],

    });
    }
  modalidades: string[] = [
    'CAD',
    'CR',
    'BIOP',
    'RT',
    'CI'
  ]

  motivosSalida: string[] = [
    'Entrega gobernacion',
    'Intercambio,',
    'Perdida'

  ]

  selectBoxes: string[] = [
    'Codigo de identificacion',
    'Nombre comun',
    'Especie',
    'Sexo',
    'Edad'
  ]

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  isBoxSearchValid(box: String): Boolean {
    // @ts-ignore
    return this.seachForm.get(box).touched && this.seachForm.get(box).hasError('required');
  }

  onSearch($event: any) {
    if (this.seachForm.valid) {//este es donde busca
      console.log(this.seachForm.value);
    } else {
      this.seachForm.markAllAsTouched();
    }
  }
}