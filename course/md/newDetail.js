import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/newdetail.scss";
import MyAjax from "./MyAjax.js";

class NewDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pro:[],
			img:[],
			assess:[],
			gid:this.props.location.query.gid,
			brandId:this.props.location.query.brandId
		}
	}
	componentWillMount(){
		var that = this;
		var url1 = "http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+this.state.gid+"&brandId="+this.state.brandId;
		var url3 = "http://w.lefeng.com/api/neptune/appraise/get_appraise_list/v1?page=1&pageSize=3&scoreLevel=0&spuId=5987404570734593";
		var url2 = "http://w.lefeng.com/api/neptune/handpick_list/v1?stochastic=1&start=1";
		MyAjax.fetch(url1,function(data){
			console.log(data)
			console.log(data.data.goods.pmsList[0].type)
			that.setState({
				img:data.data,
				imgminprice:data.data.goods.priceInfo.minVipPrice,
				imgmaxprice:data.data.goods.priceInfo.minMarketPrice,
				nowprice:data.data.goods.vipshopPrice,
				imgbrandInfo:data.data.brandInfo.name,
				imgbrandInfoimg:data.data.brandInfo.brandImage,
				imglisttype1:data.data.goods.pmsList[0].type,
				imglistmsg1:data.data.goods.pmsList[0].msg,
				imglisttype2:data.data.goods.pmsList[1].type,
				imglistmsg2:data.data.goods.pmsList[1].msg,
				cartlistimg:data.data.goods.allImages[0],
				cartgoodsname:data.data.goods.productName,
				brandStoreName:data.data.goods.brandStoreName,
				goodsid:data.data.goods.gid
			})
		},function(err){
			console.log(err)
		})
		MyAjax.fetch(url2,function(data){
			   
			that.setState({
				pro:data.data
			})
		},function(err){
			console.log(err)
		})
		MyAjax.fetch(url3,function(data){
			   console.log(data)
			   that.setState({
				assess:data.data
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
	tocart(){
		hashHistory.push({
			pathname:"cart",
			query:{
				gid:gid,
				brandId:brandId
			}
		})
	}
	toCart(){
		var isHasGoods = localStorage.getItem("hadcart");
		if(isHasGoods == null){
			hashHistory.push({
			pathname:"cart"
			
		})
		}else{
			hashHistory.push({
			pathname:"cartList",
			
		})
		}
		
	}
	toCartOrLogin(num){
		var that = this;
		var listimg = this.state.cartlistimg;
		var cartgoodsname = this.state.cartgoodsname;
		var brandStoreName = this.state.brandStoreName;
		var goodsprice = this.state.nowprice;
		var  goodsid = this.state.goodsid;
		console.log(goodsid , cartgoodsname);
		
		
		var gid = this.props.location.query.gid;
        var brandId = this.props.location.query.brandId;
		var obj = {
				goodsImgSrc:listimg,
				goodsName:cartgoodsname,
				brandStoreName:brandStoreName,
				goodsprice:goodsprice,
				goodsid:goodsid
		}
		
		var isLogin = localStorage.getItem("isLogin");
		var iscarthasgoods = localStorage.getItem("prob");
		
		
		if(isLogin == null){
			hashHistory.push({
				pathname:"login",
				query:{
					backCart:num
				}
				
			})
		}else{
			
			localStorage.setItem("hadcart","success");
			if(iscarthasgoods == null){
				var proarr = [];
				obj.num = 1;
				proarr.push(obj)
				var prostr = JSON.stringify(proarr);
				localStorage.setItem("prob",prostr);
			}else{
				var nowproarr = JSON.parse(iscarthasgoods);
				var exitflag = that.isexit(obj,nowproarr);
				if(exitflag){
					exitflag.num++;
					
				}else{
					obj.num = 1;
					nowproarr.push(obj);
				}
				var nowproarrstr = JSON.stringify(nowproarr);
				localStorage.setItem("prob",nowproarrstr)
			}
			
		}
		
		
	}
	isexit(currentproduct,arrayy){
			for(var i = 0;i <arrayy.length;i++){
				if(currentproduct.goodsid == arrayy[i].goodsid){
					return arrayy[i];
				}
			}
			return false;
		}
	render(){
			var imgdata = this.state.img;
			var imgminpricedata = this.state.imgminprice;
			var imgmaxpricedata = this.state.imgmaxprice;
			
			var imgbrandInfodata = this.state.imgbrandInfo;
			var imgbrandInfoimgdata = this.state.imgbrandInfoimg;
			var imglisttypedata1=this.state.imglisttype1;
			var imglistmsgdata1=this.state.imglistmsg1;
			var imglisttypedata2=this.state.imglisttype2;
			var imglistmsgdata2=this.state.imglistmsg2;
			
			var assessdata = this.state.assess;
			

			var prodata = this.state.pro;
			
			
			var aee=[];
			var avv=[];
			var abb=[];
			
			
				aee.push(<img src={imgbrandInfoimgdata} key={0}/>)
			
			for(var i in prodata){
				avv.push(
					<div className = "DetailLi" key={i} >
							<img src={prodata[i].goods.image}/>
							<p className="jieshao">{prodata[i].goods.name}</p>
							<div className ="zongshu">
								<span className ="xianjia">￥{prodata[i].goods.vipshopPrice}</span>
								<span className ="yuanjia">￥{prodata[i].goods.marketPrice}</span>
								<span className ="iconfont" onClick = {this.tocart.bind(this)} >&#xe600;</span>
							</div>
					</div>
							)
			}
			for(var i in assessdata){
				abb.push(<li key={i}><p>{assessdata[i].authorName}</p><p>{assessdata[i].content}</p></li>)
			}
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back" onClick ={this.toBack.bind(this)}><i className = "iconfont">&#xe697;</i></div>
						<div className = "title">{imgbrandInfodata}</div>
						<div className = "moreInfo" onClick ={this.tohome.bind(this)}><i className = "iconfont">&#xe6b8;</i></div>
					</div>
				</div>
				<div className = "content" id = "detailcont">
					
					<div className ="topimg"> {aee} </div>
					<div className ="imgxia"> 
						<div className ="proname">{imgbrandInfodata}</div>
						<div className="proprice">
							<span>￥{imgminpricedata}</span>
							<span>￥{imgmaxpricedata}</span>
						</div>

					</div>
					<div className="imgxiaxia">
                        <div className = "xiaone">
                            <span>{imglisttypedata1}</span>
                            <span>{imglistmsgdata1}</span>
                        </div>
                        <div className = "xiatwo">
                            <span>{imglisttypedata2}</span>
                            <span>{imglistmsgdata2}</span>
                        </div>
					</div>
					
					<div className="assesspro">
						<div className = "asstitle">商品评价</div>
						<ul className = "asscont">
							{abb}
						</ul>
					</div>
					<div className="other">浏览本商品的用户还买了</div>
					<div className="Detailpro">
							{avv}
					</div>
				</div>
				<div className ="footer" id="newDtailfooter">
					<div className="sCart" onClick = {this.toCart.bind(this)}><div className = "iconfont">&#xe624;</div></div>
					<div className ="addCart" onClick = {this.toCartOrLogin.bind(this,"1")}>加入购物车</div>
				</div>
			</div>
		)
	}
}
export default NewDetail;