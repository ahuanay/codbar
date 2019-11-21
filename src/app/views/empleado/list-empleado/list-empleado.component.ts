import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/webservice.service';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {

  public listEmpleados: any;

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.listEmpleadosQuery();
  }

  listEmpleadosQuery() {
    this.webService.getListEmpleado().subscribe(
      response => {
        this.listEmpleados = response;
      },
      error => {
        console.log(error);
      }
    )
  }

}
