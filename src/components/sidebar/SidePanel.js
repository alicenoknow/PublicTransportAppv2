import React, { Component } from "react";

class SidePanel extends Component {
  state = {
    isOpen: false,
  };

  handleViewChange = () =>
    this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isOpen } = this.state;
    const sidebarClass = isOpen ? "sidebar-open" : "sidebar-closed";
    return (
      <div className={sidebarClass}>
        <button onClick={this.handleViewChange} className="sidebar-toggle">
            {isOpen ? '<' : '>'}
        </button>
      </div>
    );
  }
}

export default SidePanel;