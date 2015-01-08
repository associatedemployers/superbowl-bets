import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  title:      attr('string'),
  helper:     attr('string'),
  choices:    DS.hasMany('choices'),
  time_stamp: attr('date')
});
