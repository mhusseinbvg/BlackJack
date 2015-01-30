var deck = [];
var playerHand = [];
var playerHandValue = 0;
var dealerHand = [];
var dealerHandValue = 0;
var numAcesPlayer = 0;
var numAcesDealer = 0;
var numInDeck = 0;
var playerCardNum = 0;
var dealerCardNum = 0;
var playerScore = 0;
var dealerScore = 0;
var playerNumAces = 0;
var dealerNumAces = 0;
var bet = 0;
var wallet = 500;


function card(suit, cardvalue) {
    this.suit = suit;
    this.cardvalue = cardvalue;
    this.url = getImage(suit, cardvalue);
    this.visible = true;
}

function makeDeck() {
    for (var i = 0; i < 100; ++i)
        deck[i] = new card(generatesuit(), generateCardValue());
}

function getImage(suit, cardvalue) {

    return "images/" + cardvalue + suit + ".png";
}

function generatesuit() {
    var numGenerator = Math.floor((Math.random() * 4) + 1);
    if (numGenerator == 1)
        return "spade";
    else if (numGenerator == 2)
        return "heart";
    else if (numGenerator == 3)
        return "club";
    else
        return "diamond";
}

function generateCardValue() {
    var numGenerator = Math.floor((Math.random() * 13) + 1);
    if (numGenerator == 1)
        return "A";
    else if (numGenerator == 11)
        return "J";
    else if (numGenerator == 12)
        return "Q";
    else if (numGenerator == 13)
        return "K";
    else
        return numGenerator;
}

function givePlayerCard() {
    playerHand[playerCardNum] = deck[numInDeck];
    if (deck[numInDeck].cardvalue == "A") {
        playerNumAces++;
    }
    playerCardNum++;
    numInDeck++;
    calculatePlayerScore();
    over(playerHand);
}

function giveDealerCard() {
    dealerHand[dealerCardNum] = deck[numInDeck];
    if (deck[numInDeck].cardvalue == "A")
        dealerNumAces++;
    dealerCardNum++;
    claculateDealerScore();
    numInDeck++;
    over(dealerHand);
}

function calculatePlayerScore() {
    playerHandValue = 0;
    for (var t = 0; t < playerHand.length; t++) {
        if (playerHand[t].cardvalue == "A") {
            playerHandValue += 1;
            playerNumAces++;
        } else if (playerHand[t].cardvalue == "J") {
            playerHandValue += 10;
        } else if (playerHand[t].cardvalue == "Q") {
            playerHandValue += 10;
        } else if (playerHand[t].cardvalue == "K") {
            playerHandValue += 10;
        } else {
            playerHandValue += parseInt(playerHand[t].cardvalue);
        }
    }
    calculatePlayerAces(playerNumAces);
}

function claculateDealerScore() {
    dealerHandValue = 0;
    for (var t = 0; t < dealerHand.length; t++) {
        if (dealerHand[t].cardvalue == "A") {
            dealerHandValue += 1;
            dealerNumAces++;
        } else if (dealerHand[t].cardvalue == "J")
            dealerHandValue += 10;
        else if (dealerHand[t].cardvalue == "Q")
            dealerHandValue += 10;
        else if (dealerHand[t].cardvalue == "K")
            dealerHandValue += 10;
        else
            dealerHandValue += parseInt(dealerHand[t].cardvalue);
    }
    calculateDealerAces(dealerNumAces);
}

function calculatePlayerAces() { // doesn't work just yet but i'll get it to work soon enough

    for (var a = 0; a < numAcesPlayer; a++) {
        if (playerHandValue + 10 < 21) {
            playerHandValue += 10;

        }
    }
}

function calculateDealerAces() {
    for (var b = 0; b < numAcesDealer; b++) {
        if (DealerHandValue + 10 < 21) {
            DealerHandValue += 10;
        }
    }
}

function hit(hand) {
    if (bet === 0)
        document.getElementById("place").innerHTML = "You need to bet an amount to actually start playing";
    else if (hand == playerHand) {
        document.getElementById("place").innerHTML = "Press a button";
        givePlayerCard();
        document.getElementById('CurrentScore').innerHTML = "Player score is: " + playerHandValue;
    } else
        giveDealerCard();
}

