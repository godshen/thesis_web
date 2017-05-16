if (Meteor.isClient) {
  Meteor.Subscribe("daoLuanDeThing");
  Meteor.subscribe("devices");
  Meteor.subscribe("orders");
  Meteor.startup(function () {
    ReactDOM.render(<App />, document.getElementById("render-target"));
  });
}
