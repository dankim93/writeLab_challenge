import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions/data_actions';
import PieGraph from './components/pie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio1: "checked"
    };
  }

  componentDidMount() {
    this.props.receiveAll();
    // this.props.receive2015();
    // this.props.receive2016();
  }

  calculateTotalStudents() {
    let students = {
      "English 1A: Freshman Composition": 0,
      "English 1B: Argument & Analysis": 0,
      "English 1C: Applied Composition": 0
    };

    for(let i = 0; i < this.props.classes.length; i++) {
      students[this.props.classes[i].course] += this.props.classes[i].students;
    }

    return students;
  }

  render() {
    return (
      <section className="container">
          <span>
            <label>Years:</label>
            <input type="radio" name='year' onClick={this.props.receiveAll} />
            <label>All</label>
            <input type="radio" name='year' onClick={this.props.receive2015}/>
            <label>2015</label>
            <input type="radio" name='year' onClick={this.props.receive2016}/>
            <label>2016</label>
          </span>
          <PieGraph classes={this.props.classes} students={this.calculateTotalStudents()}/>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({...actions}, dispatch);
};

const mapStateToProps = ({classes}) => {
  return {
    classes: classes
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
