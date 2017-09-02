import React from "react";
import { Link, IndexLink, hashHistory } from "react-router";
import "./../scss/loginORregister.scss";
import MyAjax from "./MyAjax.js";

class CartList extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			goodsInfo:[],
			sumPeice:[],
			waitpay:[]
		}
	}
	componentWillMount(){
		var that = this;
		var proList = JSON.parse(localStorage.getItem("prob"));
		console.log(proList);
		that.setState({
			goodsInfo:proList
		})
	}
	toBack() {
		window.history.go(-1)
	}
	tocountadd(addIndex){
		var currentAddProArr = JSON.parse(localStorage.getItem("prob"));
		currentAddProArr[addIndex].num++;
		$(".pro").find("li").eq(addIndex).find(".count").html(currentAddProArr[addIndex].num);
		var pri = this.state.goodsInfo[addIndex].goodsprice;
		$(".pro").find("li").eq(addIndex).find(".sumPeice").html(currentAddProArr[addIndex].num*pri);
		var afterAddStr = JSON.stringify(currentAddProArr);
		localStorage.setItem("prob",afterAddStr);
		
	}
	tocountreduce(rdcIndex){
		var currentAddProArr = JSON.parse(localStorage.getItem("prob"));
		var currentGoodsObj = currentAddProArr[rdcIndex];
		if(currentGoodsObj.num>1){
			currentGoodsObj.num--;
		}else{
			currentGoodsObj.num = 1;
		}
		$(".pro").find("li").eq(rdcIndex).find(".count").html(currentGoodsObj.num);
		var pri = this.state.goodsInfo[rdcIndex].goodsprice;
		$(".pro").find("li").eq(rdcIndex).find(".sumPeice").html(currentGoodsObj.num*pri);
		var afterStr = JSON.stringify(currentAddProArr);
		localStorage.setItem("prob",afterStr);
	}
	todel(delIndex){
		var currentAddProArr = JSON.parse(localStorage.getItem("prob"));
		var newArr = currentAddProArr.splice(delIndex,1);
		if(currentAddProArr.length == 0){
			hashHistory.push({
				pathname:"cart"
			})
		}
		var afterStr = JSON.stringify(currentAddProArr);
		localStorage.setItem("prob",afterStr);
		$(".pro").find("li").eq(delIndex).css("display","none");
	}
	render() {
		var that = this;
		var pro = localStorage.getItem("prob");
		var proarr = JSON.parse(pro);
		console.log(proarr);
		
		var data = this.state.goodsInfo;
		
		var arr = [];

		for(var i in proarr) {
				arr.push(
					<li key={i}>
					<img src={proarr[i].goodsImgSrc}/>
					<div className ="imgright" >
						<div><span>{proarr[i].goodsName}</span></div>
						<div>￥{proarr[i].goodsprice}</div>
						<div><div><span className="tocountreduce" onClick = {this.tocountreduce.bind(this,i)}>-</span><span className = "count">{data[i].num}</span><span className="tocountadd" onClick = {this.tocountadd.bind(this,i)}>+</span></div><div className = "todel" onClick = {this.todel.bind(this,i)}>删除</div></div>
						<div className = "total"><span>商品合计:</span><span className="sumPeice">￥{data[i].goodsprice*data[i].num}</span></div>
					</div>
				</li>
				)
			}
		return(
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back" onClick = {this.toBack.bind(this)}><i className = "iconfont">&#xe697;</i></div>
						<div className = "title">购物车</div>
					</div>
				</div>
				<div className = "content" id = "cartListcontent">
					<ul className = "pro">
						{arr}
					</ul>
					
				</div>
				<div className = "footer" id="cartListfooter">
					<div><span>待支付:</span><span>￥298</span></div>
					<div>结算</div>
				</div>
			</div>
		)
	}
	
}
export default CartList;