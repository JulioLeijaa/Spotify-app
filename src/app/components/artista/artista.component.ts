import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private activatedroute: ActivatedRoute,
              private spotifyservice: SpotifyService) {
    this.activatedroute.params.subscribe( params => {
        this.getArtista(params.id);
        this.getTopTracks(params.id);
    });
  }

  getArtista( id: string ): any{
    this.loading = true;
    this.spotifyservice.getArtista(id).subscribe( artista => {
      this.artista = artista;
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

  getTopTracks( id: string): any {
    this.spotifyservice.getTopTracks(id).subscribe( topTracks => {
      this.topTracks = topTracks;
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
