import {Component} from "@angular/core";
import {CreateQuizFormModel} from "./create-quiz-form.model";
import {ErrorDto, QuizService} from "../quiz.service";
import {Router} from "@angular/router";
import {Observer} from "rxjs";

@Component({
  selector: 'create-quiz',
  template: `
    <div class="create-quiz">
      <h2>Create quiz</h2>
      <form [formGroup]="model.formGroup"
            (ngSubmit)="onSubmit()"
            [ngClass]="{'disabled': isLoading}">
        <input id="type" type="text" formControlName="type" placeholder="New quiz name">
        <div *ngIf="model.type.invalid && (model.type.dirty || model.type.touched)" class="validation-error">
          <div *ngIf="model.type.errors?.['required']" class="error">
            field is required
          </div>
          <div *ngIf="model.type.errors?.['minlength']" class="error">
            field must be at least 4 characters long
          </div>
        </div>
        <button type="submit" [disabled]="!model.valid" class="submit-btn">Submit</button>
      </form>
      <div *ngIf="error">
        <p>{{errorMessage}}</p>
      </div>
    </div>
  `,
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {

  protected isLoading: boolean = false;
  protected error: boolean = false;
  protected errorMessage: string = '';
  protected observer: Observer<void>;

  constructor(protected model: CreateQuizFormModel,
              private quizService: QuizService,
              private router: Router) {

    this.observer = quizService.getCommonObserver<void>(
      () => {
        this.isLoading = false;
        this.model.formGroup.reset();
        this.router.navigate(["/quiz/list"]).then(r => r);
      },
      (error: ErrorDto) => {
        this.isLoading = false;
        this.error = true;
        this.errorMessage = error.message;
      },
      () => this.model.formGroup.reset()
    )
  }

  onSubmit() {
    this.isLoading = true;
    this.error = false;
    this.quizService.createQuiz(this.model.formGroup.value)
      .subscribe(this.observer)
  }
}
