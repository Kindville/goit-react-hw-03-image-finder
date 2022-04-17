import { ImageGalleryItem } from "./ImageGalleryItem";
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul >
     {images.map(({id, description, smallImage, largeImage})=> (
        < ImageGalleryItem
              key={id}
              smallImage={smallImage}
              largeImage={largeImage}
              description={description}
              openModal={openModal}
       />
     ))}
    </ul>
  );
};
ImageGallery.prototype = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      smallImage: PropTypes.string,
      largeImage: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};