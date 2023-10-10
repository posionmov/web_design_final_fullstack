import {Injectable} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable()
export class QuestionAddFormModel {

  constructor(protected fb: FormBuilder) {
  }

  formGroup: FormGroup = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(4)]],
    answers: this.fb.array([this.createAnswerFormGroup()])
  });

  get questionText() {
    return this.getFormGroup('text')
  }

  public getAnswersGroup() {
    return this.formGroup.get('answers') as FormArray;
  }

  public addAnswerFormGroup() {
    const answers = this.formGroup.get('answers') as FormArray;
    answers.push(this.createAnswerFormGroup())
  }

  public deleteAnswerFormGroup(groupNumber: number) {
    const answers = this.formGroup.get('answers') as FormArray;
    if (answers.length > 1) {
      answers.removeAt(groupNumber)
    } else {
      answers.reset()
    }
  }

  private createAnswerFormGroup() {
    return this.fb.group({
      text: ['', [Validators.required, Validators.minLength(4)]],
      correct: [false, Validators.required]
    })
  }

  private getFormGroup(path: string | string[]): FormGroup {
    return this.formGroup.get(path) as FormGroup;
  }
}
