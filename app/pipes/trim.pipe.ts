import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "trimName"
})
export class TrimNamePipe implements PipeTransform {
  transform(name: string): string {
    let split = name.split(" ", 1);
    return split[0];
  }
}
