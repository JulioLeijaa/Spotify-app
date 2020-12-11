import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html'
})
export class TarjetasComponent {

  @Input() items: any[] = [];
  id: string;

  constructor(private router: Router) { }

  verArtista( item: any): void{
    if ( item.type === 'album'){
      this.id = item.artists[0].id;

      this.router.navigate(['artista', this.id]);
    } else if ( item.type === 'artist'){
        this.id = item.id;

        this.router.navigate(['artista', this.id]);
    }
  }
}
