import { Pipe , PipeTransform} from "@angular/core";

@Pipe({
    name: 'estadoReunion',
    
})

export class estadoReunionPipe implements PipeTransform{

    transform(value: boolean) : 'En espera' | 'Concluida'{
        return value ? 'En espera' : 'Concluida';
    }

   
}