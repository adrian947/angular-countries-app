import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public error: string | null = null;
  constructor(private countryService: CountriesService) {}

  searchByRegion(term: string): void {
    this.countryService.searchByRegion(term).subscribe({
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
