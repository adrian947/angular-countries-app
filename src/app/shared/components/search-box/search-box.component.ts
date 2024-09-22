import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  // @ViewChild('txtSearchInput')
  // public text!: ElementRef<HTMLInputElement>;

  @Output()
  public value = new EventEmitter<string>();

  @Input({
    required: true,
  })
  placeholder: string = '';

  search(text: string) {
    // const text = this.text.nativeElement.value;
    this.value.emit(text);

    if (!text) return;

    // this.text.nativeElement.value = '';
  }
}
