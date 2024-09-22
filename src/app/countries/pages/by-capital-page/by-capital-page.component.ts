import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public error: string | null = null;
  constructor(private countryService: CountriesService) {}

  searchByCapital(term: string): void {
    this.countryService.searchByCapital(term)
    .subscribe({
      next: (countries)=>{
        this.countries = countries;
        this.error = null;
      },
      error: (error) => {
        this.error = error.error.message
      }
    })
  }
}
