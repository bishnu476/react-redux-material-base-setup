import React, { Component } from 'react';
import * as testAction from './redux/modules/test';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';


import theme from '../src/material_ui_raw_theme_file';
import { Container, Button , TextField} from '@material-ui/core';
import MainHeader from './components/Header/MainHeader';

class App extends Component {
  constructor() {
    super();
    this.state= {
      title: 'Before',
      name: ''
    }
  }

  changeName= (e)=>{
    console.log(e);
    this.setState({
      name : e.target.value
    },()=>{
      console.log('this.state.name',this.state.name)
    })
  };
  clickedButton = async ()=>{
    try{
      const setName = await this.props.callChangeName(this.state.name)
    }
    catch (e) {

    }
  };
  render() {
    const { inputName } = this.props;
    console.log(name);
    const {title,nameInput} = this.state;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container >
          <MainHeader title={title} />
          <TextField value={this.state.name} onChange={this.changeName} />
          <Button onClick={()=>this.clickedButton()} color="primary" variant="contained" > Change Name</Button>

          <h2>{inputName}</h2>


        </Container>
      </ThemeProvider>
      );
  }
}

App.propTypes = {
};

const mapStateToProps = state => ({
  inputName: state.testData.name,
  email: state.testData.email,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        ...testAction,
      },
      dispatch,
    ),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
