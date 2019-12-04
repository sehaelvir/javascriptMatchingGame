

 matchingGame();

function matchingGame() {

    this.gamediv = document.getElementById("MatchingGame");
    document.getElementById('resetGame').style.display = 'none';
    this.cardSize = 100;
    this.cardSpacing = 10;
    this.gameWidth = 4;
    this.gameHeight = 4;
    this.firstcard = null;
    this.secondcard = null;
    this.checktimeout = null;
    this.matches = 0;
    this.counter = 0;

    

    this.createGrid = function(v,h) {
        var a = [];

        for (let i = 0; i < gameWidth * gameHeight / 2; i++) {
            a.push(i);
            a.push(i);   
        }

        var s = [];
        while(a.length > 0){
            var r = Math.floor(Math.random() * a.length);
            s.push(a[r]);
            a.splice(r, 1);
        }

        for (let x = 0; x < v; x++) {
            for (let y = 0; y < h; y++) {
            createCard(s.pop(),x,y)          
            }
        }   
        
    }

    this.createCard = function(cardName, posX, posY){
        var card = document.createElement('img');
        card.num = cardName;
        card.src = 'matchcards/cardback.png';
        card.style.cssText = '-webkit-user-select: none; -webkit-user-drag: none;';
        card.style.position = 'absolute';
        card.style.left = (posX*(cardSize + cardSpacing) + cardSpacing) +'px';
        card.style.top = (posY*(cardSize + cardSpacing) + cardSpacing) +'px' 
        card.onclick = clickCard;
        gamediv.appendChild(card);
       
        
        document.getElementById('newGame').style.display = 'none'   

    }

    this.clickCard = function(e) {
        counter += 1;
        document.getElementById('counter').innerHTML ='<b>' + counter + ' click</b>';
        document.getElementById('resetGame').style.display = 'block'
        //adding sound click here
        playSound('sound/click.mp3');

        if(checktimeout !== null){
            clearTimeout(checktimeout);       
            checkCards();       
        }

        var card = e.target;
        card.src = "matchcards/card"+ card.num +".png";
        if (firstcard == null) {

        firstcard = card;   

        }else if(firstcard == card){
            firstcard.src = "matchcards/cardback.png";
            firstcard = null;
        }else if(secondcard == null){

        secondcard = card;
        checktimeout = setTimeout(checkCards, 1000);
        }
        
    }

    this.checkCards = function(){
        var score = document.getElementById('score');
            if (firstcard.num == secondcard.num) {  //check two card is same
                gamediv.removeChild(firstcard);     
                gamediv.removeChild(secondcard);
                matches++;
                // Adding sound to match card
                playSound('sound/match.mp3');
                score.innerHTML = '<b>' + matches + ' match</b>';
                if(matches >= gameHeight * gameWidth / 2){
                    gameWin();
                }
            }else{
                firstcard.src = "matchcards/cardback.png";
                secondcard.src = "matchcards/cardback.png";
            }
            firstcard = null;
            secondcard = null;
            checktimeout = null;
    }

    this.gameWin = function() {
        document.getElementById('gameWin').style.visibility = 'visible';
        document.getElementById('newGame').style.display = 'block'
        document.getElementById('resetGame').style.display = 'none'
        playSound('sound/win.mp3');
      
    }

    this.playSound = function(fileName){
        var audio = new Audio(fileName);
        audio.play();
    }

    this.createGrid(gameWidth,gameHeight);
   
}
