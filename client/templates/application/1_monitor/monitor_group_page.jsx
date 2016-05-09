MonitorGroupPage = React.createClass({


	componentDidMount() {
		console.log("this is my try");
		var map = new AMap.Map('mapContainer',{
	        resizeEnable: true,
	        zoom: 7,
	        center: [118, 42]
		});   
	 },

	render() {
		return (
			<div >
				<h3>小区监控</h3>
				<div id="mapContainer" className="mapContainer"></div>
			</div>
		);
	}
});