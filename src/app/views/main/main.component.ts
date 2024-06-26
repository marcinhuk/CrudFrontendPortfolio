import { Component, HostListener } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { MenuComponent } from '../../components/main/menu/menu.component'
import { FooterComponent } from '../../components/main/footer/footer.component'

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [MenuComponent, FooterComponent, RouterOutlet],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})

export class MainComponent {

	logoTop: number = 0
	logoLeft: number = 0

	ngOnInit(): void {
		this.logoTop = window.innerHeight - 210
		this.logoLeft = window.innerWidth - 480
	}

	@HostListener('window:resize' )
	redimensionaTela(): void {
		this.logoTop = window.innerHeight - 210
		this.logoLeft = window.innerWidth - 480
	}
}