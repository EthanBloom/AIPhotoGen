import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);

  const response = await fetch('http://localhost:8080/text-to-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  response.ok

  if (response.ok) {
    const { image } = await response.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
  }
  
  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Creating... <span class="spinner">🔧</span>';
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Create';
}