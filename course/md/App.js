import React from "react";
import {Link,IndexLink} from "react-router";
import "./../scss/main.scss";
import "./../scss/home.scss";

class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div id="container">
				{this.props.type}
				<div className = "gowu"><i className = "iconfont">&#xe623;</i></div>
				<div className = "dingbu"><i className = "iconfont">&#xe63a;</i></div>
			</div>
		)
	}
}
export default App;