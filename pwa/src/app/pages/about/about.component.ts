import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="container">
        <h2>About this app</h2>
        <p style="font-size:25px">
            This webapp divided in two parts:<br><br>
            <strong>The Home</strong> for clients with the menu.<br>
            <strong>Backoffice area</strong> where the adminstrator can login and manage the available products

            <br><br>
            This project is a test for a job position. 
        </p>

        <hr>

        <h2>About the Author</h2>
        <iframe width="100%" height="700px" src="https://www.vitorpiovezam.dev/">
        </iframe>
    </div>
  `,
})
export class AboutComponent {
}
