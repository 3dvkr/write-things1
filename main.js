const pic1 = document.querySelector('#pic1');
const pic2 = document.querySelector('#pic2');
const pics = [pic1, pic2];
let i = 0;

document.querySelector('button').addEventListener('click', getFetch);

const textbox = document.querySelector('#myText');
textbox.addEventListener('input', countWords);

if (!localStorage.getItem('writtenThings')) {
  localStorage.setItem('writtenThings', '');
}
else {
  textbox.value = localStorage.getItem('writtenThings');
}

function getFetch(){
    saveText();
    const url = 'https://picsum.photos/v2/list';
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let randomNum = Math.floor(Math.random() * data.length);
  
        pics[i%2].src = data[randomNum].download_url;
        i++;
        pics.forEach(x => x.classList.toggle('hide'));

      })
      .catch(err => {
        throw new Error(`You done goofed: error code: ${err}`);
      });
}

let changeWord = false;

function countWords() {
  if (textbox.value.trim().length !== 0) {
      let wordArr = textbox.value.trim().split(' ').filter(x => x != '');
      if (wordArr.length != 0) {
        if (wordArr.length % 20 == 0) {
            if (!changeWord) {
              getFetch();
              changeWord = true;
            }
        } else {
            changeWord = false;
        }
      document.querySelector('#tellCount').textContent = wordArr.length;
      }
  } else {document.querySelector('#tellCount').textContent = 0}
}

function saveText() {
  localStorage.setItem('writtenThings', textbox.value);
}
