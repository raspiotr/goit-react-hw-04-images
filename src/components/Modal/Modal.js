import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  handleModalBackgroundClick = event => {
    if (event.target.classList.contains('Overlay')) {
      this.props.onCloseModal();
    }
  };

  handleEscapeClick = event => {
    if (event.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeClick);
  }

  render() {
    const { imageUrl } = this.props;
    return (
      <div className="Overlay" onClick={this.handleModalBackgroundClick}>
        <div className={css.Modal}>
          <img src={imageUrl} alt="Bigger size" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
