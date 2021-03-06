import Ember from 'ember';

export default Ember.ArrayController.extend({
  itemController: 'proposition',
  needs: [ 'application' ],

  user: Ember.computed.alias('controllers.application.user'),

  _cachedRemaining: null,

  remainingDidChange: function () {
    Ember.run.next(this, function () {
      this.set('_cachedRemaining', this.get('remaining'));
    });
  }.observes('remaining'),

  remaining: function () {
    var initialAmount = this.get('user.amount') || 500,
        props         = this.get('_subControllers');

    if ( !this.get('content') ) {
      return initialAmount;
    }

    var wagers = props.mapBy('wager');

    return wagers.reduce(function ( amt, wager ) {
      return ( isNaN( wager ) ) ? amt : amt - wager;
    }, initialAmount);
  }.property('@each.wager', 'user.amount'),

  actions: {
    submitBets: function () {
      var remaining = this.get('remaining'),
          self      = this;

      var cancel = function ( err ) {
        if ( err ) {
          err = ( typeof err === 'object' ) ? ( err.responseText ) ? err.responseText : err.statusText : err;
        }

        self.setProperties({
          betting:      false,
          bettingError: err
        });
      };

      this.setProperties({
        betting:      true,
        bettingError: null
      });

      if( remaining > 0 && !confirm('You have ' + remaining + 'sb remaining. Are you sure you want to submit your bets?') ) {
        return cancel();
      }

      var props = this.get('_subControllers'),
          user  = this.get('user');

      var bets = props.map(function ( prop ) {
        return {
          choice:      prop.get('computedChoice.id'),
          wager:       prop.get('wager'),
          proposition: prop.get('content.id')
        };
      });

      Ember.$.post('/api/bets', { user: user.id, propositions: bets }).then(function () {
        self.set('betting', false);
        self.transitionToRoute('success');
      }, cancel);
    }
  }
});
