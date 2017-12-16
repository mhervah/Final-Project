var request = new Request('http://api.football-data.org/v1/teams/563/players', {
	method: 'GET', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'X-Auth-Token': 'e03be7e683974813b40a35499aee2299'
	})
});

var request2 = new Request('http://api.football-data.org/v1/teams/563/fixtures', {
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

var div=document.getElementById("header");
var logo=document.createElement("img");
var toHome=document.createElement("span");
var backArrow=document.createElement("img");
backArrow.src="left arr.svg";
backArrow.width=50;
backArrow.height=50;
var link=document.createElement("a");
link.setAttribute("href","index.html");
link.setAttribute("id","backHome");
//link.appendChild(backArrow);
link.appendChild(document.createTextNode("Home"));

div.appendChild(link);
//var stadium=document.createElement("img");
//stadium.src="Team Stadium/Burnley.jpg";
//stadium.setAttribute("id","stadImg");
logo.src="Team Logos/west-ham.png";
logo.setAttribute("style","margin-top:20");
logo.width=200;
var textnode=document.createTextNode("West Ham United FC");
var teamName=document.createElement("h1");
teamName.appendChild(textnode);
//div.appendChild(stadium);

div.appendChild(logo);
div.appendChild(teamName);

div=document.getElementById("content");


fetch(request)
.then((resp) => resp.json())
.then(function(data) {

		var playerTable = document.createElement("table");  
		playerTable.setAttribute("id","plTable");
		
		var title = document.createElement("Td"); 
		title.appendChild(document.createTextNode("Players"));
		title.setAttribute("colspan",4);
		title.setAttribute("id","playersTitle");

		playerTable.appendChild(title);

		var node = document.createElement("TR");   
		var kitNumber = document.createElement("TD");
		var playerName = document.createElement("TD");
		var nationality = document.createElement("TD");
		var position = document.createElement("TD");

		kitNumber.appendChild(document.createTextNode("#"));
		playerName.appendChild(document.createTextNode("Player Name"));
		nationality.appendChild(document.createTextNode("Nat."));
		position.appendChild(document.createTextNode("Position"));


		node.appendChild(kitNumber);
		node.appendChild(playerName);
		node.appendChild(nationality);
		node.appendChild(position);

		playerTable.appendChild(node);
		

		var playerArr = [];
		for(var i=0;data["players"][i]!==undefined;i++)
		{
			playerArr[i]={};
			playerArr[i]["name"] = data["players"][i]["name"];
			playerArr[i]["nationality"] = data["players"][i]["nationality"];
			playerArr[i]["position"] = data["players"][i]["position"];
			if(data["players"][i]["jerseyNumber"]!==null)
				playerArr[i]["jerseyNumber"] = data["players"][i]["jerseyNumber"];
			else
				playerArr[i]["jerseyNumber"] = 100;
		}

		for(let a=0;data["players"][a]!==undefined;a++)
				{
					for(let b=0;data["players"][b+1]!==undefined;b++)
					{
						if(playerArr[b]["jerseyNumber"]>playerArr[b+1]["jerseyNumber"])
						{
							let temp1 = playerArr[b];
							playerArr[b]= playerArr[b+1];
							playerArr[b+1]= temp1;
						}
					}
				}
	for(var i=0;data["players"][i]!==undefined;i++){
		var flag;
		flag=document.createElement("img");
		flag.src="flags/"+ playerArr[i]["nationality"]+".png";
		flag.width=40;
		flag.height=35;
		 node = document.createElement("TR");  
		 kitNumber = document.createElement("TD");
		 playerName = document.createElement("TD");
		 nationality = document.createElement("TD");
		 position = document.createElement("TD");
		 if(playerArr[i]["jerseyNumber"]===100)
		 	kitNumber.appendChild(document.createTextNode("-"));
		else
			kitNumber.appendChild(document.createTextNode(playerArr[i]["jerseyNumber"]));
		playerName.appendChild(document.createTextNode(playerArr[i]["name"]));
		nationality.appendChild(flag);
		position.appendChild(document.createTextNode(playerArr[i]["position"]));

		node.appendChild(kitNumber);
		node.appendChild(playerName);
		node.appendChild(nationality);
		node.appendChild(position);

		playerTable.appendChild(node);
		
	}
	

	fetch(request3)
			.then((resp) => resp.json())
			.then(function(data) {
				var statTab=document.createElement("table");
				statTab.setAttribute("id","teamStats");

				var node=document.createElement("TR");
				var goalsScored = document.createElement("TD");
				var goalsConceded = document.createElement("TD");
				var pos = document.createElement("TD");

				var won = document.createElement("TD");
				var drawn = document.createElement("TD");
				var lost = document.createElement("TD");
				for(let i=0;i<20;i++)
					if(data["standing"][i]["teamName"]==="West Ham United FC"){
						goalsScored.appendChild(document.createTextNode("Goals Scored"));
						goalsScored.appendChild(document.createElement("br"));
						goalsScored.appendChild(document.createTextNode(data["standing"][i]["goals"]));
						goalsConceded.appendChild(document.createTextNode("Goals Conceded"));
						goalsConceded.appendChild(document.createElement("br"));
						goalsConceded.appendChild(document.createTextNode(data["standing"][i]["goalsAgainst"]));
						pos.appendChild(document.createTextNode("Position"));
						pos.appendChild(document.createElement("br"));
						pos.appendChild(document.createTextNode(data["standing"][i]["position"]));

						

						won.appendChild(document.createTextNode("Won"));
						won.appendChild(document.createElement("br"));
						won.appendChild(document.createTextNode(data["standing"][i]["wins"]));

						drawn.appendChild(document.createTextNode("Drawn"));
						drawn.appendChild(document.createElement("br"));
						drawn.appendChild(document.createTextNode(data["standing"][i]["draws"]));

						lost.appendChild(document.createTextNode("Lost"));
						lost.appendChild(document.createElement("br"));
						lost.appendChild(document.createTextNode(data["standing"][i]["losses"]));
						
						
						
					}
				
				node.appendChild(pos);
				node.appendChild(goalsScored);
				node.appendChild(goalsConceded);
				statTab.appendChild(node);
				node=document.createElement("TR");
				node.appendChild(won);
				node.appendChild(drawn);
				node.appendChild(lost);
				statTab.appendChild(node);
				
	
			
	fetch(request2)
	.then((resp) => resp.json())
	.then(function(data) {
		var matchTab=document.createElement("table");
					matchTab.setAttribute("id","nextMatches");

					var node1;
					var matchday;
					var	textnode1;
					var homeTeamLogo;
					var homeTeamLogoImage;
					var homeTeamName;
					var awayTeamLogo;
					var awayTeamLogoImage;
					var awayTeamName;
					var Goals;
				
					node1=document.createElement("TD");
					node1.appendChild(document.createTextNode("Results & Fixtures"));
					node1.setAttribute("colspan",6);	
					node1.setAttribute("id","fixRes");	
					matchTab.appendChild(node1);
					let j=0;
					while(data["fixtures"][j]!==undefined){
						if(data["fixtures"][j]["_links"]["competition"]["href"]==="http://api.football-data.org/v1/competitions/445"){
							node1=document.createElement("TR");
						matchday=document.createElement("TD");
						homeTeamLogo=document.createElement("TD");
						homeTeamLogoImage=document.createElement("img");
					 	homeTeamName=document.createElement("TD");
						Goals=document.createElement("TD");
						awayTeamLogo=document.createElement("TD");
						awayTeamLogoImage=document.createElement("img");
						awayTeamName=document.createElement("TD");
						homeTeamLogoImage.src=logos[data["fixtures"][j]["homeTeamName"]];
						homeTeamLogoImage.width=25;
						homeTeamLogoImage.height=25;
						awayTeamLogoImage.src=logos[data["fixtures"][j]["awayTeamName"]];
						awayTeamLogoImage.width=25;
						awayTeamLogoImage.height=25;
						homeTeamLogo.setAttribute("style","text-align:center");
						awayTeamLogo.setAttribute("style","text-align:center");
						homeTeamLogo.appendChild(homeTeamLogoImage);
						awayTeamLogo.appendChild(awayTeamLogoImage);

						textnode1=document.createTextNode(shortNames[data["fixtures"][j]["homeTeamName"]]);
						homeTeamName.appendChild(textnode1);
						textnode1=document.createTextNode(shortNames[data["fixtures"][j]["awayTeamName"]]);
						awayTeamName.appendChild(textnode1);
						homeTeamName.setAttribute("style","text-align:center");
						awayTeamName.setAttribute("style","text-align:center");

						if(data["fixtures"][j]["homeTeamName"]==="West Ham United FC")
							homeTeamName.setAttribute("style","font-weight: bold;text-align:center");
						else
							awayTeamName.setAttribute("style","font-weight: bold;text-align:center");
						matchday.appendChild(document.createTextNode("GW "+(data["fixtures"][j]["matchday"])));
						
						if(data["fixtures"][j]["result"]["goalsHomeTeam"] === null)
						{	
							
							
							textnode1=document.createTextNode("VS");
							Goals.appendChild(textnode1);
							Goals.setAttribute("style","text-align:center");
						}
						else{
							textnode1=document.createTextNode(data["fixtures"][j]["result"]["goalsHomeTeam"]+" : " + data["fixtures"][j]["result"]["goalsAwayTeam"]);
							Goals.appendChild(textnode1);
							
						}
						matchday.setAttribute("style","text-align:center");
				
						node1.appendChild(matchday);
						node1.appendChild(homeTeamLogo);
						node1.appendChild(homeTeamName);
						node1.appendChild(Goals);
						node1.appendChild(awayTeamName);
						node1.appendChild(awayTeamLogo);
						matchTab.appendChild(node1);
					
						
						}
					j++;
					}
				
						

					div.appendChild(playerTable);
					
					var statSpan=document.createElement("span");
					statSpan.setAttribute("id","statSpan");
					var text= document.createElement("h3");
			
			var coachName=document.createTextNode("Manager: David Moyes");
			var coachImg=document.createElement("img");
			coachImg.src="Coaches/west-ham.jpg";
			
			text.appendChild(coachName);
			statSpan.appendChild(statTab);
			statSpan.appendChild(text);
			statSpan.appendChild(coachImg);
			statSpan.appendChild(document.createElement("br"));
			
			div.appendChild(statSpan);
			
			text= document.createElement("h3");
			var stadiumName=document.createTextNode("Stadium: London Stadium");
			var stadImg=document.createElement("img");
			stadImg.src="Stadiums/west-ham.jpg";
			
			text.appendChild(stadiumName);
			
			statSpan.appendChild(text);
			statSpan.appendChild(stadImg);
			statSpan.appendChild(document.createElement("br"));
			div.appendChild(statSpan);

					div.appendChild(matchTab);	
			
			});
		});
	});