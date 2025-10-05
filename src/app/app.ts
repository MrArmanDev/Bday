import { Component, OnInit, signal, WritableSignal } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  message = 'Happy Birthday!';
  name = 'Ayushi';

  displayText: WritableSignal<string> = signal('');
  nameText: WritableSignal<string> = signal('');
  showName: WritableSignal<boolean> = signal(false);
  showBalloons: WritableSignal<boolean> = signal(false);
  showImage: WritableSignal<boolean> = signal(false);

  balloons: WritableSignal<any[]> = signal([]);

  msgIndex = 0;
  nameIndex = 0;

  isNotebookVisible = false;
  isNotebookOpen = false;

  mainImgContenr = ['a1.jpg', 'a2.jpg', 'a3.jpg', 'a4.jpg', 'a5.jpg'];

  mainImage = 'a1.jpg';

  ngOnInit() {
    this.typeMessage();

    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.mainImgContenr.length);
      this.mainImage = this.mainImgContenr[randomIndex];
    }, 2000);
  }

  private typeMessage() {
    const typingSpeed = 150;
    const interval = setInterval(() => {
      if (this.msgIndex < this.message.length) {
        this.displayText.set(this.displayText() + this.message[this.msgIndex]);
        this.msgIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.showName.set(true);
          this.typeName();
        }, 500);
      }
    }, typingSpeed);
  }

  private typeName() {
    const nameSpeed = 160;
    const nInterval = setInterval(() => {
      if (this.nameIndex < this.name.length) {
        this.nameText.set(this.nameText() + this.name[this.nameIndex]);
        this.nameIndex++;
      } else {
        clearInterval(nInterval);
        this.launchBalloons();
        this.showImage.set(true);
      }
    }, nameSpeed);
  }

  private launchBalloons() {
    const arr: { [key: string]: string }[] = [];
    for (let i = 0; i < 30; i++) {
      arr.push(this.getRandomStyles());
    }
    this.balloons.set(arr as any);
    this.showBalloons.set(true);

    setTimeout(() => {
      this.showBalloons.set(false);
      this.balloons.set([]);
    }, 60000);
  }

  private random(num: number) {
    return Math.floor(Math.random() * num);
  }

  private getRandomStyles(): { [key: string]: string } {
    const r = this.random(255);
    const g = this.random(255);
    const b = this.random(255);
    const ml = this.random(window.innerWidth - 100);
    const dur = this.random(5) + 5;

    return {
      'background-color': `rgba(${r},${g},${b},0.7)`,
      color: `rgba(${r},${g},${b},0.7)`,
      left: `${ml}px`,
      'animation-duration': `${dur}s`,
    };
  }

  showLetterValue: WritableSignal<boolean> = signal(false);
  showLetter() {
    this.showLetterValue.set(true);
  }

  pages = [
    {
      left: 'a1.jpg',
      right: {
        title: 'Happiest Birthday',
        mess: 'Happiest Birthday Ayushiiiiiiiii. Keep smiling, keep glowing, and keep being amazing always. Thank you for being in my life... stay the  same way always',
        page: 'Swap -->',
      },
    },
    {
      left: 'a2.jpg',
      right: {
        title: 'Thank You',
        mess: 'Thank you for everything, you are  my best friend.',
        page: 'Swap -->',
      },
    },
    {
      left: 'a3.jpg',
      right: {
        title: 'sorry',
        mess: "I'm sorry I behave badly sometimes. I don't know why it happens. But I never want to hurt you, sorry.",
        page: 'Swap -->',
      },
    },
    {
      left: 'a8.jpg',
      right: {
        title: '',
        mess: "waise tujhe yaad hai mene tujhe kaha tha ki me tere sath bahot saari cheeze karna chahta hu. mein sirf game craftland khelne ya duo karne ki baat nahi kar raha hu. mein real life mein tere sath dance karna, gaana, pahaado par jana, alag alag type ka khana khana, har festival tere sath celebrate karna, ek sath work karna, our bahot kuch. waise to shadi bhi karrne ka socha par tu manegi tab na 👉👈",
        page: "swap -->",
      },
    },
  ];
  currentPage = 0;

  get totalPages() {
    return this.pages.length;
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  showNotebook() {
    this.isNotebookVisible = true;
    setTimeout(() => {
      this.isNotebookOpen = true;
    }, 100);
  }

  hideNotebook() {
    this.isNotebookOpen = false;

    setTimeout(() => {
      this.isNotebookVisible = false;
    }, 1000);
  }
}
