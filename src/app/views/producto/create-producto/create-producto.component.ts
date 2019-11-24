import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebService } from 'src/app/services/webservice.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  @Input() typeButton;
  @Output() reload = new EventEmitter();

  public formProducto: FormGroup;
  public hiddenCreateButton: boolean;
  public hiddenUpdateButton: boolean;
  public validatorFormStatus: boolean;
  public modalReference: NgbModalRef;
  get validatorForm() { return this.formProducto.controls; }

  constructor(private webService: WebService,private formBuilder: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    if (this.typeButton === 'create') {
      this.hiddenCreateButton = false;
    } else {
      this.hiddenCreateButton = true;
    }
    if (this.typeButton === 'update') {
      this.hiddenUpdateButton = false;
    } else {
      this.hiddenUpdateButton = true;
    }
  }

  inicializator() {
    this.inicializatorEmpleadoForm();
    this.validatorFormStatus = false;
  }

  inicializatorEmpleadoForm() {
    this.formProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      codBar: ['', Validators.required],
      imagenUrl: ['', Validators.required],
      precio: ['0', [Validators.required, Validators.min(0)]],
      cantidad: ['1', [Validators.required, Validators.min(1)]],
    });
  }

  saveSubmitForm() {
    this.validatorFormStatus = true;
    if (this.formProducto.invalid) {
        return;
    }
    this.saveForm();
  }

  saveForm() {
    this.webService.postCreateProducto(this.formProducto.value).subscribe(
      response => {
        this.reload.emit();
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
