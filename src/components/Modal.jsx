import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
  };

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
    const { title, onClose, currentImgUrl, currentImgDescription } =
      this.props;

    return createPortal(
      <div  onClick={this.handleClickBackdrop}>
        <div >
          
            {title && <h1 >{title}</h1>}
            <button  type="button" onClick={onClose}>
            </button>
          <img
            src={currentImgUrl}
            alt={currentImgDescription}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}
