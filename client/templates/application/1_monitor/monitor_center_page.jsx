MonitorCenterPage = React.createClass({

  render() {
    return (
      <div className="row">
        <h3>监控中心</h3>
        <div>
          <label>监控类型：</label>
        <select>
          <option>故障地图</option>
          <option>温度地图</option>
        </select>
        </div>
        <img src="img/monitor_map.png" />
      </div>
    );
  }
});