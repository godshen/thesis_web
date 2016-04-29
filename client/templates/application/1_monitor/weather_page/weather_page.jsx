WeatherPage = React.createClass({
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
      currentMessage: {},
      historyMessages: [],
      activeNav: 'temperature'
    }
  },

  _changeNav(activeNav) {
    this.setState({
      activeNav: activeNav
    });
    clearInterval(this.timer);
    this.timer = setInterval(function() {
      this._showChart(activeNav);
    }.bind(this), 3000);
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
    console.log(msg);
    if(msg[15]) console.log(msg[15]);
    if(msg[17]) {console.log(msg[17]);document.getElementById("temp_test").innerHTML="温度"+msg[17];}
    if(msg[19]) {console.log(msg[19]);document.getElementById("humi_test").innerHTML="湿度"+msg[19];}

  },

  _getChartData(current_chart) {
    var history_msg = this.state.historyMessages;
    var chart_data = [];
    for (var i = 0; i < history_msg.length; i++) {
      var data_item = history_msg[i][current_chart];
      chart_data.push(data_item);
    };
    return chart_data;
  },

  _showChart(current_chart) {
    var chart_data = this._getChartData(current_chart);
    var chart_container = this.refs.chart;
    $(chart_container).highcharts({
        chart: {
            backgroundColor: '#f5f5f5',
            type: 'line'
        },
        colors: ['#fe895e'],
        title: {
            text: '',
            x: -20 //center
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
              text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        series: [{
            name: '',
            data: chart_data
        }]
    });
  },

  componentDidMount() {
    this._mqttClient();
    var client = this.mqttClient;
    var device_id = this.props.currentDevice.id;
    client.connect({onSuccess:onConnect});
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("connected: "+device_id);
        client.subscribe(device_id + "/out/read");
    };

    var history_msg_str = localStorage.getItem(this.props.currentDevice.id);
    var history_msg = JSON.parse(history_msg_str);

    var current_chart = this.state.activeNav;
    this.timer = setInterval(function() {
      this._showChart(current_chart);
    }.bind(this), 3000);
  },

  componentWillUnmount() {
    try {
      this.mqttClient.disconnect();
      console.log('disconnected');
    } catch(e) {
      console.log(e);
    }
    clearInterval(this.timer);
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

