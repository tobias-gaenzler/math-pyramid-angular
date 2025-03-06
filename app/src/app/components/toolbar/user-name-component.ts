import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'user-name-component',
  templateUrl: 'user-name-component.html',
  styleUrls: ['./user-name-component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule],
})
export class UserNameComponent {
  @Input() name: string = "";
}
