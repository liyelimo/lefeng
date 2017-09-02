import React from "react";
import {Link,IndexLink} from "react-router";
import "./../scss/detail.scss";
import MyAjax from "./MyAjax.js";


class Jump extends React.Component{
	constructor(props){
		super(props);
		this.state={
			oipt:this.props.location.query.oipt,
			pro:[]
		}
	}
	componentWillMount(){
		var that = this;
		var url = "http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+this.state.oipt;
		MyAjax.fetch(url,function(data){
			console.log(data)	
			
			that.setState({
				pro:data.data
			})
		},function(err){
			console.log(err)
		})
	}
	
	toBack(){
		window.history.go(-1)	
	}
	render(){
		
		var prodata = this.state.pro;
		var ass=[];
		for(var i in prodata){
			ass.push(
				<div className = "JumpLi" key={i} >
							<img src={prodata[i].goods.image}/>
							<div className = "rightside">
								<p>{prodata[i].goods.brandStoreName}</p>
								<p>{prodata[i].goods.productName}</p>
								<p>已售:{prodata[i].goodsStock.saled}</p>

								<div className ="zongshu">
									<span className ="xianjia">￥{prodata[i].goods.vipshopPrice}</span>
									<span className ="yuanjia">￥{prodata[i].goods.marketPrice}</span>
									<span className ="iconfont" >&#xe600;</span>
								</div>
							</div>
					</div>
			)
		}
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "title">
							<input type="text" placeholder = "搜索商品" />
						</div>
							<div className = "console" >取消</div>
							<div className = "moreInfo" onClick = {this.toBack.bind(this)}><i className = "iconfont">&#xe715;</i></div>
						
					</div>
				</div>
				<div className = "content" id = "Jumpcont">
					<ul className ="Jumppro">
						{ass}
					</ul>
					
				</div>
			</div>
		)
	}
}
export default Jump;