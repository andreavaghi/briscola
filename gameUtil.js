Util = {};

Util.inHand = function (set, card) {
    for (var i = 0; i < set.length; i++) {
        if (matchCard(set[i], card)) return true; 
    }
    return false;
};

Util.removeCard = function (card, set) {
    return set.filter(function (setCard) {
        return !matchCard(card, setCard);
    });
};

function matchCard(a, b) {
    return a.suit === b.suit && a.value === b.value;
}