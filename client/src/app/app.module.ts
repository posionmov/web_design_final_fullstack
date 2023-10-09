import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavToolbarComponent} from "./root-nav-bar/root-nav-bar.component";
import {ToolbarLinkComponent} from "./root-nav-bar/toolbar-link/toolbar-link.component";
import {QuizComponent} from "./quiz/quiz.component";
import {ExistingQuizzesComponent} from "./quiz/existing-quizzes/existing-quizzes.component";
import {QuizOperationSelectorComponent} from "./quiz/quiz-selector/quiz-operation-selector.component";
import {QuizService} from "./quiz/quiz.service";
import {HttpClientModule} from "@angular/common/http";
import {CreateQuizComponent} from "./quiz/create-quiz/create-quiz.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateQuizFormModel} from "./quiz/create-quiz/create-quiz-form.model";
import {QuestionListComponent} from "./question-list/question-list.component";
import {QuestionAddComponent} from "./question-add/question-add.component";

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    ToolbarLinkComponent,
    QuizComponent,
    ExistingQuizzesComponent,
    QuizOperationSelectorComponent,
    CreateQuizComponent,
    QuestionListComponent,
    QuestionAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    QuizService,
    CreateQuizFormModel,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
