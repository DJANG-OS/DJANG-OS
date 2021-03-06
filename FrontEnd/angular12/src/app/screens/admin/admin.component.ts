import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Operador } from "../../models/operador/operador.model";
import { OperadorService } from "../../services/operador/operador.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form!: FormGroup;


  root: string = '';
  autorizado: string = '';
  subido: boolean = false;

  operador: Operador = {
    ci: '',
    razon_social: '',
    domicilio: '',
    telefono: '',
    email: '',
    nombre: '',
    root: false,
    autorizado: false,
    apellido: '',
    password: '',
  }

  message = '';

  constructor(
    private operadorService: OperadorService,
    private location:Location,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    console.log(this.location.getState());
  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);
      this.addUser()
    } else {
      this.form.markAllAsTouched();

    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      ci: ['', Validators.required],
      razon_social: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      root: [false, Validators.required],
      autorizado: [false, Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],

    });


  }


  addUser(): void {
    //this.operador.root = this.root == 'si';

    //this.operador.autorizado = this.autorizado == 'si';

    const data = {
      ci: this.form.value.ci,
      razon_social: this.form.value.razon_social,
      domicilio: this.form.value.domicilio,
      telefono: this.form.value.telefono,
      email: this.form.value.email,
      nombre: this.form.value.nombre,
      root: this.form.value.root,
      autorizado: this.form.value.autorizado,
      apellido: this.form.value.apellido,
      password: this.form.value.password
    }

    this.operadorService.create(data).subscribe(response => {
        console.log(response);
        this.subido = true;
      },
      error => {
        console.log(error);
      });
  }

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  btnModificar() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.getOperador(this.form.value.ci)
      const data = {
        ci: this.form.value.ci,
        razon_social: this.form.value.razon_social,
        domicilio: this.form.value.domicilio,
        telefono: this.form.value.telefono,
        email: this.form.value.email,
        nombre: this.form.value.nombre,
        root: this.form.value.root,
        autorizado: this.form.value.autorizado,
        apellido: this.form.value.apellido,
        password: this.form.value.password
      }

      this.message = '';

      this.operadorService.update(data.ci, data).subscribe(response => {
        console.log(response);
        this.message = response.message ? response.message : 'El operador fue actualizado';
        },
        error => {
          console.log(error);
        });
    } else {
      this.form.markAllAsTouched();

    }
  }

  btnBorrar() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.getOperador(this.form.value.ci)
      this.operadorService.delete(this.operador.ci).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

    } else {
      this.form.markAllAsTouched();

    }
  }

  getOperador(ci: string){
    this.operadorService.get(ci)
      .subscribe(
        data => {
          this.operador = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}

