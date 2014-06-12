Games = new Meteor.Collection('games');

if (Meteor.isServer) {
    Meteor.publish('games', function() {
        return Games.find({
            currentTurn: this.userId
        });
    });

    Meteor.publish('users', function() {
        return Meteor.users.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('games');
    Meteor.subscribe('users');
}

Meteor.methods({
    createGame: function(otherPlayerId) {
        var game = GameFactory.createGame([Meteor.userId(), otherPlayerId]);
        Games.insert(game);
    },
    takeTurn: function(gameId, id, card) {
        var game = Games.findOne(gameId),
            hand = game.players[id].hand;

        if(game.currentTurn[0] !== id && Util.inHand(hand, card)) return;

        if(game.table.length === 1) {

            game.table.push(card);
            game.players[id].hand = Util.removeCard(card, hand);

            Games.update(gameId,
                { $set: { table: game.table }}
            );

            // calculate winner
        }
        
        if(game.table.length === 0) {

            game.table.push(card);

            game.players[id].hand = Util.removeCard(card, hand);
            game.currentTurn.unshift(game.currentTurn.pop());

            Games.update(gameId, game);
        }
    }
})