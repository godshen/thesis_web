WeatherPageHeader = React.createClass({

  render() {
    var isOnline = this.props.currentDevice.online-0 ? " online" : " offline";
    var onlineName = this.props.currentDevice.online-0 ? "online-circle" : "offline-circle";
    return (
    	<div className="container-fluid pageheader">
  	     <div className="pull-left">{this.props.weather._id}</div>
  	     <div className="pull-right">
  	       <div className={onlineName}></div>
  	       <div className="isonline">{isOnline}</div>
  	     </div>
      </div>
    );
  }
});

