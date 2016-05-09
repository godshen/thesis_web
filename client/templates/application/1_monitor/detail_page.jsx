DetailPage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Devices collection and puts them on this.data.weather
  getMeteorData() {
    let query = this.props.currentDevice.location;

    return {
      weather: Weathers.findOne(query)
    };
  },

  getInitialState() {
    return {
    }
  },

  _mqttClient() {
    var host = "api.easylink.io";
    var port = 1983;
    var clientID = "v1-app-" + parseInt(Math.random() * (1000000000000), 12);
    var client = new Paho.MQTT.Client(host, Number(port), clientID);
    client.onMessageArrived = this._onMessageArrived;
    
    this.mqttClient = client;
  },

  _onMessageArrived(message) {
    var msg = JSON.parse(message.payloadString);
    msg = msg[0];
    if(msg[15]) console.log(msg[15]);
    if(msg[17]) {console.log(msg[17]);document.getElementById("temp_test").innerHTML="温度"+msg[17];}
    if(msg[19]) {console.log(msg[19]);document.getElementById("humi_test").innerHTML="湿度"+msg[19];}

  },

  componentDidMount() {
    this._mqttClient();
    var client = this.mqttClient;
    var device_id = this.props.currentDevice.id;
    client.connect({onSuccess:onConnect});
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("connected: "+device_id);
        client.subscribe(device_id + "/out");
    };
  },

  componentWillUnmount() {
    try {
      this.mqttClient.disconnect();
      console.log('disconnected');
    } catch(e) {
      console.log(e);
    }
  },

  render() {
  	
    return (
      <div> 
        <div id="temp_test">{"Nan"} </div>

        <div id="humi_test">{"Nan"} </div>

      </div>
    );
  }
});

