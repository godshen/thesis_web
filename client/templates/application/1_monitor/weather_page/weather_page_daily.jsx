var WeatherCondition = ["暴雨","大雪","大雨","多云","晴","沙尘","未知","雾","小雪","小雨","阴","中雪","中雨"];
WeatherPageDaily = React.createClass({
  	render() {
  		
  		var Month = [31,28,31,30,31,30,31,31,30,31,30,31];
		var data = this.props.weather.weather_data;
		var bgp = 0;
		var mon=0;
		var day=0;
		for(;bgp<13;bgp++){
			if(this.props.weather.weather_data[0].weather.match(WeatherCondition[bgp])!=null){
				break;
			}
		}
		var displaydaily =  data.map(function (dat) {
			return (
				<DailyDetail key={dat.date} date={dat.date} temp={dat.temperature} weat={dat.weather} mon={mon} day={day} />
			);
		});

		var pm25_state = {};
		var pm25 = this.props.weather.pm25-0;
		if (pm25 < 50) {
			pm25_state = {color: '#24B6FF', text: '空气优良'};
		} else if (pm25 > 49 && pm25 < 100) {
			pm25_state = {color: '#37CB8F', text: '空气良好'};
		} else if (pm25 > 99 && pm25 < 200) {
			pm25_state = {color: '#FE895E', text: '轻度污染'};
		} else if (pm25 > 199) {
			pm25_state = {color: '#DD591F', text: '重度污染'};
		}
	    return (
	      <div className={"container-fluid" + " " + "pagedaily" + bgp}>
			    <div className="row rowdaily">
					<div className="col-md-4">
					<br/><br/><br/><br/><br/><br/><br/>
						<h4>{this.props.weather.weather_data[0].temperature}</h4>
			      		<h4>{this.props.weather.weather_data[0].weather}</h4>
			      		<h4>{this.props.weather.weather_data[0].wind}</h4>
			      		<h4 style={{backgroundColor:pm25_state.color}} className="pm25">{this.props.weather.pm25+' : '+pm25_state.text}</h4>
					</div>
					{displaydaily}
			    </div>
	      </div>
	    );
  }
});
DailyDetail = React.createClass({
  render() {
  	var weatherpic;
  	for (var x in WeatherCondition){
  		if(this.props.weat.match(WeatherCondition[x])!=null)
  			{weatherpic = WeatherCondition[x];break;}
  	}
  	weatherpic = "/img/weather/weather_mini_" + weatherpic + ".png";
    return (
      <div className="col-md-2">
      	<h3>{this.props.date.slice(0,3)}</h3>
      	<div>
      		<img className="weatherpic" src={weatherpic} />
      	</div>
      	<h5>{this.props.temp}</h5>
      	<h5>{this.props.weat}</h5>
      </div>
    );
  }
});

//      	<h5>{this.props.mon+"月"+this.props.day+"日"}</h5>