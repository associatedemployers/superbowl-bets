import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    var d = this.controllerFor('application').getProperties('user', 'bet');

    if ( !d.user || !d.user.id || !d.bet ) {
      return this.transitionTo('index');
    }
  },

  model: function () {
    return this.store.find('bet', this.controllerFor('application').get('bet'));
  }
});
