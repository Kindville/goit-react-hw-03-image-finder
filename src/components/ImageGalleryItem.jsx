import PropTypes from 'prop-types';

export const ImageGalleryItem = ({  description, smallImage, largeImage, openModal }) => {
    return (
       
            <li className="gallery-item" onClick={openModal}>
            <img src={smallImage} alt={description} data-large={largeImage}/>
           </li>
    )
}
 ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};