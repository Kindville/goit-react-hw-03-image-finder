import PropTypes from 'prop-types';
import { Component } from 'react';
import './styles.css'

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

        return (
        <div className="Overlay" onClick={ this.handleClickBackdrop }>
            <div className="Modal" >
                { children }
            </div>
        </div>
    );
  }
}
Modal.propTypes = {
    children: PropTypes.object.isRequired,
}
