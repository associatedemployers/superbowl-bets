import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],

  notAllowSubmit: Ember.computed.not('allowSubmit'),
  notValidating:  Ember.computed.not('validating'),
  allowSubmit:    Ember.computed.and('firstName', 'lastName', 'notValidating'),

  actions: {
    validate: function () {
      this.setProperties({
        validating:    true,
        validateError: null
      });

      var self = this,
          data = this.getProperties('firstName', 'lastName');

      var reject = function ( err ) {
        err = ( typeof err === 'object' ) ? ( err.responseText ) ? err.responseText : err.statusText : err;
        self.setProperties({
          validating:    false,
          validateError: err
        });
      };

      Ember.$.getJSON('/api/validate', data).then(function ( res ) {
        if( res.status === 'ok' ) {
          self.set('validating', false);
          self.get('controllers.application').set('user', res.user);
          self.transitionToRoute('bet');
        } else {
          reject( res.error );
        }
      }).fail( reject );
    }
  }
});
