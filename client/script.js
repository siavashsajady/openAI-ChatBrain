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
      element.innerHTML += text.charAt(index);
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

// create handle submit function to get the AI generated response
const handleSubmit = async (e) => {
  e.preventDefault();

  //get the data that type into the form
  const data = new FormData(form);

  // generate user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  // clear textarea
  form.reset();

  //bot's chatstripe

  //generate a unique ID for Its message
  const uniqueId = generateUniquedId();

  chatContainer.innerHTML += chatStripe(true, '', uniqueId);

  // Put the new message in view
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  //turn on the loader
  loader(messageDiv);

  //fetch the data from the server -> get bot's response
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'), // message comming from textarea element
    }),
  });
  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if (response.ok) {
    const data = await response.json(); //give the actual response from the backend
    const parseData = data.bot.trim();

    console.log(parseData);

    typeText(messageDiv, parseData);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = 'Something went wrong';

    alert(err);
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
