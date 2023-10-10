import {Component} from "@angular/core";
import {ExistedQuizzes, QuizService} from "../quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'existing-quizzes',
  template: `
    <div class="existing-quizzes">
      <ng-container *ngIf="isLoaded">
        <button class="get-quizzes-btn" (click)="getExistingQuizzes()">reload</button>
        <table>
          <thead>
            <th>Id</th>
            <th>Name</th>
          </thead>
          <tbody *ngFor="let quiz of existedQuizzes">
          <tr>
            <td class="id">{{quiz.id}}</td>
            <td>{{quiz.name}}</td>
            <td class="btn-cell">
              <button class="btn" (click)="routeTuQuiz(quiz.id)">view</button>
            </td>
          </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `,
  styleUrls: ['./existing-quizzes.component.css']
})
export class ExistingQuizzesComponent {

  isLoaded: boolean = false;
  existedQuizzes: ExistedQuizzes[] = []

  constructor(private quizService: QuizService,
              private router: Router) {
    this.getExistingQuizzes();
  }

  protected getExistingQuizzes() {
    this.isLoaded = false;
    this.quizService.getExistingQuizzes()
      .subscribe(quizzes => {
        this.existedQuizzes = quizzes;
        this.isLoaded = true;
      });
  }

  protected routeTuQuiz(quizId: number) {
    this.router.navigate([`questions/${quizId}`])
  }
}
