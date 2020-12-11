import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  mensajeError: string;

  constructor( private spotifyservice: SpotifyService) {
    this.loading = true;

    this.spotifyservice.getNewRealases().subscribe( data => {
      this.nuevasCanciones = data;
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
