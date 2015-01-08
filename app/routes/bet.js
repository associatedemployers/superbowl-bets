import Ember from 'ember';

export default Ember.Route.extend({
  /*beforeModel: function () {
    var user = this.controllerFor('application').get('user');

    if ( !user || !user.id ) {
      return this.transitionTo('index');
    }
  },*/

  model: function () {
    return this.store.find('prop');
  }
});
