import React from 'react';
import './modal.css';

export class Modal extends React.Component {
    render(){
        if(!this.props.show){
            return null;
        }

        return (
            <div className="backdrop">
                <div className="modal">
                    {this.props.children}
                    <div className="footer">
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool,
    children: React.PropTypes.node
};