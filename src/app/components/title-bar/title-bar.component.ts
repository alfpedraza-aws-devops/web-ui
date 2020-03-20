import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Displays the title bar in the application.
 */
@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html'
})
export class TitleBarComponent {

  /**
   * The name of the environment where the application is running on.
   */
  public environmentName: string = environment.environmentName;
  
}