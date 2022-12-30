import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent += '.';

    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

//Implement typing functionality
function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    //if user typing
    if (index < text.length) {
      //get the character under specific index in the text that AI return
      element.innerHTML += text.chartAt(index);
      index++;
    } else {
      // if we reached the end of the text
      clearInterval(interval);
    }
  }, 20);
}
