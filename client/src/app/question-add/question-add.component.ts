import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CreationResultDto, ErrorDto, QuizService} from "../quiz/quiz.service";
import {Observer, Subscription} from "rxjs";

@Component({
  selector: 'question-add',
  template: `
    <h2>Add question for {{quizId}}</h2>
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
              private quizService: QuizService) {

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
      () => {}
    );

    this.subscriptions.add(
      this.route.params.subscribe((params) => {
        this.quizId = params["id"];
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
