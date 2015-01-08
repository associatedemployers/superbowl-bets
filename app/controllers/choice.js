import Ember from 'ember';

export default Ember.ObjectController.extend({
  choiceNumber: function () {
    return this.get('parentController.content.choices').indexOf(this.get('content')) + 1;
  }.property('parentController.content.choices.[]'),

  betPercentage: function () {
    var quotient = ( this.get('content.numberOfBets') / this.get('parentController.totalBets') );
    return ( isNaN( quotient ) ) ? 0 : Math.round( quotient * 100 );
  }.property('parentController.totalBets')
});
