import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor( private spotifyservice: SpotifyService) {}

  buscar(termino: string): void{
    this.loading = true;
    this.spotifyservice.getArtistas(termino).subscribe((data: any) => {
      this.artistas = data;
      this.loading = false;
    }, (errorServicio) => {
      this.loading = false;

      Swal.fire({
        icon: 'error',
        title: 'Oops! Ocurrio un error al consumir Spotify.',
        text: errorServicio.error.error.message + '.',
        footer: '<p>Por favor, comuníquese con el administrador.</p>',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    });
  }

}
