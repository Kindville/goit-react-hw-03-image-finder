import PropTypes from 'prop-types';

export const Button = ({onLoadMore}) => {
return(
        <button type='button' onClick={onLoadMore}> Load more</button>
)
}

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
};