function stay() { // this is what the dealer is going to do 
    if (bet !== 0) {
        while (dealerHandValue < 17) {
            hit(dealerHand);
        }
        var dealercard = '';
        $.each(dealerHand, function(index, value) {
            dealercard += "<img src = \'" + value.url + "\''>";
        });
        $('#dealerCards').html(dealercard);
        $("#hit").hide();
        $("#doubleDown").hide();
        stayOver();
        document.getElementById("CurrentDealerScore").innerHTML = "Dealer Score is: " + dealerHandValue;
    } else {
        document.getElementById("place").innerHTML = "You need to bet an amount to actually start playing";
    }
}

function doubleDown() {
    if (bet * 2 < wallet) {
        bet *= 2;
        $("#stay").hide();
        hit();
        stayOver();
    } else {
        document.getElementById("place").innerHTML = "Your Wallet isn't big enough to do this bruh";
    }
}

function stayOver() {

    if (dealerHandValue > 21) {
        document.getElementById("place").innerHTML = "The dealer got over 21, that means you win!!!! Winnings will be added to wallet and you can play again by hitting the play button";
        win();
    } else if (playerHandValue > 21) {
        document.getElementById("place").innerHTML = "You got over 21, that means you lose :(. Bet amount will be removed from your wallet and you can play again by hitting the play button";
        lose();
    } else if (playerHandValue <= dealerHandValue) {
        document.getElementById("place").innerHTML = "The dealer got more than you, that means you lose :(. Bet amount will be removed from your wallet and you can play again by hitting the play button";
        lose();
    } else if (playerHandValue > dealerHandValue) {
        document.getElementById("place").innerHTML = "You got higher than the dealer, that means you win!!!! Winnings will be added to wallet and you can play again by hitting the play button";
        win();
    }
    $('#play').show();
    $('#stay').hide();
    $("#hit").hide();
    $("#doubleDown").hide();
}

function over(hand) {
    if (hand == playerHand) {
        if (playerHandValue > 21) {
            stayOver();
        }
    } else {
        if (dealerHandValue > 21) {
            stayOver();
        }

    }
}

function betNow() {
    temp = document.getElementById("betAmount").value;
    if (isNaN(temp))
        document.getElementById("amountBet").innerHTML = "Enter a real number please";
    else if (temp > wallet) {
        document.getElementById("amountBet").innerHTML = "You cannot bet more than what you have in your wallet";
    } else if (temp < 0) {
        document.getElementById("amountBet").innerHTML = "Can't bet a negative number";
    } else {
        bet += parseInt(temp);
        document.getElementById("amountBet").innerHTML = "Amount Bet: " + bet;
    }
    if (bet > 0) {
        $('#bet').hide();
    }
}


function dealCards() {
    givePlayerCard();
    givePlayerCard();
    giveDealerCard();
    giveDealerCard();

}

function reset() { // in the works
    if (wallet === 0) {
        wallet = 500;
    }
    deck = [];
    playerHand = [];
    playerHandValue = 0;
    dealerHand = [];
    dealerHandValue = 0;
    numAcesPlayer = 0;
    numAcesDealer = 0;
    numInDeck = 0;
    playerCardNum = 0;
    dealerCardNum = 0;
    playerScore = 0;
    dealerScore = 0;
    playerNumAces = 0;
    dealerNumAces = 0;
    bet = 0;
    $('#dealerCards').html("");
    $('#playerCards').html('');
    $('#stay').show();
    $("#hit").show();
    $("#doubleDown").show();
    $("#bet").show();
    document.getElementById("amountBet").innerHTML = "Amount Bet: " + bet;
    document.getElementById("place").innerHTML = "Press a button";
    document.getElementById('CurrentScore').innerHTML = "Player score is: " + playerHandValue;
    document.getElementById("CurrentDealerScore").innerHTML = "Dealer Score is:?";
}

function win() {
    wallet += bet;
}

function lose() {
    wallet -= bet;
}
