import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import style from '../css/Style'
import {selectionArray, occurrencesInString, normalizeString} from '../utils/selectionHelpers'
import MyLanguageModal from './MyLanguageModal'

class SelectArea extends React.Component {
  constructor() {
    super();
    this.state = {
      inBox: false,
      modalVisibility: false
    }
  }
/*
 * @description
 * Implementation notes on why you can't just use the window.getSelection()
 * getSelection is limited by same innerText node, and does not include span siblings
 * indexOfTextSelection is broken by any other previous selection since it only knows its innerText node.
 */
  getSelectionText() {
    if (!this.props.loginReducer.loggedInUser) {
      this.props.actions.selectModalTab(1, 1, true);
      this.props.actions.openAlertDialog("You must be logged in to make a selection");
      return;
    }
    // windowSelection is an object with lots of data
    let windowSelection = window.getSelection();
    // get the current text selected
    let selectedText = windowSelection.toString();

    // do nothing since an empty space was selected
    if (selectedText === '') {} else {
      // get the text after the presceding selection and current span selection is in.
      let selectionRange = windowSelection.getRangeAt(0)
      // get the character index of what is selected in context of the span it is in.
      let indexOfTextSelection = selectionRange.startOffset;
      // get the container of the selection, this is a strange object, that logs as a string.
      let textContainer = selectionRange.commonAncestorContainer;
      // get the parent span that contains the textContainer.
      let textSpan = textContainer ? textContainer.parentElement : undefined;
      // get all of the text in the selection's container similar to the span's innerText.
      let textSpanContent = textSpan.innerText;
      // get the text presceding the selection but after the selection just prior to it.
      let postPrescedingText = textContainer ? textSpanContent.slice(0,indexOfTextSelection) : '';
      // start with an empty string to prepend to for text presceding current span selection is in.
      let prescedingText = '';
      // if we have a span that holds text, see what presceding text we can extract.
      if (textSpan) {
        // get the previous sibling to start the loop
        let previousSibling = textSpan.previousSibling;
        // loop through previous spans to get their text
        while (previousSibling) {
          // prepend the spans innerText to the prescedingText
          prescedingText = previousSibling.innerText + prescedingText;
          // move to the previous span, if none, it ends the loop
          previousSibling = previousSibling.previousSibling;
        }
      }

      // There can be a gap between prescedingText and current selection
      let textBeforeSelection = prescedingText + postPrescedingText + selectedText;
      // get the occurrence of the selection
      let occurrence = occurrencesInString(textBeforeSelection, selectedText);
      // verseText is used to get all of the occurrences
      let verseText = this.props.verseText;
      // replace more than one contiguous space with a single one since HTML/selection only renders 1
      verseText = normalizeString(verseText);
      // get the total occurrences from the verse
      let occurrences = occurrencesInString(verseText, selectedText);
      let selection = {
        text: selectedText,
        occurrence: occurrence,
        occurrences: occurrences
      };
      // add the selection to the selections
      this.addSelection(selection);
    }
  }

  addSelection(selection) {
    let selections = this.props.selectionsReducer.selections;
    if (selections.length >= 4) {
      this.props.actions.openAlertDialog('Click a previous selection to remove it before adding a new one. To select more than 4 words, highlight phrases instead of individual words.')
      return false
    } else {
      selections.push(selection);
    }
    this.props.actions.changeSelections(selections);
  }

  removeSelection(selection) {
    let selections = this.props.selectionsReducer.selections;
    selections = selections.filter(_selection =>
      _selection.occurrence !== selection.occurrence || _selection.text !== selection.text
    )
    this.props.actions.changeSelections(selections);
  }

  displayText() {
    let { selections } = this.props.selectionsReducer;
    let verseText = this.props.verseText;
    // normalize whitespace for text rendering in order to display highlights with more than one space since html selections show one space
    verseText = normalizeString(verseText);
    let verseTextSpans = <span>{verseText}</span>;
    if (selections && selections.length > 0) {
      let _selectionArray = selectionArray(verseText, selections);
      verseTextSpans = _selectionArray.map((selection, index) =>
        <span key={index} style={selection.selected ? { backgroundColor: 'var(--highlight-color)', cursor: 'pointer' } : {}}
          onClick={selection.selected ? () => this.removeSelection(selection) : () => { }}>
          {selection.text}
        </span>
      )
    }

    if (this.props.mode == "select") {
      return (
        <div onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
          {verseTextSpans}
        </div>
      );
    } else {
      return (
        <div>
          {verseTextSpans}
        </div>
      )
    }

  }

  inDisplayBox(insideDisplayBox) {
    this.setState({ inBox: insideDisplayBox });
    if (!insideDisplayBox && Math.abs(window.getSelection().extentOffset - window.getSelection().baseOffset) > 0) {
      this.getSelectionText()
    }
    window.getSelection().empty();
  }

  render() {
    let {verseText, projectDetailsReducer} = this.props
    // normalize whitespace, since html selections will not include more than 1 contiguous space
    verseText = normalizeString(verseText);
    // validate selections and remove ones that do not apply
    this.props.actions.validateSelections(verseText);
    const { manifest, bookName } = projectDetailsReducer;

    let reference = this.props.contextIdReducer.contextId.reference;
    let bibles = this.props.resourcesReducer.bibles;
    let languageName = manifest.target_language ? manifest.target_language.name : null;
    let modal = <div/>;

    let dir = manifest.target_language ? manifest.target_language.direction : null;

    if (this.state.modalVisibility) {
      modal = (
        <MyLanguageModal
          show={this.state.modalVisibility}
          targetLangBible={bibles.targetLanguage}
          chapter={reference.chapter}
          currentVerse={reference.verse}
          dir = {dir ? dir : "ltr"}
          onHide={
            () => {
              this.setState({modalVisibility: false})
            }
          }
        />
      )
    }

    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={style.verseTitle}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={style.pane.title}>
                {languageName}
              </span>
              <span style={style.pane.subtitle}>
                {bookName} {reference.chapter + ':' + reference.verse}
              </span>
          </div>
          <div onClick={() => {
            this.setState({modalVisibility: true})
          }}>
            <Glyphicon glyph="fullscreen" title="Click to show expanded verses" style={{cursor: "pointer"}}/>
            {modal}
          </div>
        </div>
        <div style={this.props.projectDetailsReducer.params.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
          {this.displayText()}
        </div>
      </div>
    )
  }
}

export default SelectArea
