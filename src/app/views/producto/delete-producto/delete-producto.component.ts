import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebService } from 'src/app/services/webservice.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-producto',
  templateUrl: './delete-producto.component.html',
  styleUrls: ['./delete-producto.component.css']
})
export class DeleteProductoComponent implements OnInit {

  @Input() id;
  @Output() reload = new EventEmitter();

  public modalReference: NgbModalRef;

  constructor(private webService: WebService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  deleteProducto() {
    this.webService.deleteProducto(this.id).subscribe(
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
    this.modalReference = this.modalService.open(content, {centered: true, backdrop: 'static'});
  }
}
