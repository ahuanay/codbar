import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/webservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listProductos: any;

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.inicilizator();
  }

  inicilizator() {
    this.listProductos = [];
    this.listProductosQuery();
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

}
