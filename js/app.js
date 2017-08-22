(function(){
            'use strict'

        var prevBtn =document.getElementById('prev');
        var nextBtn =document.getElementById('next');
       
          //using fetch api
        /*      

                    var endPoint = 'http://gplayer.herokuapp.com/api/playlist/top-10';
                      fetch(endPoint,{mode:'no-cors'}).then(function(blob){
                        return blob.json()
                        }).then(function(data){
                          return (songs = data);
                           })
            */
             
               // using xmlhttp request
               /* var songs=[];
                var xhr = new XMLHttpRequest();
                var url = 'http://gplayer.herokuapp.com/api/playlist/top-10';
                var songs;
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                      
                        //console.log(JSON.parse(xhr.responseText));
                    songs=(JSON.parse(xhr.responseText));
                    }
                  
                };
                xhr.open("GET", url, true);
                xhr.send();  */
    
              
         

        var Player = function(playlist) {
          this.playlist = playlist;
          this.index = 0;
          
          playlist.forEach(function(song){
            var trackDiv =document.createElement('div');
            trackDiv.setAttribute('id','trackList');
           
              trackDiv.textContent=(playlist.indexOf(song) + 1 ) + '.  ' + song.title;
           
            
            trackDiv.onclick=function(){

              player.skipTo(playlist.indexOf(song))

            }
            list.appendChild(trackDiv);
          })
        };

        Player.prototype = {
          
          //play a song in the playlits
          play: function(index) {

            //local variables
            var btn=document.getElementById('btn');
            var artist =document.getElementById('artist');
            var songTitle=document.getElementById('song');
            var number =document.getElementById('number');
            var album =document.getElementById('album');
            var musicPlayer=document.getElementById('music-player');
            var play = document.getElementById('play');
            var musicIcon = document.getElementById('music');
            var pause =document.getElementById('pause');
            var card =document.getElementById('card');
            var duration =document.getElementById('duration');
            var list=document.getElementById('list');

           
        
            var self = this;
            var music;
            index = typeof index === 'number' ? index : self.index;
            var track = self.playlist[index];
            
           

            //if current track loaded,play. else load a new howl(object) . 
            if (track.howl) {
              music = track.howl;
            } else {
            music = track.howl = new Howl({
            
                src: [ track.url ],
                html5: true, 
              
                //on track playing
               onplay: function() {
                   
                    musicPlayer.style.opacity='1';
                    //musicPlayer.style.display='block';
                    btn.style.display ='none';
                    //for timer and Songslider to update
                    setInterval(self.timer.bind(self),1000/60)
                    duration.style.display='block';
                    duration.innerHTML = self.formatTime(Math.round(music.duration()));
                    play.style.opacity=0;
                    pause.style.opacity=1;
                    play.style.zIndex=0;
                    pause.style.zIndex=1;
                    musicIcon.className = 'fa fa-volume-up fa-5x animated fadeOut infinite';
                    number.textContent = index+ 1 + '.'
                    artist.textContent =  songs.tracks[index].artist.name;
                    songTitle.textContent = songs.tracks[index].title;
                    album.textContent=songs.tracks[index].album.title;
                    musicIcon.textContent='';
                    repeat.className='fa fa-repeat fa-3x';


                    //background image is set to dynamically change to that in json file.
                    var thumbnail=songs.tracks[index].album.thumbnail
                    var backgroundImage = "url(" + thumbnail + ")";
                    card.style.backgroundImage =backgroundImage;
                    //songs list hides upon play
                    list.style.display='none';
                    document.querySelector('.meta').style.display='block';
                    document.querySelectorAll('.h')[0].style.display='block';


                    //song slider appears after 200 millliseconds
                    setTimeout(function(){
                      songSlider.style.display='block'},200);
                    //do certain things if certain keys are pressed
                    document.onkeypress=function(k){
                      if (k.keyCode==32 || k.code=='space'){
                         music.pause()
                      }
                     else if(k.keyCode==115){
                        music.stop();
                      }
                      else if(k.keyCode==13){
                        player.skip('next');
                      }
                    }
                },


                //on pausing track
                onpause:function(){
                    play.style.opacity=1;
                    pause.style.zIndex=0;
                    play.style.zIndex=1;
                    pause.style.opacity=0;
                   // play.style.display='block';
                   // pause.style.display='none';
                    musicIcon.className = 'fa fa-music fa-5x animated pulse';
                    musicIcon.textContent='';
                    document.onkeypress=function(k){
                      if (k.keyCode==32 || k.code=='space'){
                         music.play()
                      }
                     else if(k.keyCode==115){
                        music.stop();
                      }
                      else if(k.keyCode==13){
                        player.skip('next');
                      }
                     
                    }
                },
                //on music stopping
               onstop:function(){
                 
                  musicIcon.className='fa fa-music fa-5x fav';
                  number.textContent='';
                    play.style.opacity=1;
                    pause.style.opacity=0;
                 
                  
                  pause.style.zIndex=0;
                  play.style.zIndex=1;

                },
                //when music finish playing, wait 2 seconds then play next track
                onend:function(){
                  setTimeout(function(){
                   self.skip('next');

                 },  2000
                    );
                },
                //if track not loaded for any reason.(absent,corrupted,wronglink)

                onloaderror:function(){
                 musicIcon.className = '';
                 musicIcon.innerHTML='<i style=" font:italic bold 30px Georgia, serif;"> loading...</i>';
                 number.textContent='';
                 artist.textContent =  '';
                 songTitle.textContent = '';
                 album.textContent='';
                  
                  //skip track after 4 seconds.

                 setTimeout(function(){
                   self.skip('next');

                 },  4000
                    );
                 }

              });
            }
                // play music
                music.play();

               
                // Keep track of the index we are currently playing.
                self.index = index;
              },

              //pause track if playing
              
              pause:function(){
                var self =this;

                var music=self.playlist[self.index].howl;
                music.pause();
              },
              //play next or prev track
              skip: function(direction) {
               
                var self = this;

                // Get the next or prev track based on the direction of the track.
                var index = 0;
                if (direction === 'prev') {
                  index = self.index - 1;
                  if (index < 0) {
                    index = self.playlist.length - 1;
                  }
                } else {
                  index = self.index + 1;
                  if (index >= self.playlist.length) {
                    index = 0;
                  }
                }

                
                self.skipTo(index);
              },
              skipTo:function(index){
                var self=this;
                var music =self.playlist[self.index].howl;
              if (music) {
                music.stop();
               }

                // Play the new track.
                self.play(index);
              },

             //repeat track playing
              repeat :function(index){
                var self =this;

                var repeat =document.getElementById('repeat');
                var music = self.playlist[self.index].howl;
               setTimeout(function(){
                music.stop();
                self.play(index);
              }, music.duration()*990)
               repeat.className='fa fa-repeat fa-3x text-danger';
                 
              },
              //display length of time music has played
              timer: function() {
                  var songSlider =document.getElementById('songSlider');
                  var timeDisplay =document.getElementById('timer'); 
                  var self = this;
                  var music = self.playlist[self.index].howl;
     
                  var seek = music.seek();
                  timeDisplay.innerHTML = self.formatTime(Math.round(seek));
                  songSlider.value = (((seek / music.duration()) * 100) || 0);
          

                },
                 seek: function(per) {
                    var self = this;

                    // Get the Howl we want to manipulate.
                    var music = self.playlist[self.index].howl;

                    // Convert the percent into a seek position.
                    if (music.playing()) {
                      music.seek(music.duration() * per);
                    }
                  },
               
              formatTime:function(secs){
                var minutes = Math.floor(secs / 60) || 0;
                var seconds = (secs - minutes * 60) || 0;
                if (seconds <10 ){
                  seconds = '0'+seconds;
                }
                return minutes + ':' + seconds;
               },

              toggle:function(){
                 var listToggle=document.getElementById('listToggle');
                

                btn.style.display ='none';

              
                var display = (list.style.display === 'block') ? 'none' : 'block';

                setTimeout(function() {
                  list.style.display = display;
                }, (display === 'block') ? 0 : 200);

                list.className = 'animated pulse';
                 },
             
              shuffle:function(index){
                 var random=document.getElementById('random');
                 var self =this;
                 // var random =document.getElementById('random');

                  var music = self.playlist[self.index].howl;
                  music.stop();

                  self.play(index);

               
              }  

            };
              //set an instance of the Player constructor and pass the playlist into it.

              //if is_external property is false.

                 var isExt=(songs.tracks).filter(function(ext){
  
                  if (ext.is_external==false){
                  ext.url='http://southpawgroup.com/gidimusicplayer/gidimusic/newplayer/songs/Various/' + ext.url; 
                       }
                 return (ext.url)  
                })

            var player = new Player(isExt);
            //listen for onclick events

            btn.addEventListener('click', function() {
             player.play();
            });
            play.addEventListener('click', function() {
              player.play();
            });
            pause.addEventListener('click', function() {
              player.pause();
            });
            prevBtn.addEventListener('click', function() {
              player.skip('prev');
            });
            nextBtn.addEventListener('click', function() {
              player.skip('next ');
            });
            repeat.addEventListener('click', function() {
              player.repeat(this);
            });
           listToggle.addEventListener('click', function() {
            player.toggle();

            });

           random.addEventListener('click', function() {
            var random =Math.floor(Math.random()*(songs.tracks.length-1));

            player.shuffle(random);
            });
           
            songSlider.addEventListener('click', function(event) {
              player.seek(event.clientX / window.innerWidth);
            });
           
           

              //upon loading page load all songs and cache
             window.onload=function(){


               for (var i =0; i<songs.tracks.length; i++){  
               var tracks =[songs.tracks[i].url];
               var song = document.createElement('Audio');
               var allSongs = tracks;
               song.src = allSongs;
               
              }
          };
    })();
