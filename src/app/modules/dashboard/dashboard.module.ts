import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SocioModule } from '../socio/socio.module';
import { MedidorModule } from '../medidor/medidor.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { LecturacionModule } from '../lecturacion/lecturacion.module';
import { ReunionModule } from '../reunion/reunion.module';
import { AsistenciaModule } from '../asistencia/asistencia.module';
import { TarifaModule } from '../tarifa/tarifa.module';
import { ReciboModule } from '../recibo/recibo.module';
import { ReportesModule } from '../reportes/reportes.module';





@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    SocioModule,
    MedidorModule,
    UsuarioModule,
    LecturacionModule,
    ReunionModule,
    AsistenciaModule,
    TarifaModule,
    ReciboModule,
    ReportesModule
  ]
})
export class DashboardModule { }
