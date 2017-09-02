import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/loginORregister.scss";
import MyAjax from "./MyAjax.js";
class Register extends React.Component{
	constructor(props){
		super(props);
	}
	

	tobtn(){
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
								status:"register",
								userID:userID,
								password:password
							},
							dataType:"JSON"
						}
			MyAjax.zeptoAjax(userObj,function(data){
							if(data == "0"){
								alert("用户名重名")
							}else if(data == "1"){
								alert("注册成功")
								hashHistory.push({
									pathname:"login"
								})
							}else{
								alert("注册失败")
							}
						})
		}
		}
	tologin(){
			hashHistory.push({
				pathname:"login"
						})
	}
	toBack(){
		window.history.go(-1)	
	}
	render(){
		return(
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back" onClick = {this.toBack.bind(this)}><i className = "iconfont">&#xe697;</i></div>
						<div className = "title">注册</div>
					</div>
				</div>
				<div className = "content" id = "content">
					<input type="text" id="userId" placeholder = "手机号" />
					<input type="password" id ="pwd" placeholder = "密码" />
					<input type="submit" className="btn" value="注册" onClick = {this.tobtn.bind(this)}/>
				</div>

			</div>
		)
	}
}
export default Register;