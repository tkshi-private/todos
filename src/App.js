import React, { Component } from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {observable} from "mobx";
import MobxFirebaseStore from 'mobx-firebase-store';
import {createAutoSubscriber} from 'firebase-nest';
import {observer} from 'mobx-react'

@observable words = new Array();
@observer

const fbApp = firebase.initializeApp({
  apiKey: "AIzaSyAVeQRu8yodwzbdJXBY7AcXxSEoQXYt-8I",
  authDomain: "react-todo-6f008.firebaseapp.com",
  databaseURL: "https://react-todo-6f008.firebaseio.com",
  projectId: "react-todo-6f008",
  storageBucket: "",
  messagingSenderId: "821512865685"
}, "react-todo");

const store = new MobxFirebaseStore(firebase.database(fbApp).ref());

class HelloWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      words: words,
      new: '',
    };
  }

  addWord() {
    words.push(this.state.new);
    this.setState({
        words: words,
        new: '',
    })
  }
  deleteWord(index){
    words.splice(index,1);
    this.setState({
        words: words,
        new: '',
    })
  }

  handleChange(value) {
    this.setState({
        new: value
    });
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.new} onChange={(e) =>this.handleChange(e.target.value)} />
        <input type="submit" value="Add Word" onClick={() => this.addWord()} />
        <ul>
        {this.state.words.map((word,index) => <li>{word}<input type="button" value="Delete Word" onClick={() => this.deleteWord(index)} /></li>)}
        </ul>
      </div>
    );
  }
}

class WordCard extends React.Component {
  deleteWord(index){
    words.splice(index,1);
    alert(words);
    return;
  }

  render(){
    return(
      <div>
        wordcard
      </div>
    )
  }
}

export default HelloWidget;