DetailPage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Devices collection and puts them on
  getMeteorData() {
    let query = this.props.currentDevice.id;
    return {
      myDev: Devices.findOne(query),
      myOrd: Orders.findOne({"cart":query}),
      map : 0,
      marker : 0,
      RuteRes : []
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
    var messageObj = JSON.parse(messageStr);
    var lat = messageObj.lat;
    var lng = messageObj.lng;
    var latS = lat.toString();
    var lngS = lng.toString();

    var Lat = parseFloat(latS.substring(0,3)) + 
              parseFloat(latS.substring(3)/60.0) + 0.0109;
    var Lng = parseFloat(lngS.substring(0,2)) + 
              parseFloat(lngS.substring(2)/60.0) + 0.0043;
    var map = this.data.map;
    var marker = this.data.marker;  
    marker.remove();
    console.log(Lat+" , "+Lng);
    var myIcon = new BMap.Icon(
      "img/cart.jpg", 
      new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25) 
      }
    );  
    var pot_0 = new BMap.Point(Lat,Lng);
    var marker0 = new BMap.Marker(pot_0,{icon: myIcon});
    var label = new BMap.Label("myCart",{offset:new BMap.Size(20,-10)});
    map.addOverlay(marker0);
    marker0.setLabel(label);

    this.data.marker = marker0;
    //this._mqttSend("")
  },

  _mqttSend(msg) {
    var client = this.mqttClient;
    var device_id = this.props.currentDevice.id;
    message = new Paho.MQTT.Message(msg);
    message.destinationName = device_id + "/in";
    client.send(message);
  },
  _toCon(e){
    var content = e.target.value;
    if(content=="左"){this._mqttSend("TurnR");} 
    if(content=="右"){this._mqttSend("TurnL");} 
    if(content=="停"){this._mqttSend("Stop");} 
  },

  componentDidMount() {
    this.data.map = new BMap.Map("mapContainer");
    this._mqttClient();
    var client = this.mqttClient;
    var device_id = this.props.currentDevice.id;
    client.connect({onSuccess:onConnect});
    function onConnect() {
        console.log("connected: "+device_id);
        client.subscribe(device_id + "/out"); 
    };

    var map = this.data.map;
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
    var label = new BMap.Label("myCart",{offset:new BMap.Size(20,-10)});
    map.addOverlay(marker0);
    marker0.setLabel(label);
    this.data.marker = marker0;
    if(nowDes!=null){
      var pot_1 = new BMap.Point(nowDes.lng,nowDes.lat);
      var marker1 = new BMap.Marker(pot_1);
      map.addOverlay(marker1);

      var walking = new BMap.WalkingRoute(
            map, {renderOptions:{map: map,autoViewport: true}}
          );
      walking.search(pot_0,pot_1);

      walking.setSearchCompleteCallback(
        function(){
          var res = walking.getResults();
          var len = res.getPlan(0).getRoute(0).Nr.length;

          var r = res.getPlan(0).getRoute(0).getStep(0).getDescription(false);
          console.log(r.match("正东|正西|正南|正北|东北|东南|西北|西南"));

          for(var i=1;i<len-1;i++)
          {
            var r = res.getPlan(0).getRoute(0).getStep(i).getDescription(false);
            console.log(r.match("左转|右转"));
            //this.data.RuteRes[i] = r;
          }

        }
      );
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
        <input className="btn btn-primary" value="左" onClick={this._toCon}/>

        <input className="btn btn-primary" value="右" onClick={this._toCon}/>

        <input className="btn btn-primary" value="停" onClick={this._toCon}/>
        <div id="r-result"></div>
      </div>
    );
  }
});

