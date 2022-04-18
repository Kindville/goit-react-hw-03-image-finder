import PropTypes from 'prop-types';
import './styles.css'
export const Button = ({onLoadMore}) => {
return(
        <button className='Button' type='button' onClick={onLoadMore}> Load more</button>
)
}

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
};