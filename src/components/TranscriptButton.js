import { Button } from '@material-ui/core';
import React from 'react';

class TranscribeButton extends React.Component {
  constructor(props) {
    super(props);
    this.component_ref = React.createRef();
  }

  getDOMNode() {
    return this.component_ref.current;
  }

  render() {
    return (
      <Button className="transcribeButton" onClick={() => {
        alert('clicked');
      }}
      ref={(node) => this.props.cb(node)}
      >
        Transcribe
      </Button>
    );
  }
}

export default TranscribeButton;
