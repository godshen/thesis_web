DetailPage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Devices collection and puts them on
  getMeteorData() {
    let query = this.props.currentDevice.id;
    return {
      myDev: Devices.findOne(query),
      myOrd: Orders.findOne({"cart":query})
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
    var messageStr = message.payloadString;
    
    console.log(messageStr);

    this._mqttSend("hahaha")
  },

  _mqttSend(msg) {
    var client = this.mqttClient;
    var device_id = this.props.currentDevice.id;
    message = new Paho.MQTT.Message(msg);
    message.destinationName = device_id + "/in";
    client.send(message);
  },

  componentDidMount() {
    this._mqttClient();
    var client = this.mqttClient;
    var device_id = this.props.currentDevice.id;
    client.connect({onSuccess:onConnect});
    function onConnect() {
        console.log("connected: "+device_id);
        client.subscribe(device_id + "/out"); 
    };

    var map = new BMap.Map("mapContainer");
    var point = new BMap.Point(121.222, 31.058);
    map.centerAndZoom(point, 16); 
    map.addControl(new BMap.NavigationControl()); 
    map.addControl(new BMap.ScaleControl());
    map.enableScrollWheelZoom();   
    map.setCurrentCity("上海"); 

    var myIcon = new BMap.Icon(
      "img/cart.jpg", 
      new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25) 
      }
    );  
    var nowDev = this.data.myDev;
    var nowDes = this.data.myOrd;
    var pot_0 = new BMap.Point(nowDev.coordinates0, nowDev.coordinates1);
    var marker0 = new BMap.Marker(pot_0,{icon: myIcon});
    map.addOverlay(marker0);
    if(nowDes!=null){
      var pot_1 = new BMap.Point(nowDes.lng,nowDes.lat);
      var marker1 = new BMap.Marker(pot_1);
      map.addOverlay(marker1);

      var walking = new BMap.WalkingRoute(
            map, {renderOptions:{map: map, panel: "r-result",autoViewport: true}}
          );
      walking.search(pot_0,pot_1);
    }
    
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

        <div id="mapContainer" className="mapContainer"></div>

        <div id="r-result"></div>
      </div>
    );
  }
});

