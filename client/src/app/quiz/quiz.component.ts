import { Component } from '@angular/core';

@Component({
  selector: 'quiz',
  template: `
    <div class="quiz-panel">
      <quiz-operation-selector></quiz-operation-selector>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

}
