import DS from 'ember-data';
import ApplicationSerializer from 'superbowl-bets/serializers/application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    choice: { embedded: 'always' },
    proposition: { embedded: 'always' }
  }
});
