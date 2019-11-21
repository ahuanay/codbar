import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebService } from 'src/app/services/webservice.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  public formEmpleado: FormGroup;
  public validatorFormStatus: boolean;
  public modalReference: NgbModalRef;

  get validatorForm() { return this.formEmpleado.controls; }

  constructor(private webService: WebService,private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
  }

  inicializator() {
    this.validatorFormStatus = false;
    this.inicializatorEmpleadoForm();
  }

  inicializatorEmpleadoForm() {
    this.formEmpleado = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombres: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      userName: ['', Validators.required],
      userPass: ['', Validators.required],
      area: ['', Validators.required],
    });
  }

  saveSubmitForm() {
    this.validatorFormStatus = true;
    if (this.formEmpleado.invalid) {
        return;
    }
    this.saveForm();
  }

  saveForm() {
    this.webService.postCreateEmpleado(this.formEmpleado.value).subscribe(
      response => {
        this.modalReference.close();
      },
      error => {
        console.log(error);
      }
    );
  }

  openModal(content) {
    this.inicializator();
    this.modalReference = this.modalService.open(content, {size: 'lg', centered: true, backdrop: 'static'});
  }

}
