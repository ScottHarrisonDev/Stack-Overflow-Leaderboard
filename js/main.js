tskStack = {

	init: function(){
		var self = this;
		self.fnGetUserData('709625;1879628;368846;1283391;309956;3387421', [Your API Key]);
		self.fnEasterEgg();
	},

	fnGetUserData: function(userIDs, apiKey){
		var self = this;
		self.fnDoAPICall(userIDs, apiKey);		
	},

	fnDoAPICall: function(userIDs, apiKey){
		var self = this;
		$.ajax({
			url: "https://api.stackexchange.com/2.2/users/" + userIDs + "?key=" + apiKey + "&site=stackoverflow&order=desc&sort=reputation&filter=default",
			success: function(data){
				self.fnClearBoard();
				$.each(data.items,function(index,value){
					self.fnAddUser(value);
				});
				self.fnAddTolocalStorage(data);				
			},
			error: function(data){
				var storedUserData = localStorage['userData'] || 'empty';
				if (storedUserData == 'empty'){
					alert('Something went really wrong...');
				} else {
					var parsedStoredUserData = JSON.parse(storedUserData);
					$.each(parsedStoredUserData.items,function(index,value){
						self.fnAddUser(value);
					});
				}
			}
		});
	},

	fnAddTolocalStorage: function(data){
		var self = this;
		localStorage['userData'] = JSON.stringify(data);
	},

	fnClearBoard: function(){
		var self = this;
		$('#leaderboardWrapper').empty();
	},

	fnAddUser: function(userData){
		var self = this;
		var szUserHTML = '<a href="' + userData.link + '" target="_blank"><div class="row userRow"><img class="userImg" src="' + userData.profile_image + '" alt="Avatar"><div class="userInfo"><h4 class="userName">' + userData.display_name + '</h4><p class="userReputation">' + userData.reputation + '</p><div class="badges"><span class="bronze">' + userData.badge_counts.bronze + '</span><span class="silver">' + userData.badge_counts.silver + '</span><span class="gold">' + userData.badge_counts.gold + '</div></div></div></div></div></a>';
		$('#leaderboardWrapper').append(szUserHTML);
	},

	fnEasterEgg: function(){
		var self = this;
		$('#easterEgg').mouseover(function(){
			$(this).addClass('fa-spin');
		});
		$('#easterEgg').mouseout(function(){
			$(this).removeClass('fa-spin');
		});
	}

}

$(document).ready(function(){
	tskStack.init();
});
