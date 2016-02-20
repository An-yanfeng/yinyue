window.onload = function(){
  var database=[
    {name:'1',geshou:'G.E.M.邓紫棋',duration:'05:20',src:'./musics/1.mp3'},
    {name:'2',geshou:'G.E.M.邓紫棋',duration:'04:38',src:'./musics/2.mp3'},
    {name:'3',geshou:'G.E.M.邓紫棋',duration:'04:19',src:'./musics/3.mp3'},
    {name:'4',geshou:'家家',duration:'01:13',src:'./musics/4.mp3'},
    {name:'5',geshou:'满文军',duration:'05:27',src:'./musics/5.mp3'},
    {name:'6',geshou:'满文军',duration:'05:07',src:'./musics/6.mp3'},
    {name:'7',geshou:'张杰',duration:'04:52',src:'./musics/7.mp3'},
    {name:'8',geshou:'张杰',duration:'01:13',src:'./musics/8.mp3'},
    {name:'9',geshou:'张杰',duration:'01:13',src:'./musics/9.mp3'}
  ];

  
  var li;
  for ( var i = 0;  i < database.length;  i++){
    li = document.createElement('li');
    li.setAttribute('index',i);
    li.setAttribute('class','li');
    li.innerHTML = '<strong class="music_name" title="">'+database[i].name+'</strong> <strong class="singer_name" title="">'+database[i].geshou+'</strong> <strong class="play_time">'+database[i].duration+'</strong> <div class="list_cp"> <strong class="btn_like" title="" name="" mid="004fQTu016b9W4"> <span></span> </strong> <strong class="btn_share" title=""> <span></span> </strong> <strong class="btn_fav" title=""> <span></span> </strong> <strong class="btn_del" title=""> <span></span> </strong> </div>';
    divsonglist.firstElementChild.appendChild(li);
  }
  // var bianse=null;
  var onmusicchange = function(index){
    audio.src=database[index].src;
    audio.play();

    // if(bianse){
    //   bianse.style.color='black';
    // }
    // playlists[index].style.color='red';
    // bianse=playlists[index];

    if(currentlist){
      currentlist.setAttribute('class','li');
    }

    playlists[index].setAttribute('class','li play_current');
    currentlist = playlists[index];

    musicname.innerHTML =  database[index].name;
    geshou.innerHTML = database[index].geshou;
    ptime.innerHTML = database[index].duration;
  };

  var playlists = document.getElementsByClassName('li');
  var currentlist = null;
  var currentIndex=0;

  for ( var i = 0;  i < playlists.length;  i++){
    playlists[i].onclick = function(){
      var index = Number(this.getAttribute('index'));
      currentIndex = index;
      onmusicchange(index);
    };
  }
  next_bt.onclick = function(){
    currentIndex += 1;
    currentIndex = (currentIndex==database.length)?0:currentIndex;
    onmusicchange(currentIndex);
  };
  
  prev_bt.onclick = function(){
    currentIndex -= 1;
    currentIndex = (currentIndex==-1)?database.length-1:currentIndex;
    onmusicchange(currentIndex);
  };


  // if(this.buffered.length>0 && this.buffered)
  //   var width=this.buffered.end(this.buffered)
  // downloadbar.style.width=width;

 audio.oncanplay=function(){
  audio.play();
 }; 

  audio.onplay = function(){
    btnplay.setAttribute('class','pause_bt');
    musics.style.display='block';
  };
  audio.onpause = function(){
    btnplay.setAttribute('class','play_bt');
  };
  audio.onvolumechange = function(){
    spanvolumebar.style.width = (this.volume*100) + '%'; 
    spanvolumeop.style.left   = (this.volume*100) + '%';
    if(this.volum==0){
      spanmute.className='volume_mute';
    }else{
      spanmute.className='volume_icon';
    }
  };
  audio.onseeked = function(){
    var t  = this.currentTime/this.duration;
    spanplaybar.style.width = (t*100) + '%' ;
    spanprogress_op.style.left = (t*100) + '%';
  };
  audio.ontimeupdate = function(){
    var t  = this.currentTime/this.duration;
    spanplaybar.style.width = (t*100) + '%' ;
    spanprogress_op.style.left = (t*100) + '%';
  };
  audio.onended = function(){
    currentIndex += 1;
    currentIndex = (currentIndex==database.length)?0:currentIndex;
    onmusicchange(currentIndex);
  };
  btnplay.onclick = function(){
    if(audio.paused){
      audio.play();
    }else{
      audio.pause();
    }
  };
  spanmute.onclick = (function(){
    var previous;
    return function(){
      if( this.getAttribute('class').indexOf('mute') != -1 ){
        this.setAttribute('class','volume_icon');
        audio.volume = previous;
      }else{
        this.setAttribute('class','volume_mute');
        previous = audio.volume;
        audio.volume = 0;
      }
    };
  })();

  spanvolume.onclick = function(e){
    audio.volume = e.layerX/this.offsetWidth;
  };
  spanvolumeop.onclick = function(e){
    e.stopPropagation();
  };
  spanplayer_bgbar.parentElement.onclick = function(e){
    var t = e.layerX/this.offsetWidth;
    audio.currentTime = audio.duration * t;
  };
  spanprogress_op.onclick = function(e){
    e.stopPropagation();
  };

  //------------------------------
  btnclose.onclick=function(){
    divplayframe.style.display='none';
  }

  spansongnum1.onclick=function(){
    divplayframe.style.display='block';
  };

  disabled.onclick=function(){
    player_lyrics_pannel.style.display="block";
  }


  btnfold.onmousedown=function(){
    divplayer.style.marginLeft='-541px';

  }
btnfold.onmouseup=function(){
    divplayer.style.marginLeft='0px';

  }

//---------------------------------------------
// var currentIndex=0;
// var playbt=
// // //-------------播放进度处理--------------------
//  var handleprogress=function(){
//   var w=(this.currentIndex/this.duration)*100+'%';
//   spanplaybar.style.width=w;
//   var w2=spanplayer_bgbar.offsetWidth*(this.currentIndex)*100+'%';
//   spanprogress_op.style.left=w2;
//  }
//  audio.onseeked=handleprogress;
//  audio.ontimeupdate=handleprogress; 


// //--------------------------------------
// audio.onended=function(){
//   if(playbt=='cycle_bt'){
//     nextsong();
//   }else if(playbt == 'cycle_single_bt'){
//     handlesongchange(currentIndex);
//   }else if(playbt == 'ordered_bt'){
//     if(currentIndex != database.length-1){
//       nextsong();
//     }
//   }else if(playbt == 'unordered_bt'){
//     var rd=Math.floor(Math.random()*database.length-1){
//       handlesongchange(rd);
//     }
//   }
// }

// // //--------------歌曲改变处理----------------------
// var handlesongchange=(function(){
//   var currentList=null;
//   return function(index){
//     if(currentlist){
//       currentlist.setAttribute('class','li');
//     }
//     playlists[index].setAttribute('class','li play_current');
//     currentlist=playlists[index];
//     music_name.innerHTML=database[index].name;
//     singer_name.innerHTML=database[index].artisan;
//     ptime.innerHTML=data [index].duration;
//     audio.src=database[index].src;
//   }
// })();

// // //--------------播放  暂停------------------
// var playpause=function(){
//   var src=audio.getAttribute('src');
//   if(!src){
//     handlesongchange(0);return;
//   }
//   if(audio.paused){
//     audio.play();
//   }else{
//     audio.pause();
//   }

// };
// btnplay.onclick=playpause;






// // //------------点击设置音量---------------
// var setvolume=function(){
//   audio.volume=e.layerX/this.offsetWidth;
// };
// spanvolume.onclick=setvolume;
// spanmute.onclick=(function(){
//   var prevolume;
//   return function(){
//     if(this.className.indexOf('icon')!= -1){
//       prevolume=audio.volume;
//       audio.volume=0;
//     }else{
//       audio.volume=prevolume;
//     }
//   };
// })();



// // //-------------拖动设置音量--------------
//   spanvolumeop.onmousedown=function(e){
//     e.preventDefault();
//     document.onmousemove=function(e){
//       var v = (e.clientX-spanvolume.getBoundingClientRect().left)/spanvolume.offsetWidth;
//       if(v >= 0 && v <=1){
//         audio.volume = v;
//       }
//     };
//     document.onmouseup=function(){
//       document.onmousemove=null;
//       document.onmouseup=null;
//     };
//   };
//   spanvolumeop.onclick=function(e){
//     e.stopPropagation();
//   };


// // //------------点击设置播放时间---------------
// var setcurrenttime=function(e){
//   audio.currentTime=audio.duration*e.layerX/this.offsetWidth;
// };
// spanplayer_bgbar.parentElement.onclick=setcurrenttime
// spanprogress_op.onclick=function(e){
//   e.stopPropagation()
// }

//  //------------拖动设置播放时间---------------
// spanvolumeop.onmousedown=function(e){
//   e.preventDefault();
//   audio.pause();
//   document.onmousemove=function(e){
//     var t=e.clientX/spanplayer_bgbar.offsetWidth;
//     if(t>=0 && t<=1){
//       audio.currentTime=audio.duration;
//     }
//     };
//     document.onmouseup=function(){
//       audio.play();
//       document.onmousemove=null;
//       document.onmouseup=null;
//     };

//   };
// //--------------列表点击播放----------------------
// divsonglist.onclick=function(e){
//   if(e.target==this) return;
//   var el=e.target.nodeName='LI'?e.target:e.target.parentElement;
//   currentIndex=Number(el.getAttribute('index'));
//   handlesongchange(currentIndex);
// };

// //------------------下一首------------------
// var nextsong=function(){
//   if(playbt=='unordered_bt'){
//     var rd=Math.floor(Math.random()*database.length)?0:currentIndex;
//     handlesongchange(rd); return;
//   }
//   currentIndex += 1;
//   currentIndex = (currentIndex == -1)?database.length)?0:currentIndex;
//   handlesongchange(currentIndex);
// };
// prevbt.onclick=nextsong;


// //-----------------上一首----------------------
// var prevsong=function(){
//   if(playbt=='unordered_bt'){
//     var rd=Math.floor(Math.random()*database.length);
//     handlesongchange(rd); return;
//   }
//   currentIndex -= 1;
//   currentIndex = (currentIndex == -1)?database.length?0:currentIndex;
//   handlesongchange(currentIndex);
// };
// prevbt.onclick=prevsong;




// //--------------------创建列表---------
//  var playlists=(function(){
//   for(var i=0;i<database.length;i++){

//   }
//  })


// //-----------------------点击设置播放模式---------------
// for(var i =0;i<divselect.children.length;i++){
//   divselect.children[i].onclick=function(){
//     this.parentElement.style.display='none';
//     btnPlayway.className=this.className;
//     playbt=this.className;
//   };
// }



//----------------鼠标Hover显示当前位置时长
var formatetime=function(s){
  if(isNaN(s)) return'--:--';
  s=Math.round(s);
  var mi=parseInt(s/60);var se=s%60;
  mi=mi<10?'0'+mi:mi;
  se=se<10?'0'+se:se;
  return mi + ":" + se;
};
spanplayer_bgbar.parentElement.onmousemove=function(e){
  time_show.parentElement.style.display='block';
  time_show.parentElement.style.left=e.clientX-0.5*time_show.offsetWidth+'px';
  time_show.innerHTML=formatetime(audio.duration*(e.clientX/this.offsetWidth));
};
spanplayer_bgbar.parentElement.onmouseout=function(){
  time_show.parentElement.style.display='none';
}
spanplayer_bgbar.parentElement.onmousemove=function(e){
  time_show.parentElement.style.left=e.clientX-0.5*time_show.offsetWidth+'px';
  time_show.innerHTML=formatetime(audio.duration*(e.clientX/this.offsetWidth));

};


// //------------------处理界面效果部分-----------------



};
