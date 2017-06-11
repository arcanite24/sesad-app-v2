import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProvider } from '../auth/auth';

@Injectable()
export class BackProvider {

  public api: string;

  constructor(public http: Http, public auth: AuthProvider) {
    this.api = this.auth.api;
  }

  // Global

  getAnuncios() {
    return this.http.get(this.api + 'anuncio').map(res => res.json());
  }

  // Alumno -> Reportes

  addReporte(data: any) {
    return this.http.post(this.api + 'reporte', data).map(res => res.json());
  }

  getMyReportes() {
    return this.http.get(this.api + 'reporte/getUserReports/' + this.auth.user.id).map(res => res.json());
  }

  getAllItems() {
    return this.http.get(this.api + 'inventario').map(res => res.json());
  }

  // Alumno -> Horario

  getMyHorario() {
    return this.http.get(this.api + 'clasehorario/getMyHorario/' + this.auth.user.grupo.id).map(res => res.json());
  }

  // Alumno -> Tareas
  getAllTareasAlumno() {
    return this.http.get(this.api + 'tarea/getAllTareasAlumno/' + this.auth.user.id).map(res => res.json());
  }

  // Alumno -> Notas

  getMyNotas() {
    return this.http.get(this.api + 'nota/getUserNotes/' + this.auth.user.id).map(res => res.json());
  }

}
