import React from "react";
import PopupHeader from "./PopupHeader";

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentJob: null
    };
    this.saveQueryId = this.saveQueryId.bind(this);
  }

  saveQueryId(title) {
    this.setState({ currentJob: title });
  }

  render() {
    let saveQueryId = this.saveQueryId;
    
    chrome.storage.local.get(['key'], function (result) {
      if (result.key !== null) {
        saveQueryId(result.key);
        console.log("Incoming media is " + result.key);
        chrome.storage.local.set({ key: null }, function () {
          console.log("key is cleared!");
        });
      }
    });

    return (
      <div>
        <PopupHeader />
        <p>{this.state.currentJob || ""}</p>
      </div>
    );
  }
}
