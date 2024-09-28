import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit{
  public countries: Country[] = [];
  public error: string | null = null;
  public loading: boolean = false;
  public initialValue: string = '';
  constructor(private countryService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.initialValue = this.countryService.cacheStore.byRegion.term;
  }

  searchByRegion(term: string): void {
    this.loading = true;
    this.countryService.searchByRegion(term).subscribe({
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
