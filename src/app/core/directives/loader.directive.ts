import { Directive, effect, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLoader]',
  standalone: true
})
export class LoaderDirective implements OnDestroy {

  private startText = '';
  private timeoutId: any | null = null;
  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private loaderservice: LoaderService
  ) {

    effect(() => {
      // console.log('Directiva', this.loaderservice.isLoading());

      if(this.loaderservice.isLoading()){
        this.disableButton();
      }else{
        this.enableButton();
      }

    });
  }


  ngAfterViewInit() {
    this.startText = this.getElBtn().textContent || '';
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
  }

  private disableButton(){
    
    this.getElBtn().disabled = true;
    this.getElBtn().textContent = 'Cargando...';
    const elementI = this.renderer2.createElement('i');
    this.renderer2.addClass(elementI, 'fa');
    this.renderer2.addClass(elementI, 'fa-circle-notch');
    this.renderer2.addClass(elementI, 'fa-spin');
    this.renderer2.appendChild(this.el.nativeElement, elementI);
    // Delay disabling the button to allow form validations
    this.timeoutId = setTimeout(() => {
      this.getElBtn().disabled = true;
    }, 200); // Adjust the delay as needed
  }

  private enableButton(){
    this.getElBtn().disabled = false;
    this.getElBtn().textContent = this.startText;
    const spiner = this.getElBtn().querySelector('i');
    if(spiner){
      this.renderer2.removeChild(this.el.nativeElement, spiner);
    }
  }

  private getElBtn():HTMLButtonElement{
    return this.el.nativeElement as HTMLButtonElement;
  }

}
