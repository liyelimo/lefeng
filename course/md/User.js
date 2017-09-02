import React from "react";
import {Link,IndexLink} from "react-router";


class User extends React.Component{
	constructor(props){
		super(props)
	}
	toBack(){
		window.history.go(-1)	
	}
	render(){
		return (
			<div  className = "type">
				<div className="header">
				
					<div onClick = {this.toBack.bind(this)}><i className = "iconfont">&#xe697;</i></div>
					<div>客服</div>
					
				</div>
				<div className = "content" id = "content">
					
				</div>

			</div>
		)
	}
}
export default User;