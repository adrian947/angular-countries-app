import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, throwError, delay, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { ICacheStore } from '../interfaces/cache.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private URL: string = 'https://restcountries.com/v3.1';
  public cacheStore: ICacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: {
      term: '',
      countries: [],
    },
    byRegion: {
      term: '',
      countries: [],
    },
  };

  constructor(private httpClient: HttpClient) {}

  searchByCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.URL}/alpha/${code}`).pipe(
      map((countries) => (countries.length ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  private getCountry(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError((error) => throwError(() => error)),
      delay(1000)
    );
  }

  searchByCapital(term: string): Observable<Country[]> {
    return this.getCountry(`${this.URL}/capital/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries }))
    );
  }
  searchByRegion(term: string): Observable<Country[]> {
    return this.getCountry(`${this.URL}/region/${term}`).pipe(
      tap((countries) => (this.cacheStore.byRegion = { term, countries }))
    );
  }
  searchByCountry(term: string): Observable<Country[]> {
    return this.getCountry(`${this.URL}/name/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries }))
    );
  }
}
