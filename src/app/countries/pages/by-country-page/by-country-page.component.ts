import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  public error: string | null = null;
  constructor(private countryService: CountriesService) {}

  searchByCountry(term: string): void {
    this.countryService.searchByCountry(term).subscribe({
      next: (countries)=>{
        this.countries = countries;
        this.error = null;
      },
      error: (error) => {
        this.error = error.error.message
      }
    });
  }
}
