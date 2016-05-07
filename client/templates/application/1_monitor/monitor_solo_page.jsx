MonitorSoloPage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Devices collection and puts them on this.data.devices
  getMeteorData() {
    let query = {};

    return {
      devices: Devices.find(query).fetch()
    };
  },

  renderDevices() {
    // Get devices from this.data.devices
    return this.data.devices.map((device) => {
      return <Device changePage={this.props.changePage} key={device._id} device={device} />;
    });
  },

  render() {
    return (
      <div className="container-fluid">
		  <h4>设备列表</h4>

		  <div className="row">
		    <ul className="list-unstyled">
		    	{this.renderDevices()}
		    </ul>
		  </div>
      </div>
    );
  }
});

Device = React.createClass({
  // propTypes: {
  //   // This component gets the task to display through a React prop.
  //   // We can use propTypes to indicate it is required
  //   device: React.PropTypes.object.isRequired
  // },

  _changePage() {
  	this.props.changePage('details', this.props.device);
  },

  render() {

    var isOnline = this.props.device.online-0;
    const panelClassName = isOnline ? "panel panel-primary" : "panel panel-default";
    const onlineStatus = isOnline ? "online" : "offline";

    return (
      <li>
        <a href="javascript:;" onClick={this._changePage}>
          <div className={panelClassName}>
      		  <div className="panel-heading">
      		    <h3 className="panel-title">{this.props.device.id} <small className="pull-right">{onlineStatus}</small></h3>
      		  </div>
      		  <div className="panel-body">
      		    <table>
                <tbody>
      	          <tr className="row" >
      	            <td className="col-md-3">MAC: {this.props.device.bssid} </td>
      	            <td className="col-md-3"> alias: {this.props.device.alias} </td>
                    <td className="col-md-3"> location: {this.props.device.location} </td>
      	            <td className="col-md-3"> created: {this.props.device.created}</td>
      	          </tr>
                </tbody>
      	       </table>
      		  </div>
      		</div>
        </a>
      </li>
    );
  }
});