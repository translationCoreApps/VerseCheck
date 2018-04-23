import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

const IconIndicators = ({
  verseEdited,
  selections,
  commentsReducer,
  remindersReducer,
  translate,
  comment
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Glyphicon
        glyph="ok"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: selections.length > 0 ? 1 : 0.2
        }}
        title={selections.length > 0 ? translate("check.selections_found") : translate("check.no_selections_found")}
      />
       <Glyphicon
        glyph="pencil"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: verseEdited ? 1 : 0.2
        }}
        title={verseEdited ? translate("check.verse_edits_found") : translate("check.no_verse_edits_found")}
      />
       <Glyphicon
        glyph="comment"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: comment && comment.length > 0 ? 1 : 0.2
        }}
        title={comment && comment.length > 0 ? translate("check.comments_found") : translate("check.no_comments_found")}
      />
       <Glyphicon
        glyph="bookmark"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: remindersReducer.enabled ? 1 : 0.2
        }}
        title={remindersReducer.enabled ? translate("check.bookmarked") : translate("check.not_bookmarked")}
      />
    </div>
  );
};

IconIndicators.propTypes = {
  translate: PropTypes.func.isRequired,
  verseEdited: PropTypes.bool.isRequired,
  selectionsReducer: PropTypes.shape({
    selections: PropTypes.array
  }).isRequired,
  commentsReducer: PropTypes.shape({
    text: PropTypes.string
  }).isRequired,
  remindersReducer: PropTypes.shape({
    enabled: PropTypes.bool
  }).isRequired,
};

export default IconIndicators;
