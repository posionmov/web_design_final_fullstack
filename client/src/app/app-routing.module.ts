import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";
import {ExistingQuizzesComponent} from "./quiz/existing-quizzes/existing-quizzes.component";
import {CreateQuizComponent} from "./quiz/create-quiz/create-quiz.component";
import {QuestionListComponent} from "./question-list/question-list.component";
import {QuestionAddComponent} from "./question-add/question-add.component";

const routes: Routes = [
  {path: "", redirectTo: "quiz", pathMatch: 'full'},
  {path: "questions/:id", component: QuestionListComponent},
  {path: "questions/:id/add", component: QuestionAddComponent},
  {
    path: "quiz",
    component: QuizComponent,
    children: [
      {path: "list", component: ExistingQuizzesComponent},
      {path: "create", component: CreateQuizComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
