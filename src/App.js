import React, { useState } from 'react';
import './style.css';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
// Provider는 상태(state)들을 어떤 컴포넌트들에게 제공할 것인가에 대한 울타리를 제공하는 컴포넌트이다.
// useSelector는 어떤 상태(state)값을 사용할 것인지 선택한다.
// useDispatch는 상태값을 변경시킬 때 사용한다.

function reducer(currentState, action) {
  // reducer는 store안에 있는 state를 어떻게 바꿀 것인가 결정한다.
  if (currentState === undefined) {
    // currentState의 값이 없을 때
    return {
      number: 1,
    };
  }
  const newState = { ...currentState };
  if (action.type === 'PLUS') {
    newState.number++;
  }
  return newState;
}

const store = createStore(reducer);

export default function App() {
  return (
    <div id="container">
      <h1 class="root">Root </h1>
      <div id="grid">
        <Provider store={store}>
          {/* 이제부터 아래 컴포넌트들은 store를 사용할 수 있다 */}
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div>
  );
}

function Left1(props) {
  return (
    <div id="container">
      <h1>Left1 : </h1>
      <Left2></Left2>
    </div>
  );
}

function Left2(props) {
  console.log('2');

  return (
    <div id="container">
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  );
}

function Left3(props) {
  console.log('left 3');

  const number = useSelector((state) => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}

function Right1(props) {
  return (
    <div id="container">
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}

function Right2(props) {
  return (
    <div id="container">
      <h1>Right2</h1>
      <Right3></Right3>
    </div>
  );
}

function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div id="container">
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}
      />
    </div>
  );
}
