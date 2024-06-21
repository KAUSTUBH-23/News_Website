import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar";
import News from "./Component/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar"
export default class App extends Component {

 state = {
  progress:0
 }
 setProgress=(progress)=>{
  this.setState({
   progress: progress
  })
 }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar 
          height={3}
          color= "#f11946"
          progress={this.state.progress}
          
          />
          <Routes>
            <Route path="/"element={<News setProgress={this.setProgress}   key="general" pageSize={8} country="in" category="general"/>}/>
            <Route path="/Business" element={ <News setProgress={this.setProgress}   key="Business" pageSize={8} country="in" category="Business"/>}/>
            <Route path="/Entertainment" element={<News setProgress={this.setProgress}   key="Entertainment" pageSize={8} country="in" category="Entertainment"/>}/>
            <Route path="/health" element={<News setProgress={this.setProgress}   key="health" pageSize={8} country="in" category="health"/>}/>
            <Route path="/science" element={ <News setProgress={this.setProgress}   key="science" pageSize={8} country="in" category="science"/>}
            />
            <Route path="/sports" element={<News setProgress={this.setProgress}   key="sports" pageSize={8} country="in" category="sports"/>} />
            <Route path="/Technology" element={ <News setProgress={this.setProgress}   key="Technology" pageSize={8} country="in" category="Technology"/>}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
