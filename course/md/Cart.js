import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/loginORregister.scss";
import MyAjax from "./MyAjax.js";

class Cart extends React.Component{
	constructor(props){
		super(props);
		
	}
	componentWillMount(){
		var that = this;
	
	}
	toBack(){
		window.history.go(-1)	
	}
	tohome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	render(){
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back" onClick = {this.toBack.bind(this)}><i className = "iconfont">&#xe697;</i></div>
						<div className = "title">购物车</div>
					</div>
				</div>
				<div className = "content" id = "cartcontent">
						<div><img src="https://h5rsc-ssl.vipstatic.com/lefeng/build/95273634c5d04a4370aece678ba5155e.png"/> </div>
						<div>购物车为空哦~</div>
						<div>赶紧抢点东西犒劳自己吧~</div>
						<div onClick = {this.tohome.bind(this)}><span>去首页逛逛</span></div>
				</div>

			</div>
		)
	}
}
export default Cart;