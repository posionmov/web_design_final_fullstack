import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CreationResultDto, ErrorDto, QuizService} from "../quiz/quiz.service";
import {Observer, Subscription} from "rxjs";
import {QuestionAddFormModel} from "./question-add-form.model";

@Component({
  selector: 'question-add',
  template: `

    <ng-container *ngIf="saving">
      <div class="no-elements-wrapper">
        saving
      </div>
    </ng-container>

    <ng-container *ngIf="!saving && error">
      <div class="no-elements-wrapper">
          {{errorMsg}}
      </div>
    </ng-container>

    <ng-container *ngIf="!saving && !error">
      <h2>Add question</h2>
      <div class="add-question-form-wrapper">
        <form [formGroup]="model.formGroup"
              (ngSubmit)="onSubmit()">
          <div class="question-text-wrapper">
            <textarea id="text" type="text" formControlName="text" placeholder="Question text"></textarea>
            <div *ngIf="model.questionText.invalid && (model.questionText.dirty || model.questionText.touched)"
                 class="validation-error">
              <div *ngIf="model.questionText.errors?.['required']" class="error">
                Field is required
              </div>
              <div *ngIf="model.questionText.errors?.['minlength']" class="error">
                Field must be at least 4 characters long
              </div>
            </div>
          </div>
          <div class="buttons-wrapper">
            <button (click)="addAnswer($event)">Add answer</button>
            <button type="submit">Save</button>
          </div>
          <div class="answer" formArrayName="answers">
            <table>
              <thead>
              <tr>
                <th>text</th>
                <th>is correct</th>
              </tr>
              </thead>
              <tbody>
              <ng-container *ngFor="let answer of model.getAnswersGroup().controls; let i = index" [formGroupName]="i">
                <tr>
                  <td>
                    <input id="question-text" type="text" formControlName="text" placeholder="answer text">
                    <div *ngIf="answer.get('text')?.errors && (answer.get('text')?.dirty || answer.get('text')?.touched)" class="validation-error">
                      <div *ngIf="answer.get('text')?.errors?.['required']" class="error">
                        Field is required
                      </div>
                      <div *ngIf="answer.get('text')?.errors?.['minlength']" class="error">
                        Field must be at least 4 characters long
                      </div>
                    </div>
                  </td>
                  <td><input id="question-valid" type="checkbox" formControlName="correct"></td>
                  <td>
                    <button (click)="model.deleteAnswerFormGroup(i)">Delete</button>
                  </td>
                </tr>
              </ng-container>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </ng-container>
  `,
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnDestroy {

  quizId?: number;

  saving: boolean = false;
  error: boolean = false;
  errorMsg: string;

  private subscriptions: Subscription = new Subscription();
  protected observer: Observer<CreationResultDto>

  constructor(private route: ActivatedRoute,
              private router: Router,
              private quizService: QuizService,
              protected model: QuestionAddFormModel) {

    this.observer = quizService.getCommonObserver(
      () => {
        this.saving = false;
        this.error = false;
        this.router.navigate([`/questions/${this.quizId}`])
      },
      (error: ErrorDto) => {
        this.saving = false;
        this.error = true;
        this.errorMsg = error.message
      },
      () => {
      }
    );

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.quizId = params["id"];
      })
    );
  }

  addAnswer(event: Event) {
    event.preventDefault();
    this.model.addAnswerFormGroup();
  }

  onSubmit() {
    if (this.model.formGroup.valid) {
      const res = this.model.formGroup.value
      res.quizId = this.quizId
      this.saving = true;
      this.quizService.createQuestion(res).subscribe(this.observer)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
