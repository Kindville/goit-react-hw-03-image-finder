import PropTypes from 'prop-types';
import './styles.css'
export const ImageGalleryItem = ({  description, smallImage, largeImage, openModal }) => {
    return (
       
            <li className="ImageGalleryItem" onClick={()=>openModal(largeImage)}>
            <img className="ImageGalleryItem-image"  src={smallImage} alt={description} />
           </li>
    )
}
 ImageGalleryItem.prototype = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};