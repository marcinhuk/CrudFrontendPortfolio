import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { CardComponent } from '../../components/login/card/card.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
