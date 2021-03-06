/* eslint-disable non-constant-condition */
import React from 'react';
import PropTypes from 'prop-types';
import {Glyphicon} from 'react-bootstrap';
import style from '../css/Style';

let SaveArea = ({
  actions,
  selectionsReducer,
  translate
}) => {

  const handleNext = () => {
    selectionsReducer.selections.length > 0 ? actions.handleGoToNext() : actions.handleOpenDialog("next");
  };

  const handlePrevious = () => {
    selectionsReducer.selections.length > 0 ? actions.handleGoToPrevious() : actions.handleOpenDialog("previous");
  };

  return (
    <div style={style.saveArea}>
      <button className='btn-second'
              onClick={handlePrevious}
      >
        <Glyphicon glyph='share-alt' style={{marginRight: '10px', transform: 'scaleX(-1)'}} />
        {translate("save_previous")}
      </button>
      <button className='btn-prime'
              onClick={handleNext}
      >
        {translate("save_continue")}
        <Glyphicon glyph='share-alt' style={{marginLeft: '10px'}} />
      </button>
    </div>
  );
};

SaveArea.propTypes = {
  translate: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    handleGoToNext: PropTypes.func,
    handleGoToPrevious: PropTypes.func,
    handleOpenDialog: PropTypes.func
  }).isRequired,
  selectionsReducer: PropTypes.shape({
    selections: PropTypes.array
  }).isRequired,
  goToNextOrPrevious: PropTypes.string,
  skipToPrevious: PropTypes.func,
  skipToNext: PropTypes.func,
  handleClose: PropTypes.func,
  dialogModalVisibility: PropTypes.bool.isRequired
};

export default SaveArea;
