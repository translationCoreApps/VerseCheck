import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Toggle } from 'material-ui';
import isEqual from 'deep-equal';
import style from '../css/Style';

let ActionsArea = ({
  tags,
  mode,
  actions,
  commentChanged,
  selectionsReducer,
  selections,
  remindersReducer,
  saveSelection,
  cancelSelection,
  clearSelection,
  translate
}) => {
  const changeModeArea = (
    <div style={style.actionsArea}>
      <Toggle
        toggled={remindersReducer.enabled}
        style={{ margin: "auto 5px", display: "flex" }}
        label={translate("bookmark")}
        labelPosition="right"
        labelStyle={{ color: 'var(--accent-color-dark)', fontWeight: "normal" }}
        thumbSwitchedStyle={{ backgroundColor: 'var(--accent-color-dark)' }}
        trackSwitchedStyle={{ backgroundColor: 'var(--accent-color-dark)', opacity: '0.5' }}
        onToggle={actions.toggleReminder}
      />
      <div style={{ display: "flex" }}>
        <button
          style={{ width: "140px", marginRigth: "5px" }}
          className='btn-second'
          onClick={actions.changeMode.bind(this,'select')}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          {translate("select")}
        </button>
        <button
          style={{ width: "140px", marginRigth: "5px" }}
          className='btn-second'
          onClick={actions.changeMode.bind(this,'edit')}
        >
          <Glyphicon glyph='pencil' style={{marginRight: '10px'}} />
          {translate("edit_verse")}
        </button>
        <button
          style={{ width: "140px" }}
          className='btn-second'
          onClick={actions.changeMode.bind(this,'comment')}
        >
          <Glyphicon glyph='comment' style={{marginRight: '10px'}} />
          {translate("comment")}
        </button>
      </div>
    </div>
  );

  const confirmEditVerseArea = (
      <div style={style.actionsArea}>
        <button className='btn-second'
                onClick={actions.cancelEditVerse.bind(this)}
        >
          {translate("cancel")}
        </button>
        <button className='btn-prime'
                disabled={!tags.length}
                onClick={actions.saveEditVerse.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          {translate("save")}
        </button>
      </div>
  );

  const confirmCommentArea = (
      <div style={style.actionsArea}>
        <button className='btn-second'
                onClick={actions.cancelComment.bind(this)}
        >
          {translate("cancel")}
        </button>
        <button className='btn-prime'
                disabled={!commentChanged}
                onClick={actions.saveComment.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          {translate("save")}
        </button>
      </div>
  );

  const confirmSelectionArea = (
      <div style={style.actionsArea}>
        <button
          className='btn-second'
          style={{ alignSelf: 'flex-start'}}
          onClick={cancelSelection.bind(this)}
        >
          {translate("cancel")}
        </button>
        <button
          className='btn-second'
          disabled={selections.length > 0 ? false : true}
          onClick={clearSelection.bind(this)}
        >
          <Glyphicon glyph='erase' style={{marginRight: '10px'}} />
          {translate("clear_selection")}
        </button>
        <button
          className='btn-prime'
          disabled={isEqual(selections, selectionsReducer.selections)}
          onClick={saveSelection.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          {translate("save")}
        </button>
      </div>
  );

  let modeArea;
  switch(mode) {
    case 'edit':
      modeArea = confirmEditVerseArea;
      break;
    case 'comment':
      modeArea = confirmCommentArea;
      break;
    case 'select':
      modeArea = confirmSelectionArea;
      break;
    case 'default':
      modeArea = changeModeArea;
      break;
    default:
      modeArea = changeModeArea;
  }

  return modeArea;
};

export default ActionsArea;
