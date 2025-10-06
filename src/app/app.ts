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
      left: 'a16.jpg',
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
      left: 'm1.jpeg',
      right: {
        title: '',
        mess: "kya ye tujhe yaad hai kibka hai yaar us din ki baat me kabhi bhool hi nhi sakta kaise bolti us din tu aati our bolti mene bahot kha liya ab mujhe ulti hoga me bolta nimbu pani pile to bolti pani pine tak ka jagah nhi to me bolta nimbu ka ras pi le me fir bolti pet me ras ka bhi jagah nhi tu hil bhi na pa rahi 🤣🤣🤣🤣🤣🤣 me tere jo ek aurat ke bare me batata jo nbahot moti to bolti tujhe to pata hi me moti nhi usse compare band kar 🤣🤣🤣🤣🤣🤣 ",
        page: 'Swap -->',
      },
    },
    {
      left: 'm2.jpeg',
      right: {
        title: '',
        mess: "ye kuch din pahle kka hi baat 🤣🤣 exam tha tera 🤣🤣🤣🤣 our tu padhne gyi thi fir 2 baje ke baad mene mess na kiya soch ke padh rahi hogi wo our ek hi baar sam ko ye mess aaata 😂😂😂",
        page: 'Swap -->',
      },
    },
    {
      left: 'm3.jpeg',
      right: {
        title: '',
        mess: "ye  to khud tune banwaya tha 🤣🤣 isko  to frame banwana chahiye mmujhee 🤣🤣🤣🤣🤣🤣🤣🤣",
        page: 'Swap -->',
      },
    },
    
    {
      left: 'a8.jpg',
      right: {
        title: '',
        mess: 'waise tujhe yaad hai mene tujhe kaha tha ki me tere sath bahot saari cheeze karna chahta hu. mein sirf game craftland khelne ya duo karne ki baat nahi kar raha hu. mein real life mein tere sath dance karna, gaana, pahaado par jana, alag alag type ka khana khana, har festival tere sath celebrate karna, ek sath work karna, our bahot kuch. waise to shadi bhi karrne ka socha par tu manegi tab na 👉👈',
        page: 'swap -->',
      },
    },
    {
      left: '',
      right: {
        title: '',
        mess: 'Yaar our kya  bolu samjh me hi nhi aa raha bolne ko to bahot kuch par samjh nhi a raha kaha se baat karu',
        page: 'last 🤚',
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

  memories = [
    {
      title: 'Your Photos',
      photos: [
        {
          photo: 'a1.jpg',
          title: 'ye tune mujhe apne pichle bday pe bheja tha',
        },
        {
          photo: 'a2.jpg',
          title: 'ye kisi mandir ka hai yaha ka video bhi bheja tha',
        },
        {
          photo: 'a3.jpg',
          title: 'cute to hai ye larki',
        },
        {
          photo: 'a4.jpg',
          title: 'me kya bolu iske bare me',
        },
        {
          photo: 'a5.jpg',
          title: '',
        },
        {
          photo: 'a6.jpg',
          title: '',
        },
        {
          photo: 'a7.jpg',
          title: '',
        },
        {
          photo: 'a8.jpg',
          title: 'ye',
        },
        {
          photo: 'a9.jpg',
          title: '',
        },
        {
          photo: 'a10.jpg',
          title: '',
        },
        {
          photo: 'a11.jpg',
          title: '',
        },
        {
          photo: 'a12.jpg',
          title: '',
        },
        {
          photo: 'a13.jpg',
          title: '',
        },
        {
          photo: 'a14.jpg',
          title: '',
        },
        {
          photo: 'a15.jpg',
          title: '',
        },
        {
          photo: 'a16.jpg',
          title: 'isko 2 saal ki jail ki saja sunai jaye isme khubsoorati ki had par kar di hai',
        },
        {
          photo: 'a17.jpg',
          title: 'yee kitni sundar',
        },
        {
          photo: 'a18.jpg',
          title: '',
        },
      ],
    },
    {
      title: 'waise to humari sath me photo nhi hai par kuch our hai jisse kaam challa sakte',
      photos: [
        {
          photo: 'g1.jpeg',
          title: 'waise ye mene ya soch ke liya',
        },
        {
          photo: 'g2.jpeg',
          title: 'iska dusra photo bhi hai jisme me gussa',
        },
        {
          photo: 'g3.jpeg',
          title: 'utarte hi lobby me jane wali jori',
        },
        {
          photo: 'g4.jpeg',
          title: 'aare ye to yahi hai',
        },
        {
          photo: 'g5.jpeg',
          title: 'apne ko bhi aaise photo leni chahiye',
        },
      ],
    },
    {
      title: 'Gibli Studio ke photos',
      photos: [
        {
          photo: 'f1.webp',
          title: 'ye ktnaa mast hai',
        },
        {
          photo: 'f2.webp',
          title: '',
        },
        {
          photo: 'f3.webp',
          title: 'isko banane me chatgpt ne itna dimag khaya tha sir for deta me  uska',
        },
        {
          photo: 'f4.webp',
          title: '',
        },
      ],
    },
  ];

  currentIndex = 0;

  showMemories = true;

  showTitleHandle = () => {
    if (this.currentIndex >= this.memories.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = this.currentIndex + 1;
    }
    this.showMemories = false;
    console.log(this.currentIndex);
    console.log(this.memories[this.currentIndex]);
  };
  showMemoriesPhoto = () => {
    this.showMemories = true;
    console.log(this.currentIndex);
    console.log(this.memories[this.currentIndex]);
  };

  memoriesSec = false


  closeMemories = () => {
    this.memoriesSec = false;
    this.currentIndex = 0;
  }
  openMemories = () => {
    this.memoriesSec = true;
    this.currentIndex = 0;
  }
}
