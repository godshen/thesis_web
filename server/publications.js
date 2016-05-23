Meteor.publish('devices', function() {
  return Devices.find();
});

Meteor.publish('orders', function() {
  return Orders.find();
});