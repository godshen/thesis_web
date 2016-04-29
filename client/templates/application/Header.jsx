Header = React.createClass({

  _changPageHome() {
    this.props.changePage('home');
  },

  _changPageAccount() {
    this.props.changePage('account');
  },

  render() {
    return (
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a  href="javascript:;" onClick={this._changPageHome}><img className="headpic"  src="/img/thesis.png" /></a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a className="head-img" href="javascript:;" onClick={this._changPageAccount} ><img src="/img/header_head.png" /></a></li>
          </ul>
        </div>
      </div>
    );
  }
});