import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { PicturesService } from 'src/app/shared/service/pictures.service';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { FilterService } from '../../../shared/service/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  categoriesFetchedFromDatabase: string[] = [];
  categoriesList: string[] = [];
  artistsFetchedFromDatabase: string[] = [];
  artistsList: string[] = [];

  picturesSub: Subscription;

  showMoreCate = false;
  showMoreArtist = false;

  @Input() searchText: string;
  @Output() searchTextChange = new EventEmitter();

  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([100000, 200000000]),
  });

  options: Options = {
    floor: 100000,
    ceil: 200000000,
    step: 200000,
    animate: false,
    translate: (value: number): string => {
      return '$' + Math.ceil(value / 1000) + 'k';
    },
  };

  constructor(
    private pictureService: PicturesService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.picturesSub = this.pictureService.getData().subscribe((pictures) => {
      for (const picture of pictures) {
        this.categoriesFetchedFromDatabase.push(picture.category);
        this.artistsFetchedFromDatabase.push(picture.artist);
      }
      this.categoriesList = this.categoriesFetchedFromDatabase.filter(
        (item, index) => {
          return this.categoriesFetchedFromDatabase.indexOf(item) === index;
        }
      );
      this.artistsList = this.artistsFetchedFromDatabase.filter(
        (item, index) => {
          return this.artistsFetchedFromDatabase.indexOf(item) === index;
        }
      );
    });
  }

  change() {
    this.searchTextChange.emit({ value: this.searchText });
  }

  onSearchByPrice(): void {
    const minPrice = this.sliderForm.value.sliderControl[0];
    const maxPrice = this.sliderForm.value.sliderControl[1];
    this.filterService.search({ minPrice, maxPrice });
  }

  onShowMoreCate(): void {
    this.showMoreCate = !this.showMoreCate;
  }

  onShowMoreArtist(): void {
    this.showMoreArtist = !this.showMoreArtist;
  }
  ngOnDestroy(): void {
    this.picturesSub.unsubscribe();
  }
}
