import DS from 'ember-data';

export default DS.Model.extend({
    author: DS.belongsTo('author'),
   title: DS.attr('string') ,
    body: DS.attr('string'),
    date: DS.attr('date')
});