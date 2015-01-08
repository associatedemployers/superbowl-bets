import Ember from 'ember';

export default Ember.ObjectController.extend({
  wager: 0,
  _lastWager: null,

  propNumber: function () {
    return this.get('parentController.content').indexOf(this.get('content')) + 1;
  }.property('parentController.content.[]'),

  totalBets: function () {
    return this.get('content.choices').reduce(function ( sum, item ) {
      return sum + item.get('numberOfBets');
    }, 0);
  }.property('content.choices.numberOfBets'),

  computedChoice: function () {
    var selected = this.get('selectedChoice'),
        choices  = this.get('content.choices');

    return ( selected ) ? choices.findBy('id', selected) : null;
  }.property('selectedChoice'),

  computedChoiceType: function () {
    var choice = this.get('computedChoice');

    if ( !choice || !this.get('content.choices') ) {
      return;
    }

    var sortedChoices = this.get('content.choices').toArray().sort(function ( a, b ) {
      return ( a.get('oddsNmr') / a.get('oddsDmr') > b.get('oddsNmr') / b.get('oddsDmr') ) ? 1 : -1;
    });

    console.log(sortedChoices);

    return ( sortedChoices.get('firstObject.id') === choice.get('id') ) ? 'Favorite' : 'Underdog';
  }.property('computedChoice', 'selectedChoice'),

  wagerReturn: function () {
    var choice = this.get('computedChoice'),
        wager  = parseFloat(this.get('wager'));

    if( isNaN( wager ) || wager < 0 || !choice || !this.get('content.choices') ) {
      return;
    }

    var oddsN    = choice.get('oddsNmr'),
        oddsD    = choice.get('oddsDmr'),
        quotient = oddsN / oddsD;

    return Math.floor(( ( quotient < 1 ) ? ( wager / oddsD ) * oddsN : ( wager / oddsN ) * oddsD ) + wager);
  }.property('computedChoice', 'wager'),

  _validateWager: function () {
    Ember.run.next(this, function () {
      var wager     = parseFloat(this.get('wager')),
          lastWager = parseFloat(this.get('_lastWager')),
          remaining = parseFloat(this.get('parentController._cachedRemaining'));

      remaining = ( !lastWager ) ? remaining : remaining + lastWager;

      if ( isNaN(wager) || wager < 0 || wager > remaining ) {
        this.set('wager', null);
      }

      this.set('_lastWager', this.get('wager'));
    });
  }.observes('wager')
});
