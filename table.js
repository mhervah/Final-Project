var allAtt=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
var allDef=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
var allRat=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
var points ={};
var pointsArr=[];
var tableArr = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
var table ={};
var link="Team Logos/";
var logos = {
	"Brighton & Hove Albion" : link+"brighton.png",
	"Manchester City FC":link+ "manchester-city.png",
	"Chelsea FC":link+"chelsea.png",
	"Tottenham Hotspur FC": link+"spurs.png",
	"Manchester United FC":link+"manchester-united.png",
	"Arsenal FC":link+"arsenal.png",
	"Liverpool FC":link+"liverpool.png",
	"Burnley FC":link+"burnley.png",
	"Leicester City FC":link+"leicester-city.png",
	"Watford FC":link+"watford.png",
	"AFC Bournemouth":link+"bournemouth.png",
	"Newcastle United FC":link+"newcastle-united.png",
	"Stoke City FC":link+"stoke-city.png",
	"Everton FC":link+"everton.png",
	"Southampton FC":link+"southampton.png",
	"Crystal Palace FC":link+"crystal-palace.png",
	"Swansea City FC":link+"swansea.png",
	"West Ham United FC":link+"west-ham.png",
	"West Bromwich Albion FC":link+"west-brom.png",
	"Huddersfield Town":link+"huddersfield.png"
};

var shortNames = {
	"Brighton & Hove Albion" : "BHA",
	"Manchester City FC": "MCI",
	"Chelsea FC":"CHE",
	"Tottenham Hotspur FC": "TOT",
	"Manchester United FC":"MUN",
	"Arsenal FC":"ARS",
	"Liverpool FC":"LIV",
	"Burnley FC":"BUR",
	"Leicester City FC":"LEI",
	"Watford FC":"WAT",
	"AFC Bournemouth":"BOU",
	"Newcastle United FC":"NEW",
	"Stoke City FC":"STK",
	"Everton FC":"EVE",
	"Southampton FC":"SOU",
	"Crystal Palace FC":"CRY",
	"Swansea City FC":"SWA",
	"West Ham United FC":"WHU",
	"West Bromwich Albion FC":"WBA",
	"Huddersfield Town":"HUD"
};

var progress=[];
var request = new Request('http://api.football-data.org/v1/competitions/426/leagueTable', {
	method: 'GET', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'X-Auth-Token': 'e03be7e683974813b40a35499aee2299'
	})
});
var request1 = new Request('http://api.football-data.org/v1/competitions/427/leagueTable', {
	method: 'GET', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'X-Auth-Token': 'e03be7e683974813b40a35499aee2299'
	})
});

var request2 = new Request('https://api.football-data.org//v1/competitions/445/fixtures', {
	method: 'GET', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'X-Auth-Token': 'e03be7e683974813b40a35499aee2299'
	})
});
var request3 = new Request('https://api.football-data.org//v1/competitions/445/leagueTable', {
	method: 'GET', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'X-Auth-Token': 'e03be7e683974813b40a35499aee2299'
	})
});

