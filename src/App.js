import React, { Component } from 'react';
import * as TodoActions from './redux/modules/flowvityStates';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '../src/material_ui_raw_theme_file';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor() {
    super();
  }

  clickedButton = ()=>{

  };
  render() {
    const { title, agentSelect, actions } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        Hello
      </ThemeProvider>

      );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    agentSelect: state.agentSelect
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
