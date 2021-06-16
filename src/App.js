import logo from './logo.svg';
import React, { Component } from 'react';
import {useRef} from "react";
import './App.css';
import {Provider} from 'react-redux';
import {useSelector,connect} from "react-redux";
import {createStore} from 'redux';
import { render } from '@testing-library/react';
import { ADD_Ticket, change_status, Enable_pro,goal_dis,intial,send_message } from "./actionTypes";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
 var ticketname="";
  var selected="";
  var RecentMessage="";
  var messages=["","",""];
var initialState = {
  id: 0,
  title:"New Task",
  asignee:"mohammad",
  status:"new",
  Goal:"",
  proceed:true,
  text_Length:25,
  conversation:true,
  Message:RecentMessage,
  problems: [
    {
      Message: "" // string
      
    }
  ]
};


function reducer(state = initialState,action){
  switch(action.type){
    case ADD_Ticket: {
      return{
        ...state,
        id:1,
        title: ticketname,
        Goal: selected,
        conversation: false,
        Message:RecentMessage,
        
      }
    }
    case Enable_pro:{
      var x = ticketname.length;
        
        if (ticketname.length>=1&&ticketname.length<=25){
          return{
            ...state,
            title:ticketname,
            text_Length: ticketname.length,
            proceed: false
          }
        
        }
        else{
          return{
            ...state,
            text_Length :x,
            proceed: true
          }
        }
        
        
    }
    case intial:{
      return{
        ...state
      }
    }
    case goal_dis:{
      return{
        ...state,
        Goal: selected
      }
    }
    case send_message:{
      return{
        ...state,
        Message:RecentMessage,
        //problems:[...problems,{Message:RecentMessage}]

      }
    }

  }
}
const ADDTicket = () =>{
  return{ 
    type : ADD_Ticket

  };
};
const EnablePro = () =>{
  return{
    type : Enable_pro
  };
};
const Intial = () =>{
  return{

    type : intial
  };
};
const Goaldis=() =>{
  return{
    type : goal_dis
  }
}
const Send_message= () =>{
  return{
    type : send_message
  }
}

function Map() {
  const title1 =useSelector(state=>state.title);
  return <>{title1}</>
}

const Store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  
  constructor(props) {
    super(props);
    this.setState({
      sent:messages
    });
    
    
  }
  
  state={
    title: "Complaint title",
    text_length:25,
    proceed:true,
    Proceedselect:false,
    conv : true,
    Msg:"",
    MsgnotSent:true,
    info:""

  }
  delta = (event) => {
    ticketname = event.target.value
    Store.dispatch(EnablePro());
    var y =select(Store.getState())
    var pro= Store.getState().proceed;
    this.setState({
        text_Length: 25-y,
        proceed: pro
        
    });
  }
  handleButton = (event) => {
    var goal = Store.getState().Goal;
    if(goal=!""){
      Store.dispatch(ADDTicket());
      var conv = Store.getState().conversation;
      var name = Store.getState().title;
      this.setState({
        title:name,
        conv:conv
      });
    }

  }
  handleList = (event) => {
    selected = event.target.value;
    Store.dispatch(Goaldis());
  }
  
  _handleKeyDown= (event) =>{
    if (event.key === 'Enter') {
      RecentMessage= event.target.value;
      if(RecentMessage!==""){
        Store.dispatch(Send_message());
        this.setState({
          Msg:RecentMessage,
          MsgnotSent:false,
          conv:true,
          info:"PLease wait for support to respond to your message"
        });
      }
    }

  }
  componentDidMount() {
    Store.dispatch(Intial());
    var x = select(Store.getState());
    this.setState({
      text_Length:x
    })
  }
  render(){
    const update =() =>{
      var x =select(Store.getState());
      this.setState({
        text_Length:x
      }
      );
    }
  return (
  <Provider store={Store}> 
  <div className="full">
    <div className="row" >
      <div className="taskbar">
        <text></text>
      </div>
      <div className="classify">
        <div className= "padd"></div>
        <header className="header">Complaint</header>
        <div className= "padd"></div>
        <text className="classifytext">What is your problem?</text>
        <div className="padd"></div>
        <Select defaultValue="" native label="Problem" onChange={this.handleList} >
          <option value="">select</option>
          <option value="Need a refund">Need a refund</option>
          <option value="Cancel an account">Cancel an account</option>
          <option selected value="Payment issue">Payment issue</option>
          <option value="delivery issue">Delivery issue</option>
        </Select>
        <div className="padd"></div>
        <text className="classifytext">Briefly describe your problem</text>
        <div className="padd"></div>
        <TextField label="Problem" id ="name" name="name" className="select" onChange={this.delta}></TextField>
        <div className="padd"></div>
        <text className="classifytext">Characters left: </text>
        <text style={{color: this.state.text_Length < 0 ? "red" : "green" }}>{this.state.text_Length}</text>
        <div className="buttonDIV">
        <Button disabled={this.state.proceed} variant="outlined" size="large" color="primary" onClick={this.handleButton}>proceed</Button>
        </div>
      </div>
      <div className="message"><header className="ticketname">{this.state.title}</header></div>
      
     <div className="padd"></ div>
     
     <div className="padd"></ div>
     <div className="root"><Card disabled={this.state.MsgnotSent}  variant="outlined">
      <CardContent>{this.state.Msg}</CardContent>
      </Card>
      <label className="Labelalert" disabled={this.state.MsgnotSent}>{this.state.info}</label>
      </div>
     <div className="msginputdiv">
     <TextField
          id="standard-full-width"
          label="Message"
          style={{ margin: 8 }}
          placeholder="Type your message to support"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          disabled={this.state.conv}
          onKeyDown={this._handleKeyDown}
        />
     </div>
    </div>
    </div>
    </Provider> 
  );
  }
  
}

const mapStateToProps = state => {
  return {
    text_Length: state.text_Length
  };
};
 connect(mapStateToProps)(App);
export default App;
function select(state) {
  return state.text_Length;
}
