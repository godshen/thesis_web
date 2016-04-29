Meteor.publish('devices', function() {
  return Devices.find();
});
Meteor.publish('weathers', function() {
  return Weathers.find();
});