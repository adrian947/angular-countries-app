import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CountriesService } from '../../../countries/services/countries.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  // @ViewChild('txtSearchInput')
  // public text!: ElementRef<HTMLInputElement>;

  private debouncer: Subject<string> = new Subject<string>();

  @Output()
  public value = new EventEmitter<string>();

  @Input({
    required: true,
  })
  placeholder: string = '';
  @Input()
  initialValue: string = '';

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(700)).subscribe({
      next: (value) => {
        this.search(value);
      },
    });
  }
  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  search(text: string) {
    // const text = this.text.nativeElement.value;
    this.value.emit(text);

    if (!text) return;

    // this.text.nativeElement.value = '';
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
