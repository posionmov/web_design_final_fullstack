import {Component, Input} from "@angular/core";

@Component({
  selector: 'toolbar-link',
  template: `
    <li class="toolbar-link"
        [ngClass]="{'selected-route' : isSelected}"
        routerLink="{{routeLink}}">
      {{title}}
    </li>
  `,
  styleUrls: ['./toolbar-link.component.css']
})
export class ToolbarLinkComponent {

  @Input() title: string = "";
  @Input() routeLink: string = "";
  @Input() isSelected: boolean = false;
}
