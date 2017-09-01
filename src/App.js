import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import {observable} from "mobx";
import {observer} from 'mobx-react'

class Todo {
    id = Math.random();
    @observable words = new Array();
    @observable newWords = '';
}

const config = {
  apiKey: "AIzaSyAVeQRu8yodwzbdJXBY7AcXxSEoQXYt-8I",
  authDomain: "react-todo-6f008.firebaseapp.com",
  databaseURL: "https://react-todo-6f008.firebaseio.com",
  projectId: "react-todo-6f008",
  storageBucket: "",
  messagingSenderId: "821512865685"
};
firebase.initializeApp(config);

var todo = new Todo();
var db = firebase.database();
var list = db.ref("/list");
// const store = new MobxFirebaseStore(firebase.database(fbApp).ref());

@observer class HelloWidget extends React.Component {
  constructor() {
    super();
    list.on('child_changed', (snapshot) => {
      var obj = snapshot.val();
      for(var prop in obj){
        todo.words.push(obj[prop]["message"]);
      }
    })
  }

  addWord() {
    var message = todo.newWords;
    // todo.words.push(todo.newWords);
    list.push({message});
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