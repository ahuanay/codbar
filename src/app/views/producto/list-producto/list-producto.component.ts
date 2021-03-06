import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/webservice.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-list-producto',
  templateUrl: './list-producto.component.html',
  styleUrls: ['./list-producto.component.css']
})
export class ListProductoComponent implements OnInit {

  public listProductos: any;
  public filterProducto: any;

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.inicilizator();
  }

  inicilizator() {
    this.listProductos = [];
    this.filterProducto = '';
    this.listProductosQuery();
    const secondsCounter = interval(7000);
    secondsCounter.subscribe(n => {
      this.listProductosQuery();
    });
  }

  listProductosQuery() {
    this.webService.getListProducto().subscribe(
      response => {
        this.listProductos = response;
      },
      error => {
        console.log(error);
      }
    )
  }

  reload() {
    this.inicilizator();
  }

}
