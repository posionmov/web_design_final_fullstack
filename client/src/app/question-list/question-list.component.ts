import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorDto, Question, QuizService} from "../quiz/quiz.service";
import {Observer, Subscription} from "rxjs";

@Component({
  selector: 'question-list',
  template: `
    <div class="questions-wrapper">
      <ng-container *ngIf="!isLoading && questions.length === 0">
        <div class="no-elements-wrapper">
          <h2>No data for quiz with id: {{quizId}}</h2>
          <button (click)="createQuestion()">Add</button>
        </div>
      </ng-container>

      <ng-container *ngIf="error">
        <h2>{{errorMsg}}</h2>
      </ng-container>

      <ng-container *ngIf="isLoading">
        <h2>loading</h2>
      </ng-container>

      <ng-container *ngIf="!isLoading && questions.length !== 0">
        <h2>Questions for Quiz with ID: {{quizId}}</h2>
        <div class="header-buttons">
          <button (click)="reloadData()">Reload</button>
          <button (click)="createQuestion()">Add</button>
        </div>
        <ng-container *ngFor="let question of questions">
          <table>
            <tr>
              <td class="bold cell-title">Question:</td>
              <td>{{question.text}}</td>
            </tr>
            <tr class="bold cell-title">Answers:</tr>
            <ng-container *ngFor="let answer of question.answers; index as i">
              <tr>
                <td></td>
                <td class="text-column info-table-element">
                  <p>Answer {{i}}:</p> {{answer.text}}
                </td>
                <td class="info-table-element boolean-cell">{{answer.correct}}</td>
              </tr>
            </ng-container>
          </table>
        </ng-container>
      </ng-container>
    </div>
  `,
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnDestroy {

  quizId?: number;
  questions: Question[] = [];
  protected observer: Observer<Question[]>

  isLoading: boolean = false;
  error: boolean = false;
  errorMsg: string;

  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private quizService: QuizService) {

    this.observer = this.quizService.getCommonObserver(
      (res) => {
        this.isLoading = false;
        this.questions = res;
      },
      (error: ErrorDto) => {
        this.isLoading = false;
        this.error = true;
        this.errorMsg = error.message
      },
      () => {}
    );

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.quizId = params["id"];
        this.isLoading = true;
        this.quizService.getQuestionsForQuiz(this.quizId!!).subscribe(this.observer)
      })
    );
  }

  reloadData() {
    this.questions = [];
    this.isLoading = true;
    this.error = false;
    this.errorMsg = "";
    this.subscriptions.add(
      this.quizService.getQuestionsForQuiz(this.quizId!!).subscribe(this.observer)
    )
  }

  createQuestion() {
    this.router.navigate([`questions/${this.quizId}/add`])
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
