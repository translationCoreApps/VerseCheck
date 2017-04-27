import React from 'react'
import {Col} from 'react-bootstrap'

import SelectArea from './SelectArea'
import DirectionsArea from './DirectionsArea'
import EditVerseArea from './EditVerseArea'
import CommentArea from './CommentArea'

let CheckArea = (props) => {
  let modeArea
  switch(props.mode) {
    case 'edit':
    modeArea = <EditVerseArea
      tags={props.tags}
      verseText={props.verseText}
      verseChanged={props.verseChanged}
      actions={props.actions}
      dir = {props.projectDetailsReducer.manifest.target_language.direction} />
    break
    case 'comment':
    modeArea = <CommentArea comment={props.comment} actions={props.actions} />
    break
    case 'select':
    modeArea = <DirectionsArea quote={props.contextIdReducer.contextId.quote} />
    break
    default:
    modeArea = <DirectionsArea quote={props.contextIdReducer.contextId.quote} />
  }

  return (
    <div style={{fontSize: '1.1em'}}>
      <Col sm={6} style={{ paddingTop: '5px' }}>
        <SelectArea {...props} />
      </Col>
      <Col sm={6} style={{ borderLeft: '1px solid #ccc', height: '100%', paddingTop: '5px' }}>
        {modeArea}
      </Col>
    </div>
  )
}

module.exports = CheckArea
