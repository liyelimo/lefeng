import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/loginORregister.scss";
import MyAjax from "./MyAjax.js";
class Login extends React.Component{
	constructor(props){
		super(props)
	}
	toBtn(){
		var istel = false;
			var ispwd = false;
			var userID = $("#userId").val();
			var password    = $("#pwd").val();
			var patrn=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			if(!patrn.test(userID)){
				alert("手机号格式错误");
				istel = false;
			}else{
				istel = true;
			}
			if(password =""){
			alert("密码格式错误");
			ispwd = false;
		}else{
			ispwd = true;
		}
		if(istel==true && ispwd == true){
			var userObj= {
							url:"http://datainfo.duapp.com/shopdata/userinfo.php",
							data:{
								status:"login",
								userID:userID,
								password:password
							},
							dataType:"JSON"
						}
						
						MyAjax.zeptoAjax(userObj,function(data){
							if(data == "0"){
								alert("查无此人")
							}else if(data == "2"){
								alert("密码错误")
							}else{
								//存储一个登录状态
								localStorage.setItem("isLogin","1");
								localStorage.setItem("userID",userID);
								hashHistory.push({
									pathname:"/"
								})
			}
		})
	}
}
	toRegister(){
		hashHistory.push({
			pathname:"register"
		})
	}
	tohome(){
		hashHistory.push({
			pathname:"/"
		})
	}
	toBack(){
		window.history.go(-1)	
	}
	render(){
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back" onClick ={this.toBack.bind(this)} ><i className = "iconfont">&#xe697;</i></div>
						<div className = "title">登录</div>
						
						<div className = "moreInfo" onClick ={this.tohome.bind(this)} ><i className = "iconfont">&#xe6b8;</i></div>
					</div>
				</div>
				<div className = "content" id = "content">
					<input type="text" id="userId" placeholder = "已验证手机/用户名/邮箱"/>
					<input type="password" id ="pwd" placeholder = "密码"/>
					<button className="btn" onClick = {this.toBtn.bind(this)}>登录</button>
					<div className ="liji"><span onClick = {this.toRegister.bind(this)}>立即注册</span><span>忘记密码</span> </div>
				</div>

			</div>
		)
	}
}
export default Login;