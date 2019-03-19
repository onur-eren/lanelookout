import React from "react";
import { Link } from 'react-router-dom'
import {
  testGql,
testGqlR
} from "../../redux/report/effects";
import { put, call, select, takeLatest } from "redux-saga/effects";
var co = require('co');


var fn = co.wrap(function* _testGql() {
    try {
        const result = yield call(testGql);
        console.log(result)
    } catch (error) {
        // todo: error handling
        console.error(`ERROR: ${error.message}`)
    }
}
);

var fn2 = co.wrap(function* _testGql() {
    try {
        const result = yield call(testGqlR);
        console.log(result)
    } catch (error) {
        // todo: error handling
        console.error(`ERROR: ${error.message}`)
    }
}
);

const PageHome = () => (
  <div>
    <h1>Home Page</h1>
    <ul>
      <li><Link to="/report">Report Obstruction</Link></li>
      <li><Link to="/nopers">Bad Link</Link></li>
    </ul>
    <a href="#" onClick={fn}>Test</a>
    <br/>
    <a href="#" onClick={fn2}>Test2</a>
  </div>
);

export default PageHome;
