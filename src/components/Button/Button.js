import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = props => {
  const { onLoadMore } = props;

  return (
    <button className={css.Button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
