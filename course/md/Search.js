import React from "react";
import {Link,IndexLink,hashHistory} from "react-router";
import "./../scss/home.scss";
import MyAjax from "./MyAjax.js";

class Search extends React.Component{
	constructor(props){
		super(props);
		this.state={
			hot:[],
			searchli:[]
		}
	}
	
	componentWillMount(){
		var that = this;
		var url = "http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1";
		
		
		MyAjax.fetch(url,function(data){
			console.log(data)
			that.setState({
				hot:data.data
			})
		},function(err){
			console.log(err)
		})
		
		
	}
	toConsole(){
		hashHistory.push({
			pathname:"/"			
		})
		
	}
	tosearchMore(){
		var amm=[];
		var that= this;
		var ipt = $("input").val();
		var searchword = $(".searchword");
		var url2 = "http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword="+ipt+"&count=15";
		
		MyAjax.fetch(url2,function(data){
			console.log(data.data)
			that.setState({
				searchli:data.data
			})
		},function(err){
			console.log(err)
		})
		if(ipt!==""){
			searchword.css("display","block");
		}else{
			searchword.css("display","none");
		}
	}
	toJump(ipt){
		var searchword = document.getElementById("searchword");
		var li = searchword.getElementsByTagName("li");
		searchword.addEventListener("tap",function(event){
			var target = event.target;
			var ipt = target.innerHTML;
			$("input").val(ipt);
			searchword.style.display="none";
		})
		
		hashHistory.push({
			pathname:"/search/jump",
			query:{
				oipt:ipt
			}
		})
		console.log(ipt)
	}
	
	render(){
		var that = this;
		var hotword = this.state.hot;
		
		console.log(hotword)
		var aee=[];
		var amm=[];
		var iptdata = this.state.searchli;
	for(var i in iptdata){
			amm.push(<li key={i} onClick = {this.toJump.bind(this,iptdata[i])}>{iptdata[i]}</li>)
		}
		for(var i in hotword){
			aee.push(<li key={i} className = "active" onClick = {this.toJump.bind(this,hotword[i].word)} >{hotword[i].word}</li>)
		}
		
		
		return (
			<div  className = "type">
				<div className="header">
					<div className = "commonHeader">
						<div className = "title">
						<input type="text" placeholder = "搜索商品" onChange ={this.tosearchMore.bind(this)}/>
						</div>
						<div className = "console" onClick = {that.toConsole.bind(that)}>取消</div>
						<div className = "moreInfo"><i className = "iconfont">&#xe715;</i></div>
					</div>
					<div className = "content" id = "content">
						<ul className="searchword" id="searchword">
								{amm}
							</ul>
						<div className = "searchtitle">大家都在搜</div>
						<ul className = "hotword" id = "hotword">{aee}</ul>
					</div>
				</div>
			</div>

		)
	}
	
	componentDidMount(){
		var searchword = document.getElementById("searchword");
		var li = searchword.getElementsByTagName("li");
		searchword.addEventListener("tap",function(event){
			var target = event.target;
			var ipt = target.innerHTML;
			$("input").val(ipt);
			searchword.style.display="none";
		})
		
		
	}
}




export default Search;