import {Component} from "@angular/core";

@Component({
  selector: 'quiz-operation-selector',
  template: `
    <div class="operation-nav">
      <h2>Select operation to perform</h2>
      <nav>
        <ul routerLink="list">Get quiz types</ul>
        <ul routerLink="create">Create quiz type</ul>
      </nav>
    </div>
  `,
  styleUrls: ['./quiz-operation-selector.component.css']
})
export class QuizOperationSelectorComponent {

}
