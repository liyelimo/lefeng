import React from "react";
import ReactDOM from "react-dom";
import {Route,Router,Link,hashHistory,IndexRoute} from "react-router";
import "./scss/main.scss";
import "./scss/home.scss";

import App from "./md/App.js";

import Home from "./md/Home.js";
import Cart from "./md/Cart.js";
import User from "./md/User.js";
import Login from "./md/Login.js";
import Register from "./md/Register.js";
import Search from "./md/Search.js";
import Detail from "./md/Detail.js";
import NewDetail from "./md/NewDetail.js";
import Jump from "./md/Jump.js";
import cartList from "./md/cartList.js";

ReactDOM.render((
	<Router history = {hashHistory}>
		<Route path = "/" component = {App}>
			<IndexRoute  components = {{type:Home}}/>
			<Route path = "cart" components = {{type:Cart}}/>
			<Route path = "user" components = {{type:User}}/>
			<Route path = "login" components = {{type:Login}}/>
			<Route path = "register" components = {{type:Register}}/>
		</Route>
		<Route path = "/search" component = {Search}></Route>	
		<Route path = "/detail" component = {Detail}></Route>
		<Route path = "/detail/newdetail" component = {NewDetail}></Route>
		<Route path = "/search/jump" component = {Jump}></Route>
		<Route path = "cartlist" component = {cartList}></Route>
	</Router>
),document.getElementById("app"))
