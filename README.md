# Frontend Mentor - Dictionary web app

![Design preview for the Dictionary web app coding challenge](./preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for words using the input field
- See the Free Dictionary API's response for the searched word
- See a form validation message when trying to submit a blank form
- Play the audio file for a word when it's available
- Switch between serif, sans serif, and monospace fonts
- Switch between light and dark themes
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Have the correct color scheme chosen for them based on their computer preferences. _Hint_: Research `prefers-color-scheme` in CSS.

### Links

- [Visit live site](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- [Angular](https://angular.io/) - Component-based Typescript framework
- [Sass](https://sass-lang.com/) - CSS pre-processor

### What I learned

Because of the nature of this app, I soon came across the need to have live UI updated, so I learned how to define observers and subscribe to them:

Observable definition:

```ts
@Component({
  selector: "app-font-menu",
  templateUrl: "./font-menu.component.html",
  styleUrls: ["./font-menu.component.scss"],
})
export class FontMenuComponent implements OnInit {
  showMenu$ = new BehaviorSubject(false);

  openMenu() {
    this.showMenu$.next(true);
  }

  hideMenu() {
    this.showMenu$.next(false);
  }
}
```

And to read its value changes:

```html
<button
  (click)="openMenu()"
  appClickOutside
  (clickOutside)="hideMenu()"
></button>
<div class="overlay">
  <menu class="menu" [ngClass]="{ 'scale-in-menu': showMenu$ | async }">
    ...
  </menu>
</div>
```

### Useful resources

- [Angular Basics: Tips for Structuring Your Angular Project](https://www.telerik.com/blogs/angular-basics-tips-structuring-angular-project) - As this was my first project built on Angular, this article helped me how to better start off the development process.
- [RxJs Error Handling: Complete Practical Guide](https://blog.angular-university.io/rxjs-error-handling) - This article was useful to help me learn how to handle erros the Angular way.
- [Intro to testing](https://angular.io/guide/testing) - This guide helped me throughout the project on how to test different parts of the application.

## Author

- Website - [Portfolio](https://juanhamilton.vercel.app)
- Frontend Mentor - [@hamilton-i7](https://www.frontendmentor.io/profile/hamilton-i7)
- Twitter - [@hamilton_i7](https://www.twitter.com/hamilton_i7)
- LinkedIn - [Juan Hamilton](https://www.linkedin.com/in/juan-hamilton-edwards/)
