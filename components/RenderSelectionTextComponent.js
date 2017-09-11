import React, { Component } from 'react';
import * as _ from 'lodash';
// helpers
import * as windowSelectionHelpers from '../helpers/windowSelectionHelpers';
import * as selectionHelpers from '../helpers/selectionHelpers';
import * as stringHelpers from '../helpers/stringHelpers'

class RenderSelectionTextComponent extends Component {

  componentWillReceiveProps(nextProps) {
    // track when the selections change to prevent false clicks of removals
    if (!_.isEqual(this.props.selections, nextProps.selections)) {
      this.renderTimestamp = Date.now();
    }
  }

  getSelectionText(verseText) {
    const selection = windowSelectionHelpers.getSelectionFromCurrentWindowSelection(verseText);
    this.addSelection(selection);
  }

  addSelection(selection) {
    let {selections, verseText} = this.props;
    selections = selectionHelpers.addSelectionToSelections(selection, selections, verseText);
    // console.log(selections); // this is a good place to preview selections before saved in state
    if (selections.length <= 4) {
      this.props.actions.changeSelectionsInLocalState(selections);
    } else {
      const message = 'Click a previous selection to remove it before adding a new one. To select more than 4 words, highlight phrases instead of individual words.';
      this.props.actions.openAlertDialog(message);
    }
  }

  removeSelection(selection) {
    let {selections, verseText} = this.props;
    selections = selectionHelpers.removeSelectionFromSelections(selection, selections, verseText);
    this.props.actions.changeSelectionsInLocalState(selections);
  }

  inDisplayBox(insideDisplayBox) {
    const { verseText } = this.props;
    this.setState({ inBox: insideDisplayBox });
    if (!insideDisplayBox && Math.abs(window.getSelection().extentOffset - window.getSelection().baseOffset) > 0) {
      this.getSelectionText(verseText);
    }
  }

  verseTextSpans(selections, verseText) {
    let verseTextSpans; // return
    const stringSplices = selectionHelpers.selectionsToStringSplices(verseText, selections);
    verseTextSpans = stringSplices.map((stringSplice, index) => {
      const selectMode = (this.props.mode === "select"); // use selectMode to conditionally use highlight and remove
      let style = { color: 'black' };
      let callback = () => {};
      if (stringSplice.selected) {
        style.backgroundColor = 'var(--highlight-color)';
        if (selectMode) {
          style.cursor = 'pointer'; // only show hand if in select mode
          callback = () => {
            const timePassed = Date.now() - this.renderTimestamp; // see how long between now and last selection
            const isRealClick = timePassed > 100; // if the click happened quicker than 100ms, it was likely false click
            if (isRealClick) this.removeSelection(stringSplice); // actually remove since it was likely a real click
          };
        }
      }

      return (
        <span key={index} style={style} onClick={callback}>
          {stringSplice.text}
        </span>
      );
    });
    return verseTextSpans;
  }

  render() {
    let {verseText, selections} = this.props;
    // normalize whitespace for text rendering in order to display highlights with more than one space since html selections show one space
    verseText = stringHelpers.normalizeString(verseText);
    let verseTextSpans = <span>{verseText}</span>;

    if (selections && selections.length > 0) {
      verseTextSpans = this.verseTextSpans(selections, verseText);
    }
    return (
      <div onMouseUp={() => this.getSelectionText(verseText)} onMouseLeave={() => this.inDisplayBox(false)} onMouseEnter={() => this.inDisplayBox(true)}>
        {verseTextSpans}
      </div>
    );
  }
}

export default RenderSelectionTextComponent;
