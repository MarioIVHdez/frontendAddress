import { Pipe, PipeTransform } from '@angular/core';
import { direcciones } from '../Models/direccionesModel';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(direcciones: direcciones[], page:number=0,search:string=''): direcciones[] {
   
    if(search.length===0){
      return direcciones;
    }
    const filterDirecciones= direcciones.filter(res=>
      res.nombrePersona.includes(search) || res.aliasDireccion.includes(search)
      )
    return filterDirecciones;
  }

}
