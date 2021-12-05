import React, { Component } from "react";
import PanelContent from './PanelContent';
import { ScrollView } from "@cantonjs/react-scroll-view";

class SidePanel extends Component {
  state = {
    isOpen: false,
  };

  handleViewChange = () =>
    this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    const { data, setData, setServerWait } = this.props;
    const styleStatus = isOpen ? "-open" : "-closed";
    return (
      <div className={"sidePanel" + styleStatus}>
        <button onClick={this.handleViewChange} className="sidePanel-toggle">
            {isOpen ? '<' : '>'}
        </button>
        <ScrollView style={{ height: '100vh' }}>
          <div className={"panelContent" + styleStatus}>
            <PanelContent data={data} setData={setData} setServerWait={setServerWait}/>
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default SidePanel;