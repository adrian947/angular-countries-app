import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public error: string | null = null;
  public loading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.loading = true;
    this.countryService.searchByCapital(term).subscribe({
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
