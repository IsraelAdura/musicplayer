function toggle(id) {
  var musicPlayer = document.getElementById(id);
  
  if(musicPlayer.style.height == '0px')
    musicPlayer.style.height = '80px';
  else
    musicPlayer.style.height = '0px'; 
}

/*function cardmodule(id) {
  var card = document.getElementById(id);

  if(card.style.boxShadow == '0px 0px 0px black')
    card.style.boxShadow = '0px 8px 20px black';
  else
    card.style.boxShadow == '0px 0px 0px black'
}*/