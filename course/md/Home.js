import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/home.scss";
import MyAjax from "./MyAjax.js";
import search from "./Search.js";

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			page :"1",
			banner: [],
			prolist: []

		}
}
	componentWillMount(){
		var page = this.state.page;
		var that = this;
		var url1 = "http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=320x568&appName=lefeng_android&version=4.1.1";
		
		MyAjax.fetch(url1,function(data){
			console.log(data)     
			that.setState({
				banner:data.data
			})
		},function(err){
			console.log(err)
		})
		
		
		
	}
	tomore(){
		var that= this;
		var page = this.state.page;		
		var list = this.state.prolists;		
		var height=this.refs.cont.scrollHeight;
		var top=this.refs.cont.scrollTop;
		var cha=height-top-474;
		if(cha<200){
		
			page++;
		console.log(page)
			var url2 =  "http://w.lefeng.com/api/neptune/special_brands/v3?page=1&labelType=1";
			MyAjax.fetch(url2,function(data){   
				console.log(data)
			that.setState({
				prolist:data.data
			})
		},function(err){
			console.log(err)
		})			
	}

}
	
	goSearch(){
		hashHistory.push({
			pathname:"/search"
		})
	}
	toDetail(bid){
		console.log(bid)
		hashHistory.push({
			pathname:"/detail",
			query:{
				bid:bid
				
			}
		})
	}
	render(){
		var bannerdata = this.state.banner[478];
		var fourball = this.state.banner[496];
		var jimei    = this.state.banner[724];
		var fenggoubg = this.state.banner[727];
		var xiongmao = this.state.banner[728];
		
		
		var list = this.state.prolist;
		
		var arr=[];
		var att=[];
		var ayy=[];
		var auu=[];
		var app=[];
		var aoo=[];
		
		for(var i in bannerdata){

			arr.push(<div className="swiper-slide" key={i}><img src = {bannerdata[i].sfilename}/></div>)
		}
		for(var j in fourball){
				var that = this;
			att.push(<div key={j} > <img src = {fourball[j].sfilename}/ > </div>)
		}
		for(var k in jimei){

			ayy.push(<div className="swiper-slide" key={k}> <img src = {jimei[k].sfilename}/ > </div>)
		}
		for(var m in fenggoubg){

			auu.push(<div  className = "bgbigpic" key={m}>
				<img src = {fenggoubg[m].sfilename} /> 
				
			</div>)
		}
		for(var i in xiongmao){
			app.push(xiongmao[i].sfilename)
		}
		for(var i in list){
			var that = this;
			aoo.push(
				<div key={i} onClick = {that.toDetail.bind(that,list[i].bid)}>
					<img  src = {list[i].brandImage}/>
					<div><span>{list[i].agio}</span><span> {list[i].name}</span></div>
				</div>
			)
			
		}
	
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "back">乐蜂</div>
						<div className = "title">
						<span onClick = {this.goSearch.bind(this)}><i className = "iconfont">&#xe6ac;</i>静佳集团</span>
						</div>
						<div className = "moreInfo" ><i className = "iconfont">&#xe6b8;</i></div>
					</div>
				</div>
				<div className = "content" id = "content" ref="cont" onScroll = {this.tomore.bind(this)}>
						<div className="swiper-container" id="bannerBox">
						    <div className="swiper-wrapper">
						        {arr}
						    </div>
						    <div className="swiper-pagination"></div>
						</div>
						<div className = "fourball">
							{att}
						</div>
						<div className = "freshman"><img src = "./../img/6.jpg"/ ></div>
						<div className = "guohuo"><img src = "./../img/13.jpg"/ ></div>
						<div className = "wangpai"><img src = "./../img/3.jpg"/ ></div>
						<div className = "jx1"><img src = "./../img/10.jpg"/ ></div>
						<div className = "jx2"><img src = "./../img/33.jpg"/ ></div>
						<div className = "jx3"><img src = "./../img/11.jpg"/ ></div>
						<div className = "jx4"><img src = "./../img/12.jpg"/ ></div>
						<div className = "jimei">
							<div className="swiper-container" id="bannerjimei">
						    	<div className="swiper-wrapper">
						        	{ayy}
						   		</div>
						    <div className="swiper-pagination"></div>
							</div>
						</div>
						<div className = "fenggou"><img src = "./../img/26.jpg"/ ></div>
						<div className = "gbtitle">疯购全球</div>
						<div className = "global">
							{auu}
						</div>
						<div className="swiper-container" id="xiongmao">
							<div className="swiper-wrapper">
								<div className="swiper-slide">
									<div className = "xmone">
										<img  src= {app[0]}/> 
										<img  src= {app[1]}/> 
										<img  src= {app[2]}/> 
										<img  src= {app[3]}/>
										<img  src= {app[4]}/> 
									</div>
								</div>
								<div className="swiper-slide">
									<div className = "xmone">
										<img  src= {app[5]}/> 
										<img  src= {app[6]}/> 
										<img  src= {app[7]}/> 
										<img  src= {app[8]}/>
										<img  src= {app[9]}/> 
									</div>
								</div>
								<div className="swiper-slide">
									<div className = "xmone">
										<img  src= {app[10]}/> 
										<img  src= {app[11]}/> 
										<img  src= {app[12]}/> 
										<img  src= {app[13]}/>
										<img  src= {app[14]}/> 
									</div>
								</div>
							 </div>
							<div className="swiper-pagination"></div>
						</div>
						
						
						<div className = "brtitle">品牌专场</div>
						
						<div className ="brand" >
							{aoo}
						</div>
				</div>
				<div className = "footer" id = "footer">
					<ul>
						<li><IndexLink to="/" >首页</IndexLink></li>
						<li><Link to="/cart" >购物车</Link></li>
						<li><Link to="/login" >登录</Link></li>
						<li><Link to="/register" >注册</Link></li>
					</ul>
				</div>
				
			</div>
		)
	}
	
	componentDidUpdate(){
		var mySwiper = new Swiper("#bannerBox",{
				loop:true,
				autoplay:3000,
				pagination:".swiper-pagination",
				autoplayDisableOnInteraction:false
				
		})
		var mySwiper = new Swiper("#bannerjimei",{
				pagination: '.swiper-pagination',
        		slidesPerView: 3,
        		paginationClickable: true,
        		spaceBetween: 10
				
		})
		var mySwiper = new Swiper("#xiongmao",{
				loop:true,
				pagination:".swiper-pagination",
				autoplayDisableOnInteraction:false
				
		})
		
	}
}


export default Home;