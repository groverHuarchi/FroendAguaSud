import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Inicio", route: "home", icon: "home" },
    {name: "Socios", route: "socio", icon: "groups"},
    {name: "Medidores", route: "medidor", icon: "explore"},
    {name: "Lecturaciones", route: "lecturacion", icon: "egg"} ,
    {name: "Reuniones", route: "reunion", icon: "recent_actors"},
    {name: "Control Asistencia", route: "asistencia", icon: "how_to_reg"},
    {name: "Cobros", route: "recibo", icon: "monetization_on"},
    {name: "Tarifas", route: "tarifa", icon: "swap_vertical_circle"},
    {name: "Usuarios", route: "usuario", icon: "supervisor_account"},
    {name: "Reportes", route: "reportes", icon: "assignment"},
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  shouldRun = true;
  
  ngOnInit(): void {
  }

}
