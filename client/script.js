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

// generate a unique ID for every single message
function generateUniquedId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexsadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexsadecimalString}`;
}

//Implement chat stripe
function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && 'ai'}">
      <div class = "chat">
      <div class = "profile">
        <img 
          src="${isAi ? bot : user}"
          alt = "${isAi ? 'bot' : 'user'}"
        />
      </div>
      <div class= "message" id=${uniqueId}>${value} </div>
      </div>
    </div>
    `;
}
