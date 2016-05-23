HomePage = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Devices collection and puts them on this.data.devices
  getMeteorData() {
    return {
      devicesCount: Devices.find({}).count()
    };
  },

  _renderOverview() {
  	var overviews = [
  		{text: '配送车数量', href: 'monitor_solo'},
  		{text: '消费总金额', href: 'monitor_solo'},
  		{text: '剩余配送量', href: 'repair_status'},
  		{text: '用户消息', href: 'message_user'}
  	];
  	return overviews.map((item) => {
      return <OverviewItem key={item.text} item={item} devicesCount={this.data.devicesCount} changePage={this.props.changePage} />;
    });
  },

  	render() {
	    return (
	    	<div id="home-page">
	    		<h4>概览</h4>
		    	<div className="row">
		    		{this._renderOverview()}
		    	</div>
	    		<h4>网页内容</h4>
		    	
		    	<div className="row home-fast">
		    		<div className="col-md-4">
		    			<a>设备数量</a>
		    		</div>
		    		<div className="col-md-4">
		    			<a>在线设备</a>
		    		</div>
		    	</div>
	    	</div>
	    );
  }
});

OverviewItem = React.createClass({

  _changPage() {
  	console.log('changePage: '+this.props.item.href)
    this.props.changePage(this.props.item.href);
  },

  render() {
  	switch (this.props.item.text) {
  		case '配送车数量':
  			return (
				<div className="col-md-3">
					<a href="javascript:;" style={{backgroundColor:'#24B6FF'}} onClick={this._changePage}>{this.props.item.text} : {this.props.devicesCount}</a>
				</div>
		    );
		    break;

  		case '消费总金额':
  			return (
				<div className="col-md-3">
					<a href="javascript:;" style={{backgroundColor:'#37CB8F'}} onClick={this._changePage}>{this.props.item.text} : 32768</a>
				</div>
		    );
		    break;

  		case '剩余配送量':
  			return (
				<div className="col-md-3">
					<a href="javascript:;" style={{backgroundColor:'#FE895E'}} onClick={this._changePage}>{this.props.item.text} : 2</a>
				</div>
		    );
		    break;

  		case '用户消息':
  			return (
				<div className="col-md-3">
					<a href="javascript:;" style={{backgroundColor:'#DD591F'}} onClick={this._changePage}>{this.props.item.text} : 3</a>
				</div>
		    );
		    break;
  	}
  }
});