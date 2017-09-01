import React, { Component } from 'react';
import './App.css';
import {observable} from "mobx";
import MobxFirebaseStore from 'mobx-firebase-store';
import {createAutoSubscriber} from 'firebase-nest';
import {observer} from 'mobx-react'

class Todo {
    id = Math.random();
    @observable words = new Array();
    @observable newWords = '';
}

// const fbApp = firebase.initializeApp({
//   apiKey: "AIzaSyAVeQRu8yodwzbdJXBY7AcXxSEoQXYt-8I",
//   authDomain: "react-todo-6f008.firebaseapp.com",
//   databaseURL: "https://react-todo-6f008.firebaseio.com",
//   projectId: "react-todo-6f008",
//   storageBucket: "",
//   messagingSenderId: "821512865685"
// }, "react-todo");

var todo = new Todo();
// const store = new MobxFirebaseStore(firebase.database(fbApp).ref());

@observer class HelloWidget extends React.Component {
  constructor() {
    super();
  }

  addWord() {
    todo.words.push(todo.newWords);
    todo.newWords = '';
  }
  deleteWord(index){
    todo.words.splice(index,1);
    todo.newWords = '';
  }

  handleChange(value) {
    todo.newWords = value;
  }

  render() {
    return (
      <div>
        <input type="text" value={todo.newWords} onChange={(e) =>this.handleChange(e.target.value)} />
        <input type="submit" value="Add Word" onClick={() => this.addWord()} />
        <ul>
          {todo.words.map((word,index) => <li>{word}<input type="button" value="Delete Word" onClick={() => this.deleteWord(index)} /></li>)}
        </ul>
      </div>
    );
  }
}

export default HelloWidget;