import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoUsuario'
})
export class EstadoUsuarioPipe implements PipeTransform {

  transform(value : boolean) : 'Activo' | 'Inactivo' {
    return value ? 'Activo' : 'Inactivo';
  }

}
