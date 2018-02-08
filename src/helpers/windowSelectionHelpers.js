import * as stringHelpers from './stringHelpers';

/**
 * @description - Gets the selection object from the currently selected text from the Web UI
 * @param {String} entireText - the text that the selection should be in, ie verseText
 * @return {Object} - the selection object to be used
 * TODO: Find a way to test
 */
export const getSelectionFromCurrentWindowSelection = (entireText) => {
  let selection; // response
  const windowSelection = getCurrentWindowSelection();
  const selectedText = getSelectedTextFromWindowSelection(windowSelection);
  const prescedingText = getPrescedingTextFromWindowSelection(windowSelection);
  // Some edge cases leave a weird selection remaining, let's clean up.
  selection = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
  window.getSelection().empty();
  return selection;
};
/**
* @description - Gets the window's Selection from the UI
* @return {Object} windowSelection - a windowSelection object from inside a compatible element
* TODO: Find a way to test
*/
export const getCurrentWindowSelection = () => window.getSelection();
/**
* @description - Gets the window selected text from the windowSelection
* @param {Object} windowSelection - a windowSelection object from inside a compatible element
* @return {String} - selectedText
* TODO: Find a way to test
*/
export const getSelectedTextFromWindowSelection = (windowSelection) => windowSelection.toString();
/**
* @description - Gets the prescedingText from the windowSelection
* @param {Object} windowSelection - a windowSelection object from inside a compatible element
* @return {String} - the string of prescedingText
* Implementation notes on why you can't just use the window.getSelection()
* getSelection is limited by same innerText node, and does not include span siblings
* indexOfTextSelection is broken by any other previous selection since it only knows its innerText node.
* TODO: Find a way to test
*/
export const getPrescedingTextFromWindowSelection = (windowSelection) => {
  let prescedingText; // response
  // concatenate spans etc... to get the prescedingText from the windowSelection
  const selectedText = getSelectedTextFromWindowSelection(windowSelection);
  // do nothing since an empty space was selected
  if (selectedText !== '') {
    // get the text after the presceding selection and current span selection is in.
    const selectionRange = windowSelection.getRangeAt(0);
    // get the character index of what is selected in context of the span it is in.
    const selectionRangeStart = selectionRange.startOffset;
    // get the container of the selection, this is a strange object, that logs as a string.
    const textContainer = selectionRange.commonAncestorContainer;
    // get the parent span that contains the textContainer.

    let element;
    // if the textContainer is #text, then use the parentElement - usually non-overlapping selection
    if ('#text' === textContainer.nodeName) element = textContainer.parentElement;
    // if the textContainer is a span, then use it as the element
    if ('SPAN' === textContainer.nodeName) element = textContainer;
    // if the textContainer is a div, its an overlapping selection, don't use commonAncestorContainer
    if ('DIV' === textContainer.nodeName) element = selectionRange.startContainer.parentElement;
    // check for element, as textContainer can but rarely be something other than #text, span or div
    if (element) {
      prescedingText = getPrescedingTextFromElementAndSiblings(element, selectionRangeStart, windowSelection);
    }
  }
  return prescedingText;
};
/**
 * @description - gets the prescedingText from the element ending at the selectionRangeStart
 * @param {Element} element - the html element that has text and siblings with text
 * @param {Int} selectionRangeStart - the character index of the start of the selection
 * @return {String} - the string of prescedingText
 */
export const getPrescedingTextFromElementAndSiblings = (element, selectionRangeStart, windowSelection) => {
  let prescedingText; // response
  const prescedingTextFromElementSiblings = getPrescedingTextFromElementSiblings(element, windowSelection);
  const prescedingTextFromElement = getPrescedingTextFromElement(element, selectionRangeStart, windowSelection);
  prescedingText = prescedingTextFromElementSiblings + prescedingTextFromElement;
  return prescedingText;
};
/**
 * @description - gets the prescedingText from the element ending at the selectionRangeStart
 * @param {Element} element - the html element that has text
 * @param {Int} selectionRangeStart - the character index of the start of the selection
 * @return {String} - the string of prescedingText
 */
export const getPrescedingTextFromElement = (element, selectionRangeStart) => {
  let prescedingText; // response
  const text = element.textContent;
  prescedingText = text.slice(0, selectionRangeStart);
  return prescedingText;
};
/**
 * @description - gets the prescedingText from the element siblings
 * @param {Element} element - the html element that has text and siblings with text
 * @return {String} - the string of prescedingText
 */
export const getPrescedingTextFromElementSiblings = (element, windowSelection) => {
  let prescedingText = ''; // response
  // get the previous sibling to start the loop
  let previousSibling = element.previousElementSibling;
  // loop through previous spans to get their text
  while (previousSibling) {
    // just in case the previousSibling just happens to be a part of the selection
    if (!windowSelection.containsNode(previousSibling)) {
      // prepend the spans innerText to the prescedingText
      prescedingText = previousSibling.textContent + prescedingText;
    }
    // move to the previous span, if none, it ends the loop
    previousSibling = previousSibling.previousElementSibling;
  }
  return prescedingText;
};
