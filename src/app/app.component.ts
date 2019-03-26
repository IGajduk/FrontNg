import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('drawer') drawer: MatSidenav;
  @ViewChild('menuOpen') menuOpen: ElementRef;
  title = 'eShop';
  showFiller = false;
  panelOpenState = false;

constructor(
  private renderer: Renderer2,
) {
  }

  ngOnInit() {
  }
  openCloseMenu(event) {
    this.drawer.toggle();
    if (this.menuOpen.nativeElement.classList.contains('display-none')) {
      this.renderer.removeClass(this.menuOpen.nativeElement, 'display-none');
      this.renderer.addClass(this.menuOpen.nativeElement.nextSibling, 'display-none');
    } else {
      this.renderer.addClass(this.menuOpen.nativeElement, 'display-none');
      this.renderer.removeClass(this.menuOpen.nativeElement.nextSibling, 'display-none');
    }
  }
}
