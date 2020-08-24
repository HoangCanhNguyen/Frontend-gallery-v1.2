import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../../shared/model/picture.model';
@Pipe({
  name: 'picturefilter',
  pure: false,
})
export class PictureFilterPipe implements PipeTransform {
  transform(pics: Picture[], searchName: string) {
    if (!pics || !searchName) {
      return pics;
    } else {
      return pics.filter(
        (pic) =>
          pic.title.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
      );
    }
  }
}
