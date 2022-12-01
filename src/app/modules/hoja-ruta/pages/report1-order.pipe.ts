import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'report1Order'
})
export class Report1OrderPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
   return value.sort((a: { total: number; },b: { total: number; })=>{
      let x = a.total;
      let y = b.total;
      if(x>y){
        return -1;
      }else{
        return 1;   
      }
      return 0;
    })
  }

}
