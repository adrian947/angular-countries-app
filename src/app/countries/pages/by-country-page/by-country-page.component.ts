import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit{
  public countries: Country[] = [];
  public error: string | null = null;
  public loading: boolean = false;
  public initialValue: string = '';
  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountries.countries;
    this.initialValue = this.countryService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string): void {
    this.loading = true;
    this.countryService.searchByCountry(term).subscribe({
      next: (countries) => {
        this.countries = countries;
        this.error = null;
      },
      error: (error) => {
        this.error = error.error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
