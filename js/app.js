(function(){
            'use strict'

        var prevBtn =document.getElementById('prev');
        var nextBtn =document.getElementById('next');

        var Player = function(playlist) {
          this.playlist = playlist;
          this.index = 0;

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
                    btn.style.display ='none';
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
                   // var backgroundImage ="url(songs.tracks[index].album.thumbnail)"
                    //card.style.backgroundImage =backgroundImage;
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

                if (self.playlist[self.index].howl) {
                  self.playlist[self.index].howl.stop();
                }
                self.play(index);
              },

              //repeat track playing
              repeat :function(index){
                var self =this;

                var repeat =document.getElementById('repeat');
                var music = self.playlist[self.index].howl;
                music.stop();
                self.play(index);
              },
              //display time played 
              timer: function() {
                  var timeDisplay =document.getElementById('timer'); 
                  var self = this;
                  var music = self.playlist[self.index].howl;
     
                  var seek = music.seek() || 0;
                  timeDisplay.innerHTML = self.formatTime(Math.round(seek));

                },
              formatTime:function(secs){
                var minutes = Math.floor(secs / 60) || 0;
                var seconds = (secs - minutes * 60) || 0;
                if (seconds <10 ){
                  seconds = '0'+seconds;
                }
                return minutes + ':' + seconds;
               }

            };
              //set an instance of the Player constructor and pass the playlist into it
            var player = new Player(songs.tracks);

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
              player.skip('next');
            });
            repeat.addEventListener('click', function() {
              player.repeat(this);
            });
              //upon loading page load all songs and cache
              window.onload=function(){

               for (var i =0; i<songs.tracks.length; i++){  
               var tracks =[songs.tracks[i].url];
               var song = document.createElement('Audio');
               var allSongs = tracks;
               song.src = allSongs;
               
              }
          }
    })();
