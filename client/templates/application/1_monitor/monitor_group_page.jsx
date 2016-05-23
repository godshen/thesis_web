MonitorGroupPage = React.createClass({

	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	// Loads items from the Devices collection and puts them on this.data.devices
	getMeteorData() {
		let query = {};
		return {
			devices: Devices.find(query).fetch()
		};
	},

	componentDidMount() {
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

		var length = this.data.devices.length;
		for(var i = 0 ; i < length ; i++){
			var nowDev = this.data.devices[i];
			var pot = new BMap.Point(nowDev.coordinates0, nowDev.coordinates1);
			var marker = new BMap.Marker(pot,{icon: myIcon});
			var label = new BMap.Label("myCart"+i,{offset:new BMap.Size(20,-10)});

			map.addOverlay(marker);
			marker.setLabel(label);
		}
	},

	render() {
		return (
			<div className="container-fluid">
				<h3>小区监控</h3>
				<div id="mapContainer" className="mapContainer"></div>
			</div>
		);
	}

});
