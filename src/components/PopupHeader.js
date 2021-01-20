import React from 'react';
import logo from '../app/images/icon.png';
import { Card, CardHeader } from '@material-ui/core';

class PopupHeader extends React.Component {
  render_old() {
    return (
      <header className="Popup-header" >
        <img src={logo} className="App-logo" alt="logo" height="50vh" />
        <p>Nevis</p>
      </header>
    );
  }

  render() {
    return (
      <Card style={ { backgroundColor: "#0F89D2", color: "white", alignItems: "center" } } elevation={0}>
        <CardHeader
          avatar={
            <img src={logo} className="App-logo" alt="logo" height="50vh" />
          }
          title="Nevis"
          subheader="v0.0.1"
          subheaderTypographyProps={ { color: "white" } }
        />
      </Card>
    );
  }
}

export default PopupHeader;