fetch(request)
	.then((resp) => resp.json())
	.then(function(data) {

		for(var i=0;i<17;i++){
		
		allAtt[0][data["standing"][i]["teamName"]]=Number((data["standing"][i]["goals"]/38).toFixed(2));

		allDef[0][data["standing"][i]["teamName"]]=Number((data["standing"][i]["goalsAgainst"]/38).toFixed(2));

		allRat[0][data["standing"][i]["teamName"]]=(Number((((2.5+(allAtt[0][data["standing"][i]["teamName"]]-allDef[0][data["standing"][i]["teamName"]]))*100)/5).toFixed(1)));

		table[data["standing"][i]["teamName"]]=i;

		tableArr[i].teamname=data["standing"][i]["teamName"];
	}
	fetch(request1)
	.then((resp) => resp.json())

	.then(function(data) {

		for(var i=0;i<4;i++){
			if(i==2)
				continue;

		if(i===3){
			allAtt[0][data["standing"][i]["teamName"]]=Number((data["standing"][i]["goals"]/38/2).toFixed(2));
			
			allDef[0][data["standing"][i]["teamName"]]=Number((data["standing"][i]["goalsAgainst"]/38*1.5).toFixed(2));
		}
		else{
			allAtt[0][data["standing"][i]["teamName"]]=Number((data["standing"][i]["goals"]/38/2).toFixed(2));
				
			allDef[0][data["standing"][i]["teamName"]]=Number((data["standing"][i]["goalsAgainst"]/38*1.75).toFixed(2));
		}
		if(i===3){
			table[data["standing"][i]["teamName"]]=i+16;
			tableArr[i+16].teamname=data["standing"][i]["teamName"];
			allRat[0][data["standing"][i]["teamName"]]=Number((((2.5+(allAtt[0][data["standing"][i]["teamName"]]-allDef[0][data["standing"][i]["teamName"]]))*100)/5).toFixed(1));
		}
		else{
			table[data["standing"][i]["teamName"]]=i+17;
			tableArr[i+17].teamname=data["standing"][i]["teamName"];
			allRat[0][data["standing"][i]["teamName"]]=Number((((2.5+(allAtt[0][data["standing"][i]["teamName"]]-allDef[0][data["standing"][i]["teamName"]]))*100)/5).toFixed(1));
		}		
	}
	fetch(request3)
		.then((resp) => resp.json())

		.then(function(data) {
			for(let i=0;i<20;i++)
				for(let j=0;j<20;j++)
				{
					if(data["standing"][i]["teamName"]==tableArr[j].teamname){
						tableArr[j].points=data["standing"][i]["points"];
						tableArr[j].goalDif=data["standing"][i]["goalDifference"];
						tableArr[j].won=data["standing"][i]["wins"];
						tableArr[j].drawn=data["standing"][i]["draws"];
						tableArr[j].lost=data["standing"][i]["losses"];
					}
						
				}
			fetch(request2)
			.then((resp) => resp.json())

			.then(function(data) {
				var i=0;
				while(data['fixtures'][i]['status']==="FINISHED")
				{
					var homeTeamAtt=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]+allDef[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]).toFixed(2))/2;
					if(data['fixtures'][i]['result']['goalsHomeTeam']>homeTeamAtt){
						if(data['fixtures'][i]['result']['goalsHomeTeam']!==0){
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]+data['fixtures'][i]['result']['goalsHomeTeam']/homeTeamAtt*0.75*0.07).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]+data['fixtures'][i]['result']['goalsHomeTeam']/homeTeamAtt*0.75*0.07).toFixed(2));
						}
						else{
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]+1/homeTeamAtt*0.75*0.07*2).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]+1/homeTeamAtt*0.75*0.07*2).toFixed(2));
						}	
					}
					else {
						if(data['fixtures'][i]['result']['goalsHomeTeam']!==0){
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]-homeTeamAtt/data['fixtures'][i]['result']['goalsHomeTeam']*0.07).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]-homeTeamAtt/data['fixtures'][i]['result']['goalsHomeTeam']*0.07).toFixed(2));
						}
						else{
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]-homeTeamAtt/1*0.07*2).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]-homeTeamAtt/1*0.07*2).toFixed(2));
						}
					} 
					var awayTeamAtt=(allAtt[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]+allDef[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]])/2;
					
					if(data['fixtures'][i]['result']['goalsAwayTeam']>awayTeamAtt){
						if(data['fixtures'][i]['result']['goalsAwayTeam']!==0)
						{
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]+data['fixtures'][i]['result']['goalsAwayTeam']/awayTeamAtt*0.07).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]+data['fixtures'][i]['result']['goalsAwayTeam']/homeTeamAtt*0.07).toFixed(2));
						}
						else
						{
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]+1/awayTeamAtt*0.07*2).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]+1/homeTeamAtt*0.07*2).toFixed(2));
						}
					}
					else{
						if(data['fixtures'][i]['result']['goalsAwayTeam']!==0)
						{
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]-awayTeamAtt/data['fixtures'][i]['result']['goalsAwayTeam']*0.75*0.07).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]-awayTeamAtt/data['fixtures'][i]['result']['goalsAwayTeam']*0.75*0.07).toFixed(2));
						}
						else
						{
							allAtt[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((allAtt[Math.floor(i/10)][data['fixtures'][i]["awayTeamName"]]-awayTeamAtt/1*0.75*0.07*2).toFixed(2));
							allDef[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((allDef[Math.floor(i/10)][data['fixtures'][i]["homeTeamName"]]-awayTeamAtt/1*0.75*0.07*2).toFixed(2));
						}
					}
					allRat[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]=Number((((2.5+(allAtt[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]-allDef[Math.floor(i/10)+1][data['fixtures'][i]["homeTeamName"]]))*100)/5).toFixed(1));
					allRat[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]=Number((((2.5+(allAtt[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]-allDef[Math.floor(i/10)+1][data['fixtures'][i]["awayTeamName"]]))*100)/5).toFixed(1));
					i++;
				}
				
				for(let f=0;f<20;f++)
				{
					tableArr[f].rat=allRat[Math.floor(i/10)][tableArr[f].teamname];
				}
				for(let f=0;f<20;f++)
				{
					tableArr[f].def=allDef[Math.floor(i/10)][tableArr[f].teamname];
				}
				for(let f=0;f<20;f++)
				{
					tableArr[f].att=allAtt[Math.floor(i/10)][tableArr[f].teamname];
				}
				let gw;
				let currentGw;
				for(let j=0;j<10*38;j++)
				{
					if(data["fixtures"][j]["status"]!=="FINISHED"){
						gw=data["fixtures"][j]["matchday"];
						break;
					}
						
				}
				for(let a=0;a<20;a++)
				{
					for(let b=0;b<19;b++)
					{
						if(tableArr[b].points<tableArr[b+1].points)
						{
						
							let temp2 = tableArr[b];
							tableArr[b]= tableArr[b+1];
							tableArr[b+1]= temp2;
						}
					}
				}
			
				const makeTable= function(arr){
					var pointH;
					var ratingH;
					var attH;
					var defH;
					var comp=document.createElement("table");
					comp.setAttribute("id","comp");
					document.getElementById("content").appendChild(comp);
					var node;
					var pos;
					var teamname;
					var teamUrl;
					var point;
					var goalDif;
					var goalDifH;
					var att;
					var def;
					var rat;
					var ratArrow;
					var logo;
					var logoimage;
					var textnode;
					var won;
					var drawn;
					var lost;
					var wonH;
					var drawnH;
					var lostH;
					for(let a=0;a<20;a++)
						{
							for(let b=0;b<19;b++)
							{
								if(arr==="def"?tableArr[b][arr]>tableArr[b+1][arr]:tableArr[b][arr]<tableArr[b+1][arr])
								{
									let temp2 = tableArr[b];
									tableArr[b]= tableArr[b+1];
									tableArr[b+1]= temp2;
								}
								if (tableArr[b][arr]===tableArr[b+1][arr]) {
									if(tableArr[b].goalDif<tableArr[b+1].goalDif){
										let temp2 = tableArr[b];
										tableArr[b]= tableArr[b+1];
										tableArr[b+1]= temp2;

										
									}
								}
							}
						}
				
					node = document.createElement("TR");  
					pos=document.createElement("TD");
					teamname = document.createElement("TD");
					ratingH= document.createElement("TD");
					pointH= document.createElement("TD");
					goalDifH=document.createElement("TD");
					logo= document.createElement("TD");
					attH = document.createElement("TD");
					wonH=document.createElement("TD");
					drawnH= document.createElement("TD");
					lostH = document.createElement("TD");
					defH = document.createElement("TD");
					textnode = document.createTextNode("Rating");  
					ratingH.appendChild(textnode); 		
					textnode = document.createTextNode("#");  
					pos.appendChild(textnode); 		
					textnode = document.createTextNode("Goal Diff");  
					goalDifH.appendChild(textnode); 
					textnode = document.createTextNode("Points");  
					pointH.appendChild(textnode); 
					textnode = document.createTextNode("Att Strenght");  
					attH.appendChild(textnode); 
					textnode = document.createTextNode("Logo");  
					logo.appendChild(textnode); 
					textnode = document.createTextNode("Def Strenght");  
					defH.appendChild(textnode);
					textnode = document.createTextNode("Won");  
					wonH.appendChild(textnode); 
					textnode = document.createTextNode("Drawn");  
					drawnH.appendChild(textnode); 
					textnode = document.createTextNode("Lost");  
					lostH.appendChild(textnode);
					textnode = document.createTextNode("Team");  
					teamname.appendChild(textnode); 

					pos.setAttribute("class","tableH");
					logo.setAttribute("class","tableH");
					teamname.setAttribute("class","tableH");
					pointH.setAttribute("class","tableH");
					goalDifH.setAttribute("class","tableH");
					ratingH.setAttribute("class","tableH");
					attH.setAttribute("class","tableH");
					defH.setAttribute("class","tableH");
					wonH.setAttribute("class","tableH");
					drawnH.setAttribute("class","tableH");
					lostH.setAttribute("class","tableH");
					
					node.appendChild(pos);
					node.appendChild(logo);
					node.appendChild(teamname);
					node.appendChild(pointH);
					node.appendChild(wonH);   
					node.appendChild(drawnH); 
					node.appendChild(lostH); 
					node.appendChild(goalDifH);
					node.appendChild(ratingH);   
					node.appendChild(attH); 
					node.appendChild(defH); 	
					
					comp.appendChild(node);  

					for(var j=0;j<20;j++){
							
						node = document.createElement("TR");  
						pos = document.createElement("TD");  
						teamname = document.createElement("TD");
						teamUrl=document.createElement("a");
						teamUrl.setAttribute("href",tableArr[j].teamname+".html");
						teamname.appendChild(teamUrl);
						teamUrl.appendChild(document.createTextNode(tableArr[j].teamname));
						point=document.createElement("TD");
						goalDif=document.createElement("TD");
						rat= document.createElement("TD");
						att = document.createElement("TD");
						def = document.createElement("TD");
						won= document.createElement("TD");
						drawn = document.createElement("TD");
						lost = document.createElement("TD");
						logo=document.createElement("TD");
						teamUrl=document.createElement("a");
						teamUrl.setAttribute("href",tableArr[j].teamname+".html");
						logoimage=document.createElement("img");
						logoimage.src=logos[tableArr[j].teamname];
						logoimage.width=60;
						logoimage.height=60;
						teamUrl.appendChild(logoimage);
						logo.appendChild(teamUrl);

						textnode = document.createTextNode(allRat[Math.floor(i/10)][tableArr[j].teamname]);  
						rat.appendChild(textnode);
						ratArrow=document.createElement("img");
						if(allRat[Math.floor(i/10)][tableArr[j].teamname]>allRat[Math.floor(i/10)-1][tableArr[j].teamname])
							{
							ratArrow.src="up.svg";
							
							}
						else
						{
							ratArrow.src="down.svg";
							
						}
							ratArrow.setAttribute("style","vertical-align: middle");
							


						ratArrow.width=15;
						ratArrow.height=15;	
						rat.appendChild(ratArrow);
						

						att.setAttribute("style","text-align:center");
						textnode = document.createTextNode(allAtt[Math.floor(i/10)][tableArr[j].teamname]);  
						if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=2.67)
							att.setAttribute('style',"background-color:rgba(0,255,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=2.33 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=2.67)
							att.setAttribute('style',"background-color:rgba(64,255,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=2 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=2.33)
							att.setAttribute('style',"background-color:rgba(127,255,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=1.67 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=2)
							att.setAttribute('style',"background-color:rgba(191,255,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=1.33 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=1.67)
							att.setAttribute('style',"background-color:rgba(255,255,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=1 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=1.33)
							att.setAttribute('style',"background-color:rgba(255,191,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=0.67 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=1)
							att.setAttribute('style',"background-color:rgba(255,127,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=0.33 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=0.67)
							att.setAttribute('style',"background-color:rgba(255,64,0,0.9);text-align:center");
						else if(allAtt[Math.floor(i/10)][tableArr[j].teamname]>=0 && allAtt[Math.floor(i/10)][tableArr[j].teamname]<=0.33)
							att.setAttribute('style',"background-color:rgba(255,0,0,0.9);text-align:center");
						att.appendChild(textnode); 
						
						textnode = document.createTextNode(allDef[Math.floor(i/10)][tableArr[j].teamname]);  
						if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=2.67)
							def.setAttribute('style',"background-color:rgba(255,0,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=2.33 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=2.67)
							def.setAttribute('style',"background-color:rgba(255,64,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=2 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=2.33)
							def.setAttribute('style',"background-color:rgba(255,127,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=1.67 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=2)
							def.setAttribute('style',"background-color:rgba(255,191,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=1.33 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=1.67)
							def.setAttribute('style',"background-color:rgba(255,255,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=1 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=1.33)
							def.setAttribute('style',"background-color:rgba(191,255,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=0.67 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=1)
							def.setAttribute('style',"background-color:rgba(127,255,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=0.33 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=0.67)
							def.setAttribute('style',"background-color:rgba(64,255,0,0.9);text-align:center");
						else if(allDef[Math.floor(i/10)][tableArr[j].teamname]>=0 && allDef[Math.floor(i/10)][tableArr[j].teamname]<=0.33)
							def.setAttribute('style',"background-color:rgba(0,255,0,0.9);text-align:center");

						def.appendChild(textnode);
						textnode=document.createTextNode(tableArr[j].goalDif); 
						goalDif.appendChild(textnode); 
						textnode=document.createTextNode(tableArr[j].points); 
						point.appendChild(textnode); 
					 
						
						textnode=document.createTextNode(tableArr[j].won); 
						won.appendChild(textnode);
						textnode=document.createTextNode(tableArr[j].drawn); 
						drawn.appendChild(textnode); 
						textnode=document.createTextNode(tableArr[j].lost);
						lost.appendChild(textnode); 
						textnode=document.createTextNode(j+1); 
						pos.appendChild(textnode); 

						point.setAttribute("style","text-align:center"); 
						goalDif.setAttribute("style","text-align:center"); 
						rat.setAttribute("style","text-align:center"); 
						pos.setAttribute("style","text-align:center"); 
						won.setAttribute("style","text-align:center"); 
						drawn.setAttribute("style","text-align:center"); 
						lost.setAttribute("style","text-align:center"); 
						node.appendChild(pos);
						node.appendChild(logo);
						node.appendChild(teamname);
						node.appendChild(point);
						node.appendChild(won);   
						node.appendChild(drawn); 
						node.appendChild(lost); 
						node.appendChild(goalDif);
					 
						node.appendChild(rat);   
						node.appendChild(att); 
						node.appendChild(def);

						comp.appendChild(node);
				
					}
					pointH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("points");
					});
					ratingH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("rat");
					});
					attH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("att");
					});
					defH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("def");
					});
					wonH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("won");
					});
					drawnH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("drawn");
					});
					lostH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("lost");
					});
					goalDifH.addEventListener("click",function()
					{
						comp.remove();
						makeTable("goalDif");
					});
			}	
			makeTable("points");
			currentGw=gw;
			const makeMatchTab=function(gw){
					
				var matchTab=document.createElement("table");
				matchTab.setAttribute("id","nextMatches");
				document.getElementById("content").appendChild(matchTab);
				var node1;
				var	textnode1;
				var homeTeamLogo;
				var homeTeamLogoImage;
				var homeTeamName;
				var awayTeamLogo;
				var awayTeamLogoImage;
				var awayTeamName;
				var Goals;
				var teamUrl;
		
				var arrLeft=document.createElement("TD");
				var arrLeftImg=document.createElement("img");
				arrLeftImg.src="left arr.svg";
				arrLeft.appendChild(arrLeftImg);
				arrLeft.setAttribute("id","left");
				matchTab.appendChild(arrLeft);
		
				var isGwOver=false;
				var gwTab = document.createElement("TD");
				textnode1=document.createTextNode("Gameweek " +gw);
				gwTab.appendChild(textnode1);
				gwTab.setAttribute("style","background-color:transparent;text-align:center;vertical-align: middle;");
				gwTab.setAttribute("colspan","3");
				matchTab.appendChild(gwTab);

				var arrRight=document.createElement("TD");
				var arrRightImg=document.createElement("img");
				arrRightImg.src="right arr.svg";
				arrRight.appendChild(arrRightImg);
				arrRight.setAttribute("id","right");
				matchTab.appendChild(arrRight);

				for(let j=(gw-1)*10;j<gw*10;j++){
					
					node1=document.createElement("TR");
					hometeamUrl=document.createElement("a");
					hometeamUrl.setAttribute("href",data["fixtures"][j]["homeTeamName"]+".html");
					homeTeamLogo=document.createElement("TD");
					homeTeamLogoImage=document.createElement("img");
					hometeamUrl.appendChild(homeTeamLogoImage);
				 	homeTeamName=document.createElement("TD");
					Goals=document.createElement("TD");
					awayteamUrl=document.createElement("a");
					awayteamUrl.setAttribute("href",data["fixtures"][j]["awayTeamName"]+".html");
					awayTeamLogo=document.createElement("TD");
					awayTeamLogoImage=document.createElement("img");
					awayteamUrl.appendChild(awayTeamLogoImage);

					awayTeamName=document.createElement("TD");
					homeTeamLogoImage.src=logos[data["fixtures"][j]["homeTeamName"]];
					homeTeamLogoImage.width=30;
					homeTeamLogoImage.height=30;
					awayTeamLogoImage.src=logos[data["fixtures"][j]["awayTeamName"]];
					awayTeamLogoImage.width=30;
					awayTeamLogoImage.height=30;
					homeTeamLogo.setAttribute("style","text-align:center");
					awayTeamLogo.setAttribute("style","text-align:center");
					homeTeamLogo.appendChild(hometeamUrl);
					awayTeamLogo.appendChild(awayteamUrl);
					
					hometeamUrl=document.createElement("a");
					hometeamUrl.setAttribute("href",data["fixtures"][j]["homeTeamName"]+".html");
					awayteamUrl=document.createElement("a");
					awayteamUrl.setAttribute("href",data["fixtures"][j]["awayTeamName"]+".html");
					textnode1=document.createTextNode(shortNames[data["fixtures"][j]["homeTeamName"]]);
					hometeamUrl.appendChild(textnode1);
					homeTeamName.appendChild(hometeamUrl);
					textnode1=document.createTextNode(shortNames[data["fixtures"][j]["awayTeamName"]]);
					awayteamUrl.appendChild(textnode1);
					awayTeamName.appendChild(awayteamUrl);

					var predHomeGoal = null;
					var predAwayGoal = null;
					if(data["fixtures"][j]["result"]["goalsHomeTeam"] === null&&!isGwOver&&(j<currentGw*10)){
						var node2=document.createElement("TR");
						var predTab = document.createElement("TD");
						textnode1=document.createTextNode("Predictions");
						predTab.appendChild(textnode1);
						predTab.setAttribute("style","background-color:rgba(0,255,0,0.9); text-align:center");
						predTab.setAttribute("colspan","5");
						node2.appendChild(predTab)
						matchTab.appendChild(node2);
						isGwOver=true;
					}
					if(data["fixtures"][j]["result"]["goalsHomeTeam"] === null&&allRat[gw-1][data["fixtures"][j]["homeTeamName"]]!=undefined)
					{	
						
						var Home = ((allAtt[gw-1][data["fixtures"][j]["homeTeamName"]] + allDef[gw-1][data["fixtures"][j]["awayTeamName"]])/2)*1.15;
						var Away = (allDef[gw-1][data["fixtures"][j]["homeTeamName"]] + allAtt[gw-1][data["fixtures"][j]["awayTeamName"]])/2;
						if(Home>0 && Home<1)
							predHomeGoal = 0;
						if(Home>=1 && Home<1.3)
							predHomeGoal = 1;
						if(Home>=1.3 && Home<1.8)
							predHomeGoal = 2;
						if(Home>=1.8 && Home<2.8)
							predHomeGoal = 3;
						if(Home>=2.8)
							predHomeGoal = 4;
						if(Away>0 && Away<1)
							predAwayGoal = 0;
						if(Away>=1 && Away<1.3)
							predAwayGoal = 1;
						if(Away>=1.3 && Away<1.8)
							predAwayGoal = 2;
						if(Away>=1.8 && Away<2.8)
							predAwayGoal = 3;
						if(Away>=2.8)
							predAwayGoal = 4;
						textnode1=document.createTextNode(predHomeGoal + " : " + predAwayGoal);
						Goals.appendChild(textnode1);
						Goals.setAttribute("style","color:green;text-align:center");
					}
					else if(data["fixtures"][j]["result"]["goalsHomeTeam"] === null){
						textnode1=document.createTextNode("VS");
						Goals.appendChild(textnode1);
					}
					else{
						textnode1=document.createTextNode(data["fixtures"][j]["result"]["goalsHomeTeam"]+" : " + data["fixtures"][j]["result"]["goalsAwayTeam"]);
						Goals.appendChild(textnode1);
						
					}

					homeTeamName.setAttribute("style","text-align:center");
					awayTeamName.setAttribute("style","text-align:center");
					node1.appendChild(homeTeamLogo);
					node1.appendChild(homeTeamName);
					node1.appendChild(Goals);
					node1.appendChild(awayTeamName);
					node1.appendChild(awayTeamLogo);
					matchTab.appendChild(node1);
				}
					arrLeft.addEventListener("click",function(){
					if(gw>1){
						gw--;
						matchTab.remove();
						makeMatchTab(gw);
						}
					});
					arrRight.addEventListener("click",function(){
					if(gw<38){
						gw++;
						matchTab.remove();
						makeMatchTab(gw);
					}
					});
			

				}
					makeMatchTab(currentGw);

				for(let i=0;i<20;i++){
					var link = document.createElement("a");
					link.href=tableArr[i].teamname+".html";
					link.appendChild(document.createTextNode(tableArr[i].teamname));	
					document.getElementById("footer").appendChild(link);
				}
			});
		});
	});
});
