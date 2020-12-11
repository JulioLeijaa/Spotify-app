import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token = 'Bearer BQAMngMcTVyTiND-8DEFewdcgbelsVO-3qYfCfALhz4mfA-3tZBTzZ6KZdTm9YsS-bw2XoaoKL_keyGHntY';

  constructor( private http: HttpClient) {
  }

  getQuery( query: string): any{
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: this.token
    });

    return this.http.get(url, {headers});
  }

  getNewRealases(): any{
    return this.getQuery('browse/new-releases?limit=9')
              .pipe( map( data => {
                // tslint:disable:no-string-literal
                return data['albums'].items;
    }));
  }

  getArtistas( termino: string ): any{
    return this.getQuery(`search?q=${termino}&type=artist&limit=9`)
              .pipe( map( data => data['artists'].items));
  }

  getArtista( id: string ): any{
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks( id: string ): any{
    return this.getQuery(`artists/${id}/top-tracks?market=es`)
              .pipe( map( data => data['tracks']));
  }
}
