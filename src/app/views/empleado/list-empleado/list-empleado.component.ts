import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/services/webservice.service';
import { interval } from 'rxjs';

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
    const secondsCounter = interval(5000);
    secondsCounter.subscribe(n => {
      this.listEmpleadosQuery();
    });
  }

  listEmpleadosQuery() {
    this.webService.getListEmpleado().subscribe(
      response => {
        this.listEmpleados = response;
        console.log(this.listEmpleados)
      },
      error => {
        console.log(error);
      }
    )
  }

}
