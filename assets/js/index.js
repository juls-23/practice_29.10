'use strict'

const cardsContainer = document.getElementById('cardsContainer')

const HTMLElements = actors.map((actor) => createActorCards(actor))

function createActorCards(actor){
  const card = document.createElement('li');
  card.classList.add('cardWrapper');

  const container = document.createElement('article');
  container.classList.add('cardContainer');

  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('cardImageWrapper');
  
  const initials = document.createElement('div');
  initials.classList.add('initials');
  initials.append(document.createTextNode(createInitials(actor.name) ||'noname'));
  initials.style.backgroundColor = stringToColor(actor.name || '')

  const img = document.createElement('img');
  img.classList.add('cardImage');
  img.setAttribute('src', actor.photo);
  img.setAttribute('alt', actor.name);
  img.addEventListener('error', handleImageError);

  imgWrapper.append(initials,img)

  const name = document.createElement('h2');
  name.classList.add('cardName');
  name.append(document.createTextNode(actor.name || 'noname'));
  
  const description = document.createElement('p');
  description.classList.add('cardDescription');
  description.append(document.createTextNode(actor.birthdate || 'unknown'));
  
  container.append(imgWrapper, name, description);
  card.append(container);

  return card;
}

cardsContainer.append(...HTMLElements)

function handleImageError({target}){
    target.remove();
}


function stringToColor (str) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

function createInitials(str){
  const [name,sname] = str.trim().toUpperCase().split(' ');
  return name[0] + sname[0]
}