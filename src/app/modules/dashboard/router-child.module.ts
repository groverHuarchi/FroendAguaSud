import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SocioComponent } from '../socio/components/socio/socio.component';
import { MedidorComponent } from '../medidor/medidor/medidor.component';
import { UsuarioComponent } from '../usuario/components/usuario/usuario.component';
import { LecturacionComponent } from '../lecturacion/components/lecturacion/lecturacion.component';
import { ReunionComponent } from '../reunion/components/reunion/reunion.component';
import { AsistenciaComponent } from '../asistencia/components/asistencia/asistencia.component';
import { TarifaComponent } from '../tarifa/components/tarifa/tarifa.component';
import { NewAsistenciaComponent } from '../asistencia/components/new-asistencia/new-asistencia.component';
import { ReciboComponent } from '../recibo/components/recibo/recibo.component';
import { ReportesComponent } from '../reportes/components/reportes/reportes.component';



const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'socio', component: SocioComponent },
    { path: 'medidor', component:  MedidorComponent},
    { path: 'usuario', component: UsuarioComponent},
    { path: 'lecturacion', component: LecturacionComponent},
    { path: 'reunion', component: ReunionComponent },
    { path: 'asistencia', component: AsistenciaComponent},
    { path: 'tarifa', component: TarifaComponent},
    { path: 'tomaAsistencia', component : NewAsistenciaComponent},
    { path: 'recibo',  component : ReciboComponent},
    { path: 'reportes', component : ReportesComponent }
   
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
