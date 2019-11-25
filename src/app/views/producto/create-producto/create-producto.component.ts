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

  @Input() id;
  @Input() typeButton;
  @Output() reload = new EventEmitter();

  public formProducto: FormGroup;
  public hiddenCreateButton: boolean;
  public hiddenUpdateButton: boolean;
  public validatorFormStatus: boolean;
  public modalReference: NgbModalRef;
  get validatorForm() { return this.formProducto.controls; }

  constructor(private webService: WebService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

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
    this.inicializatorProductoForm();
    this.validatorFormStatus = false;
    if (this.id !== '') {
      this.inicializatorByIdProducto();
    }
  }

  inicializatorProductoForm() {
    this.formProducto = this.formBuilder.group({
      nombre: ['', Validators.required],
      codBar: ['', Validators.required],
      imagenUrl: ['', Validators.required],
      precio: ['0', [Validators.required, Validators.min(0)]],
      cantidad: ['1', [Validators.required, Validators.min(1)]],
    });
  }

  inicializatorByIdProducto() {
    this.webService.getByIdProducto(this.id).subscribe(
      response => {
        this.formProducto.get('nombre').setValue(response.nombre);
        this.formProducto.get('codBar').setValue(response.codBar);
        this.formProducto.get('imagenUrl').setValue(response.imagenUrl);
        this.formProducto.get('precio').setValue(response.precio);
        this.formProducto.get('cantidad').setValue(response.cantidad);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveSubmitForm() {
    this.validatorFormStatus = true;
    if (this.formProducto.invalid) {
        return;
    }

    if (this.id !== '') {
      this.updateForm();
    } else {
      this.saveForm();
    }
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

  updateForm() {
    const producto = {
      nombre: this.formProducto.value.nombre,
      codBar: this.formProducto.value.codBar,
      imagenUrl: this.formProducto.value.imagenUrl,
      precio: this.formProducto.value.precio,
      cantidad: this.formProducto.value.cantidad,
    };

    this.webService.updateProducto(this.id, producto).subscribe(
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
