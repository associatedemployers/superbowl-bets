import DS from 'ember-data';

var attr = DS.attr;

export default DS.Model.extend({
  title:        attr('string'),
  oddsNmr:      attr('number'),
  oddsDmr:      attr('number'),
  numberOfBets: attr('number')
});
