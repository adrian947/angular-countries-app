import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private URL: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  searchByCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.URL}/alpha/${code}`).pipe(
      map((countries) => (countries.length ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }
  searchByCapital(term: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.URL}/capital/${term}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
  searchByRegion(term: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.URL}/region/${term}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
  searchByCountry(term: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.URL}/name/${term}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
