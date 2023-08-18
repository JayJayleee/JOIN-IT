import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';


export default class StreamComponent extends Component {
 
    render() {
        return (
            <div className="OT_widget-container">
                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={this.props.user} />
                    </div>
                ) : null}
            </div>
        );
    }
}
