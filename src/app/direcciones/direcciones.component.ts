import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestServicesService } from '../servicios/request-services.service';
import { direcciones } from '../Models/direccionesModel';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { compileDirectiveFromMetadata } from '@angular/compiler';
import { ComponentFixture } from '@angular/core/testing';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  direcciones:direcciones[]=[];
  direccion!:direcciones;
  closeResult = '';
  contentGlobal:any;
  idDireccion:number=0;
  page:number = 0;
  search:string='';

  formulario: FormGroup=this.fb.group({ 
    aliasDireccion    :[,[Validators.required]],
    nombrePersona     :[,[Validators.required]],
    telefono          :[,[Validators.required]],
    correo            :[,[Validators.required]],
    pais              :[,[Validators.required]],
    codigoPostal      :[,[Validators.required]],
    ciudad            :[,[Validators.required]],
    estado            :[,[Validators.required]],
    calleNumero       :[,[Validators.required]],
    colonia           :[,[Validators.required]],
    referencia        :[,,]
  })



  constructor(
    private service:RequestServicesService,
    private modalService: NgbModal,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.idDireccion=0;
    this.gets();
  }

  onSearchDireccion(search:string){
    this.search=search;
  }

  exportCSV(){
    var info = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Direcciones',
      useBom: true,
      headers: ["Id","aliasDireccion", "nombrePersona", 
      "telefono","correo",
      "pais","codigoPostal",
      "ciudad","estado",
      "calleNumero","colonia","referencia","Fecha Creacion","Fecha edicion", "Fecha eliminacion"]
    };
   
    new ngxCsv(this.direcciones, "CSV", info);
  }

  open(id:number,content: any) {
    if(id>0){
      this.get(id);
      this.idDireccion=id;
    }else{
      this.idDireccion=0;
      this.formulario.reset();
    }
    this.modalService.open(content,{ size: 'xl' });
	}

  save() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.direccion=this.formulario.value;

    if(this.idDireccion==0)
    this.post();else this.put();
  }

  edit(id:number){
   this.get(id);
  }

  campoEsValido(campo:string){
    return this.formulario.controls[campo].errors 
    && this.formulario.controls[campo].touched;
  }

  gets(){
    this.service.gets().subscribe(r => {
      this.direcciones=[];
      this.direcciones=r;
    });
  }

  get(id:number) {
    this.service.get(id).subscribe(r => {
      this.direccion=r;
      this.setDireccion(this.direccion);
    });
  }

  setDireccion(direcciones:direcciones){
    this.formulario.setValue({
      aliasDireccion    :direcciones.aliasDireccion,
      nombrePersona     :direcciones.nombrePersona,
      telefono          :direcciones.telefono,
      correo            :direcciones.correo,
      pais              :direcciones.pais,
      codigoPostal      :direcciones.codigoPostal,
      ciudad            :direcciones.ciudad,
      estado            :direcciones.estado,
      calleNumero       :direcciones.calleNumero,
      colonia           :direcciones.colonia,
      referencia        :direcciones.referencia,
    });
  }

  post() {
     this.service.post(this.direccion).subscribe(r => {
      this.cleanAndClose();
      this.gets();
    });
  }

  put() {
    this.service.put(this.idDireccion,this.direccion).subscribe(r => {
      this.cleanAndClose();
      this.gets();
    });
  }

  delet() {
    this.service.delete(this.idDireccion).subscribe(r => {
      this.cleanAndClose();
      this.gets();
    });
  }

  cleanAndClose(){
    this.modalService.dismissAll();
    this.formulario.reset();
  }

}
