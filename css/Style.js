var style = {
  pane: {
    contentLTR: {
      overflowY: 'auto',
      direction: 'ltr',
      flex: 'auto',
      padding: '0 15px 10px'
    },
    contentRTL: {
      overflowY: 'auto',
      direction: 'rtl',
      flex: 'auto',
      padding: '0 15px 10px'
    },
    title: {
      fontWeight: 'bold'
    },
    subtitle:{
      color: "var(--text-color-light)"
    }
  },
  verseCheck: {
    flex: '2 0 280px',
    margin: '10px'
  },
  verseCheckCard: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 10px var(--background-color)',
    borderRadius: '2px'
  },
  titleBar: {
    flex: '0 0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    color: 'var(--reverse-color)',
    backgroundColor: 'var(--accent-color-dark)',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  actionsArea: {
    flex: '0 0 55px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  checkArea: {
    flex: '1 0 130px',
    display: 'flex',
    fontSize: '1.1em',
    borderBottom: '1px solid var(--border-color)'
  },
  verseTitle: {
    flex: '0 0 45px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 10px 5px 15px'
  },
  saveArea: {
    flex: '0 0 55px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '-10px'
  },
  directionsArea: {
    padding: '10px',
    textAlign: 'center'
  },
  commentArea: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 15px 0 15px'
  },
  editArea: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 15px 0 15px'
  }
};

module.exports = style;
