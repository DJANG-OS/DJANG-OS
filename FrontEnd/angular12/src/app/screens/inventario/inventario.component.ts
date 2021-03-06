import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Archivo} from "../../models/archivo/archivo.model";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";
import {ArchivoService} from "../../services/archivo/archivo.service";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {AnimalService} from "../../services/animal/animal.service";
import {TaxonomiaService} from "../../services/taxonomia/taxonomia.service";
import {Animal} from "../../models/animal/animal.model";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  datosBar=[]
  animals: Animal[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['2016', '2017', '2018', '2019', '2020', '2021'];//aqui poner la lista de las opciones
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    //{ data: this.datosBar, label: 'animal' },//aqui poner los valores
    { data: [5, 6, 7, 8, 9, 10], label: 'animal' },//se pone uno igual si quieres de doble bar por cada opcion y asi


  ];

  form!: FormGroup;
  seachForm!: FormGroup;
  showFieldsText: Boolean = false;

  file: Archivo = {
    ruta: '',
    peso: '',
    nombre: '',
    creado: '',
    tipo: '',
    file: '',
  };

  showMamifero =false
  showAve =false
  showReptil =false
  showPez =false

  myVar: string | undefined = "https://images.unsplash.com/photo-1637354563042-9a1d26500ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNzk4NjMyMw&ixlib=rb-1.2.1&q=80&w=1080";
  fotoDefecto: String = "https://images.unsplash.com/photo-1637354563042-9a1d26500ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNzk4NjMyMw&ixlib=rb-1.2.1&q=80&w=1080";
  mamifero: string = "https://cronicagto.com/wp-content/uploads/2019/08/oso.png"
  ave: string = "data:image/jpeg;base64,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"
  reptil: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyPbG2v4MEONEQEw381CuGkEM5gxZ3QgTNw&usqp=CAU"
  pez: string = "data:image/jpeg;base64,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"
  animalTipo: String = "Tigre"

  constructor(private formBuilder: FormBuilder,
              private taxonomiaService: TaxonomiaService,
  ) {
    this.buildForm();

  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.seachForm = this.formBuilder.group({
      selectBox: ['', Validators.required],
      selectedBox: ['', Validators.required],


    });
  }

  animales: string[] = [
    'Felino',
    'Canino',

  ]

  selectBoxes: string[] = [
    'Mamifero',
    'Ave',
    'Reptil',
    'Pez'


  ]

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.seachForm.get(box).touched && this.seachForm.get(box).hasError('required');
  }

  showComboBox() {
    if (this.showFieldsText == true) {
      return {'display': 'none'};
    } else {
      return {'display': ''};
    }
  }

  showSelectedBox() {
    if (this.getFormSearchValue("selectBox") == '') {
      return {'display': 'none'};

    } else if (this.getFormSearchValue("selectBox") != '' && this.showFieldsText == true) {
      return {'display': 'none'};

    } else {


      return {'display': ''};
    }

  }

  getFormSearchValue(value: String) {



    // @ts-ignore
    return this.seachForm.get(value)?.value
  }

  isBoxSearchValid(box: String): Boolean {
    // @ts-ignore
    return this.seachForm.get(box).touched && this.seachForm.get(box).hasError('required');
  }

  onSearch(event: Event) {
    if (this.seachForm.valid) {
      console.log(this.seachForm.value);
      this.taxonomiaService.findBy("subespecie", this.seachForm.value.selectBox)
        .subscribe(
          data => {
            this.animals = data

            let uno: number = 0;
            let dos: number = 0;
            let tres: number = 0;
            let cuatro: number = 0;
            let cinco: number = 0;
            let seis: number = 0;

            for(let i of this.animals){

              // @ts-ignore
              if (+(i.fecha_recepcion?.substr(0,4)) == 2016){
                uno = uno + 1;
              }else { // @ts-ignore
                if (+(i.fecha_recepcion?.substr(0,4)) == 2017){
                                dos = dos + 1;
                              }else { // @ts-ignore
                  if (+(i.fecha_recepcion?.substr(0,4)) == 2018){
                                                  tres = tres + 1;
                                                }else { // @ts-ignore
                    if (+(i.fecha_recepcion?.substr(0,4)) == 2019){
                                                                      cuatro = cuatro + 1;
                                                                    }else { // @ts-ignore
                      if (+(i.fecha_recepcion?.substr(0,4)) == 2020){
                                                                                            cinco = cinco + 1;
                                                                                          }else { // @ts-ignore
                        if (+(i.fecha_recepcion?.substr(0,4)) == 2021){
                                                                                                                    seis = seis + 1;
                                                                                                                  }
                      }
                    }
                  }
                }
              }
            }

            this.barChartData = [
              //{ data: this.datosBar, label: 'animal' },//aqui poner los valores
              { data: [uno, dos, tres, cuatro, cinco, seis], label: 'animal' },//se pone uno igual si quieres de doble bar por cada opcion y asi
            ];

            console.log(data);},
          error => {
            console.log(error)
          })
    } else {
      // @ts-ignore
      // this.barChartData= [
      //   { data: [100, 67, 70, 75, 80, 90], label: 'animal' },//aqui poner los valores
      //   //{ data: [200, 67, 70, 75, 80, 90], label: 'animal' },//se pone uno igual si quieres de doble bar por cada opcion y asi]
//todo asi puedes volver a asignarle



        this.seachForm.markAllAsTouched();
    }
  }



  setImage() {
   if (this.seachForm.value.selectBox == "Mamifero"){
     this.fotoDefecto =this.mamifero
   }else if (this.seachForm.value.selectBox == "Ave"){
     this.fotoDefecto =this.ave

   } else if (this.seachForm.value.selectBox == "Reptil"){
     this.fotoDefecto =this.reptil

   }else{
     this.fotoDefecto =this.pez

   }
  }
}
