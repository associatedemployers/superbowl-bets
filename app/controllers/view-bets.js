import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],
  bet: Ember.computed.alias('controllers.application.bet')
});
