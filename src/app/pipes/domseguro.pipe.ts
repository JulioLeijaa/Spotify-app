import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';


@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ){ }

  transform( id: string): any {

    const url = `https://open.spotify.com/embed/track/${id}`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl( url );
  }

}
