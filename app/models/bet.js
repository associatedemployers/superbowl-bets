import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  user:       attribute('number'),
  choices:    DS.hasMany('user-choice'),
  time_stamp: attribute('date')
});
