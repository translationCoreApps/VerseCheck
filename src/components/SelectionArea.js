import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';
// components
import RenderSelectionTextComponent from './RenderSelectionTextComponent';

class SelectionArea extends Component {
  constructor() {
    super();
    this.state = {
      inBox: false,
      modalVisibility: false
    };
  }

  render() {
    const {
      projectDetailsReducer: {
        manifest
      }
    } = this.props;
    const { target_language, project } = manifest;
    const bookName = target_language && target_language.book && target_language.book.name ?
      target_language.book.name : project.name;
    const reference = this.props.contextIdReducer.contextId.reference;
    const languageName = manifest.target_language ? manifest.target_language.name : null;
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={style.verseTitle}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={style.pane.title}>
              {languageName}
            </span>
            <span style={style.pane.subtitle}>
              {bookName} {reference.chapter + ':' + reference.verse}
            </span>
          </div>
        </div>
        <div>
          <div style={this.props.projectDetailsReducer.manifest.target_language.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
            <RenderSelectionTextComponent
              actions={this.props.actions}
              mode={this.props.mode}
              verseText={this.props.verseText}
              selections={this.props.selections}
            />
          </div>
        </div>
      </div>
    );
  }
}

SelectionArea.propTypes = {
  actions: PropTypes.shape({
    changeSelectionsInLocalState: PropTypes.func,
    openAlertDialog: PropTypes.func,
  }).isRequired,
  projectDetailsReducer: PropTypes.shape({
    manifest: PropTypes.object
  }).isRequired,
  contextIdReducer: PropTypes.shape({
    contextId: PropTypes.object
  }).isRequired,
  mode: PropTypes.string.isRequired,
  verseText: PropTypes.string.isRequired,
  selections: PropTypes.array.isRequired
};

export default SelectionArea;
