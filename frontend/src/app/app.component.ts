import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  hideFooter = false;
  constructor(private router: Router) {
    router.events.subscribe(() => {
      const url = router.url;
  
      // Hide footer on pages like: /start/:id or /instructions/:id
      this.hideFooter = url.includes('/start') || url.includes('/instructions');
    });
  }
}
