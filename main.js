 var game = document.getElementById("game");
 var goo = 0;
 for (let i = 0; i < 9; i++) {
     game.innerHTML+= '<div class="block"></div>';
 }
 var allblock = document.getElementsByClassName("block");


 function getpos() {
    var index = [];
     var j = 0;
     for (let i = 0; i < allblock.length; i++) {
         if (allblock[i].innerHTML == "") {
             index[j] = i;
             j++;
         }
     }
     return index
 }


 function computerMove() {
    var index = getpos()
     var random = Math.floor(Math.random() * index.length);
     var randblock = index[random];
     allblock[randblock].innerHTML = "0";
     allblock[randblock].style.color = '#C30000'; 
     goo = 0;
     isGameOver()
 }

 function restart() {
     count = 0;
     goo = 0;
     game.innerHTML = "";
     for (let i = 0; i < 9; i++) {
         game.innerHTML += '<div class="block"></div>';
     }
 }

// false - game running
// true - game over
 function isGameOver() {
     var rez = check();
     var index = getpos()
     if (rez) {
         switch (rez) {
             case 1:
                 goo = 1;
                 game.innerHTML = document.location.href = "/home/vlad/Сайт/youwin.html" ;
                 break;
             case 2:
                 goo = 1;
                 game.innerHTML = document.location.href = "/home/vlad/Сайт/youdead.html";
                 break;
         }
     } else {
         if (index.length == 0) {
             goo = 1;
             game.innerHTML =  document.location.href = "/home/vlad/Сайт/n.html";
         }
     }
     if (rez || index.length == 0) {
         setTimeout(restart, 80);
         return true
     }
     return false
 }


 function check() {
     var combo = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
     ];
     for (let i = 0; i < combo.length; i++) {
         if (allblock[combo[i][0]].innerHTML == "1" && allblock[combo[i][1]].innerHTML == "1" && allblock[combo[i][2]].innerHTML == "1") return 1;
         if (allblock[combo[i][0]].innerHTML == "0" && allblock[combo[i][1]].innerHTML == "0" && allblock[combo[i][2]].innerHTML == "0") return 2;
     }
 }

 game.onclick = function(e) {
     if (goo == 0) {
         if (e.target.innerHTML == "") {
             e.target.innerHTML = "1";
             goo = 1;
             if (!isGameOver()) {
                setTimeout(computerMove, 1000);
             }
         }
     }
 }