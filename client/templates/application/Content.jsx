Content = React.createClass({
  render() {
    var currentPage = this.props.currentPage;

    switch (currentPage) {
      case 'home':
        return (
          <div className="container-fluid">
            <HomePage changePage={this.props.changePage} />
          </div>
        );
        break;

      case 'monitor_center':
        return (
          <div className="container-fluid">
            <MonitorCenterPage changePage={this.props.changePage} />
          </div>
        );
        break;
      case 'monitor_solo':
        return (
          <div className="container-fluid">
            <MonitorSoloPage changePage={this.props.changePage} />
          </div>
        );
        break;
      case 'monitor_group':
        return (
          <div className="container-fluid">
            <MonitorGroupPage changePage={this.props.changePage} />
          </div>
        );
        break;
      case 'details':
        return (
          <div className="container-fluid">
            <DetailPage changePage={this.props.changePage} currentDevice={this.props.currentDevice} />
          </div>
        );
        break;

      case 'message_user':
        return (
          <div className="container-fluid">
            <MessageUserPage changePage={this.props.changePage} />
          </div>
        );
        break;
      case 'message_system':
        return (
          <div className="container-fluid">
            <MessageSystemPage changePage={this.props.changePage} />
          </div>
        );
        break;

      case 'account':
        return (
          <div className="container-fluid">
            <AccountPage changePage={this.props.changePage} />
          </div>
        );
        break;

      default:
        return (
          <div className="container-fluid">
            404 not found
          </div>
        );
    }
  }
});