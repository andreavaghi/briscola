GameFactory = {};

GameFactory.createGame = function(playerIds) {
    var deck = createDeck(),
        players = createPlayers(playerIds);

    GameFactory.dealPlayers(players, deck);

    var briscola = dealBriscola(deck);
    var table = [];

    return {
        deck: deck,
        players: players,
        briscola: briscola,
        table: table,
        currentTurn: playerIds,
        inProgress: true,
        started: new Date()
    };
};

GameFactory.dealPlayers = function(players, deck) {
    for (var i = 0; i < 3; i++) {
        Object.keys(players).forEach(function(id) {
            players[id].hand.push(deck.shift());
        });
    }
};

function dealBriscola(deck) {
    return deck.shift();
}

function createPlayers(ids) {
    var o = {};

    ids.forEach(function(id) {
        o[id] = {
            hand: [],
            pile: [],
            score: 0
        };
    });

    return o;
}

function createDeck() {
    var suits = ['Cuori', 'Quadri', 'Fiori', 'Picche'],
        cards = new Array();

    suits.forEach(function(suit) {
        for (var i = 1; i <= 10; i++) {
            var name = i;
            if (i === 1) name = 'A';
            if (i === 8) name = 'J';
            if (i === 9) name = 'Q';
            if (i === 10) name = 'K';

            cards.push({
                suit: suit,
                name: name,
                value: i
            });
        }
    });

    return _.shuffle(cards);
}