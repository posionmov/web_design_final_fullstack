import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable()
export class CreateQuizFormModel {

  formGroup: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  get type() {
    return this.getFormGroup('type')
  }

  getFormGroup(path: string | string[]): FormGroup {
    return this.formGroup.get(path) as FormGroup;
  }

  get valid() {
    return this.formGroup.valid;
  }
}
