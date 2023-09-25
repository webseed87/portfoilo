class TextScramble {
	constructor(el) {
		this.el = el;
		this.chars = ':;<>-_\/[]{}—=+*^?#_';
		this.update = this.update.bind(this);
	}

	setText(newText) {
		const oldText = this.el.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise((resolve) => {
			this.resolve = resolve;
		});

		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
			const start = Math.floor(Math.random() * 40);
			const end = start + Math.floor(Math.random() * 40);
			this.queue.push({ from, to, start, end, char: '' });
		}

		cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	}

	update() {
		let output = '';
		let complete = 0;

		for (let i = 0, n = this.queue.length; i < n; i++) {
			const { from, to, start, end } = this.queue[i];

			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!this.queue[i].char || Math.random() < 0.28) {
					this.queue[i].char = this.randomChar();
				}
				output += `<span class="dud">${this.queue[i].char}</span>`;
			} else {
				output += from;
			}
		}

		this.el.innerHTML = output;

		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}

	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}


const adjective = [ 
	`creative`     , 
	`learning` 
  ];
  
  const job = [ 
	`designer.`     ,
    `publisher.`,
	`developer.` 
  ];
  
  const el = document.querySelector('.adjective');
  const fx = new TextScramble(el);
  
  const el1 = document.querySelector('.job');
  const fx1 = new TextScramble(el1);
  
  // 텍스트 변경 함수
  
  function next(fxInstance, phrasesArray) {
	  let counter = 0;
	  const updateText = () => {
		  fxInstance.setText(phrasesArray[counter]).then(() => {
			  setTimeout(updateText, 5000 );
		  });
		  counter = (counter + 1) % phrasesArray.length;
	  };
	  updateText();
  }
  
  

  next(fx1, job);