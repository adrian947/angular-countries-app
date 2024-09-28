import { Country } from './country.interface';

export interface ICacheStore {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: TermCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}
