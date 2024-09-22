import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-table',
  templateUrl: './country-table.component.html',
  styles: [`
    img {
      width: 35px;
    }
  `],
})
export class CountryTableComponent {
  @Input({
    required: true,
  })
  public countries: Country[] = [];
  @Input()
  public error: string |null = null;
}
