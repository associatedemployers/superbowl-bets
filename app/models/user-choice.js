import DS from 'ember-data';

export default DS.Model.extend({
  choice:      DS.belongsTo('choice'),
  proposition: DS.belongsTo('prop'),
  wager:       DS.attr('number'),
});
