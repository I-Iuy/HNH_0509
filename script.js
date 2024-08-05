document.addEventListener('DOMContentLoaded', () => {
  const texts = document.querySelectorAll('.text');
  const startContainer = document.getElementById('start-container');
  const scrollContainer = document.getElementById('scroll-container');
  const music = document.getElementById('background-music');
  const neverBtn = document.getElementById('never-btn');
  const okiBtn = document.getElementById('oki-btn');
  const responseOptions = document.getElementById('response-options');
  let currentIndex = 0;
  let autoScrollInterval;

  function scrollToNextText() {
    if (currentIndex < texts.length - 1) {
      texts[currentIndex].classList.remove('visible');
      currentIndex++;
      texts[currentIndex].classList.add('visible');
    } else if (currentIndex === texts.length - 1) {
      responseOptions.style.display = 'flex';
      clearInterval(autoScrollInterval);
      document.removeEventListener('wheel', handleWheelEvent);
    }
  }

  function scrollToPreviousText() {
    texts[currentIndex].classList.remove('visible');
    currentIndex = (currentIndex - 1 + texts.length) % texts.length;
    texts[currentIndex].classList.add('visible');
  }

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(scrollToNextText, 4000);
  }

  function startMusicAndScrolling() {
    music.play();
    startContainer.style.display = 'none';
    scrollContainer.style.display = 'flex';
    autoScrollInterval = setInterval(scrollToNextText, 4000);
  }

  function handleWheelEvent(event) {
    if (currentIndex < texts.length - 1) {
      if (event.deltaY > 0) {
        scrollToNextText();
      } else {
        scrollToPreviousText();
      }
      resetAutoScroll();
    }
  }

  startContainer.addEventListener('click', startMusicAndScrolling);
  document.addEventListener('wheel', handleWheelEvent);

  neverBtn.addEventListener('click', () => {
    neverBtn.style.display = 'none';
  });

  okiBtn.addEventListener('click', () => {
    responseOptions.style.display = 'none';
    
    const gifContainer = document.createElement('div');
    gifContainer.id = 'gif-container';
    gifContainer.innerHTML = `
      <img src="https://i.pinimg.com/originals/a4/44/9c/a4449c10731a0db6476f57c4e85963dc.gif" style="width: 100%; max-width: 600px; border-radius: 10px; margin-top: 20px;">
    `;

    document.getElementById('scroll-container').appendChild(gifContainer);
    
    setTimeout(() => {
      gifContainer.remove();
      currentIndex = 0;
      texts.forEach(text => text.classList.remove('visible'));
      texts[currentIndex].classList.add('visible');
      
      resetAutoScroll();
      document.addEventListener('wheel', handleWheelEvent);
    }, 7000);
  });
});
