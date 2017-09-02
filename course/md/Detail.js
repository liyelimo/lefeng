import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/detail.scss";
import MyAjax from "./MyAjax.js";

class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pro:[],
			img:[],
			bid:this.props.location.query.bid,
			bannerId:this.props.location.query.bannerId
		}
	}
	componentWillMount(){
		var that = this;
		var url1 = "http://w.lefeng.com/api/neptune/brand/details/v1?brandId="+this.state.bid;
		var url2 = "http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+this.state.bid+"&start=1";
		MyAjax.fetch(url1,function(data){
			console.log(data)
			
			
			that.setState({
				img:data.data
			})
		},function(err){
			console.log(err)
		})
		MyAjax.fetch(url2,function(data){
			console.log(data)     
			that.setState({
				pro:data.data
			})
		},function(err){
			console.log(err)
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
	tonewdetail(gid,brandId){
		console.log(gid,brandId)
		hashHistory.push({
			pathname:"/detail/newdetail",
			query:{
				gid:gid,
				brandId:brandId
			}
		})
	}
	
	render(){
			var imgdata = this.state.img;
			var prodata = this.state.pro;
			
			
			var aee=[];
			var avv=[];
			
			
				aee.push(<img src={imgdata.brandImage} key={0}/>)
			
			for(var i in prodata){
				avv.push(
					<div className = "DetailLi" key={i} onClick = {this.tonewdetail.bind(this,prodata[i].goods.gid,prodata[i].goods.brandId)}>
							<img src={prodata[i].goods.image}/>
							<p className="jieshao">{prodata[i].goods.name}</p>
							<div className ="zongshu">
								<span className ="xianjia">￥{prodata[i].goods.vipshopPrice}</span>
								<span className ="yuanjia">￥{prodata[i].goods.marketPrice}</span>
								<span className ="iconfont" >&#xe600;</span>
							</div>
					</div>
							)
			}
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back" onClick ={this.toBack.bind(this)}><i className = "iconfont">&#xe697;</i></div>
						<div className = "title">{imgdata.brandName}</div>
						<div className = "moreInfo" onClick ={this.tohome.bind(this)}><i className = "iconfont">&#xe6b8;</i></div>
					</div>
				</div>
				<div className = "content" id = "detailcont">
					
					<div className ="topimg"> {aee} </div>
					<div className ="beizhu"> 满100减50上不封顶</div>
					<div className="fenlei">
						<span>价格</span><span>销量</span><span>筛选</span>
					</div>
					<div className="Detailpro">
							{avv}
					</div>
				</div>

			</div>
		)
	}
}
export default Detail;