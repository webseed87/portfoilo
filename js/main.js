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

//네비바 관련 부분

  window.addEventListener('scroll', function() {
	let scrollY = window.scrollY;
	var header = document.querySelector('.header');
	let headerheight = header.clientHeight;
	if (scrollY >= headerheight) {
		header.classList.add('scroll');
	  
	}
	else{
		header.classList.remove('scroll');
	}
  });



const menuItems = document.querySelectorAll('li a');
const section = document.querySelectorAll('.section');
const headerHeight = document.querySelector('.header').offsetHeight;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  section.forEach((section) => {
    const sectionId = section.getAttribute('id');
    const sectionTop = section.offsetTop - headerHeight;
    const sectionHeight = section.clientHeight;

    // 스크롤 위치가 섹션 범위 내에 있는지 확인
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight ) {
      // 현재 보이는 섹션과 연결된 네비게이션 항목을 찾기
      const menuItem = document.querySelector(`li a[href="#${sectionId}"]`);
      if (menuItem) {
        menuItem.classList.add('color');
      }
    } else {
      // 스크롤 위치가 섹션 범위 밖에 있는 경우 "color" 클래스를 제거
      const menuItem = document.querySelector(`li a[href="#${sectionId}"]`);
      if (menuItem) {
        menuItem.classList.remove('color');
      }
    }
  });
});


$(function () {
	if (window.innerWidth > 720) {
	gsap.registerPlugin(ScrollTrigger);
  
	let sections = gsap.utils.toArray(".panel");
  	let headerHeight = document.querySelector(".header").offsetHeight + 100;
  
	gsap.to(sections, {
	  xPercent: -100 * (sections.length - 1),
	  ease: "none",
	  scrollTrigger: {
		trigger: ".silder",
		pin: true,
		scrub: 1,
		snap: 1 / (sections.length - 1),
		end: () => "+=" + document.querySelector(".silder").offsetWidth,
			start: "top top+=" + headerHeight + " #portfoilo", // Adjust the target as needed
	  },
	});
	}
});


$(document).ready(function() {


    $(".flip-container").mouseenter(function() {
      $(this).find(".flipper").css("transform", "rotateY(180deg)");
    });

    $(".flip-container").mouseleave(function() {
      $(this).find(".flipper").css("transform", "rotateY(0deg)");
    });
	$(".arrow_next").on("click",function(){
		$(".about_me").addClass("show");
		$(".about_section").addClass("hide");
		$(".about_nav").show();
	});
	$(".arrow_prve").on("click",function(){
		$(".about_me").removeClass("show");
		$(".about_section").removeClass("hide");
		$(".skill_nav").show();

	});
  });