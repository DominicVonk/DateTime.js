/**
 * Author: Dominic Vonk
 * Class: DateTime
 * Github: https://github.com/DominicVonk/DateTime.js
 */
 (function(_) { 
_.DateTime = function (year, month, day, hour, minute, second) {
	
		var date;
		if (typeof year === "undefined") {
			date = new Date();
		} else if (typeof month === "undefined") {
			date = new Date(year);
		} else {
			date = new Date(year, month-1, (typeof day !== "undefined" ? day : 1), (typeof hour !== "undefined" ? hour : 0), (typeof minute !== "undefined" ? minute : 0), (typeof second !== "undefined" ? second : 0));
		}
		return {
			AddDays : function(days) {
				date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, date.getHours(), date.getMinutes(), date.getSeconds());
			},
			AddHours : function(hours) {
				date = new Date(date.getTime() + (hours *60*60*1000));
			},
			AddMilliseconds : function(milliseconds) {
				date = new Date(date.getTime() + (milliseconds));
			},
			AddMinutes : function(minutes) {
				date = new Date(date.getTime() + (minutes *60*1000));
			},
			AddMonths : function(months) {
				date = new Date(date.getFullYear(), date.getMonth() + months, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
			},
			AddSeconds : function(seconds) {
				date = new Date(date.getTime() + (seconds *1000));
			},
			AddYears : function(years) {
				date = new Date(date.getFullYear() + years, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
			},
			Date : function() {
			   return new _.DateTime(date.getYear()+1900, date.getMonth()+1, date.getDate(), 0, 0, 0);
			},
			Day : function() {
			  return date.getDate();
			},
			DayOfWeek: function() {
			  return date.getDay() > 0 ? date.getDay() : 7;
			},
			DayOfYear: function() {
			  return Math.ceil((date - new Date(date.getFullYear(), 1, 1)) / (24*60*60*1000));
			},
			Hour: function() {
			  return date.getHours();
			},
			Millisecond: function() {
			  return date.getMilliseconds();
			},
			Minute: function() {
			  return date.getMinutes();
			},
			Month: function() {
			  return date.getMonth()+1;
			},
			Second: function() {
			  return date.getSeconds();
			},
			Year: function() {
			  return (parseInt(date.getYear())+1900);
			},
			IsLeapYear : function() {
			  return this.Year() % 4 === 0 && ( this.Year() % 100 !== 0 || this.Year() % 400 === 0);
			},
			DaysInMonth : function() {
			  return (new Date(this.Year(), this.Month(), 0)).getDate();
			},
			Time : function() {
				return date.getTime();
			},
			QuarterOfYear: function() {
				return Math.floor((date.getMonth())/3)+1;
			},
			DayDifference: function(date1) {
				var date2 = new _.DateTime(this.Time());
				var largeDate = (date1.Time() > date2.Time()) ? Date.UTC(date1.Year(), date1.Month()-1, date1.Day()) :  Date.UTC(date2.Year(), date2.Month()-1, date2.Day());
				var smallDate = (date1.Time() > date2.Time()) ?  Date.UTC(date2.Year(), date2.Month()-1, date2.Day()) :  Date.UTC(date1.Year(), date1.Month()-1, date1.Day());
				return Math.floor(Math.abs(largeDate - smallDate) / (24*60*60*1000));
			},
			Difference: function(date1) {
				var date2 = new _.DateTime(this.Time());
				var largeDate = (date1.Time() > date2.Time()) ? new DateTime(date1.Time()) : new DateTime(date2.Time());
				var smallDate = (date1.Time() > date2.Time()) ? new DateTime(date2.Time()) : new DateTime(date1.Time());
				var names = ["year", "month", "day", "hour", "minute", "second"];
				var results = {
					year: 0,
					month: 0,
					day: 0,
					hour: 0,
					minute: 0,
					second : 0
				};
				for(var i = 0; i < names.length; i++) {
					var result = names[i];
					var add = 0;
					var calc = largeDate[result.substr(0, 1).toUpperCase() + result.substr(1)]() - smallDate[result.substr(0, 1).toUpperCase() + result.substr(1)]();
					var largeVal = largeDate[result.substr(0, 1).toUpperCase() + result.substr(1)]();
					if (calc < 0 && result == "day") {
						largeDate['Add' + names[i-1].substr(0, 1).toUpperCase() + names[i-1].substr(1) + 's'](-1);
						largeVal += largeDate.DaysInMonth();
						results[names[i-1]]--;
					}  else if (calc < 0 && result == "month") {
						largeVal += 12;
						results[names[i-1]]--;
					} else if (calc < 0) {
						largeVal += 1;
						results[names[i-1]]--;
					}
					
					add = largeVal - smallDate[result.substr(0, 1).toUpperCase() + result.substr(1)]();
					
				  	results[result] = add;
				}
				return results;
			},
			Week: function() {
				var a = new DateTime(date.getFullYear(), 1, 1);
				var minus = a.DayOfWeek();
				var days = this.DayDifference(a);
				return Math.ceil((days-(7-minus))/7)+1;
			},
			Format: function(form) {
				return form.replace(/(m)/, this.Minute())
						.replace(/(Y)/, this.Year())
						.replace(/(M)/, this.Month())
						.replace(/(s)/, this.Second())
						.replace(/(d)/, this.DayOfWeek())
						.replace(/(D)/, this.Day())
						.replace(/(y)/, this.DayOfYear())
						.replace(/(h)/, this.Hour());
			}
		};
};
_.DateTime.UTC = function() {
	var now = new Date();
	dt = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	return new _.DateTime(
		parseInt(dt.getFullYear()),
		parseInt(dt.getMonth()+1),
		parseInt(dt.getDate()),
		parseInt(dt.getHours()),
		parseInt(dt.getMinutes()),
		parseInt(dt.getSeconds())
	);
};
_.DateTime.Now = function() { 
	var dt = new Date();
	return new _.DateTime(
		parseInt(dt.getFullYear()),
		parseInt(dt.getMonth()+1),
		parseInt(dt.getDate()),
		parseInt(dt.getHours()),
		parseInt(dt.getMinutes()),
		parseInt(dt.getSeconds())
	);
};
_.DateTime.Difference = function(date1, date2) {
	var largeDate = (date1.Time() > date2.Time()) ? new DateTime(date1.Time()) : new DateTime(date2.Time());
	var smallDate = (date1.Time() > date2.Time()) ? new DateTime(date2.Time()) : new DateTime(date1.Time());
	var names = ["year", "month", "day", "hour", "minute", "second"];
	var results = {
		year: 0,
		month: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second : 0
	};
	for(var i = 0; i < names.length; i++) {
		var result = names[i];
		var add = 0;
		var calc = largeDate[result.substr(0, 1).toUpperCase() + result.substr(1)]() - smallDate[result.substr(0, 1).toUpperCase() + result.substr(1)]();
		var largeVal = largeDate[result.substr(0, 1).toUpperCase() + result.substr(1)]();
		if (calc < 0 && result == "day") {
			largeDate['Add' + names[i-1].substr(0, 1).toUpperCase() + names[i-1].substr(1) + 's'](-1);
			largeVal += largeDate.DaysInMonth();
			results[names[i-1]]--;
		}  else if (calc < 0 && result == "month") {
			largeVal += 12;
			results[names[i-1]]--;
		} else if (calc < 0) {
			largeVal += 1;
			results[names[i-1]]--;
		}
		
		add = largeVal - smallDate[result.substr(0, 1).toUpperCase() + result.substr(1)]();
		
	  	results[result] = add;
	}
	return results;
};
_.DateTime.DayDifference = function(date1, date2) {
	var largeDate = (date1.Time() > date2.Time()) ? Date.UTC(date1.Year(), date1.Month()-1, date1.Day()) :  Date.UTC(date2.Year(), date2.Month()-1, date2.Day());
	var smallDate = (date1.Time() > date2.Time()) ?  Date.UTC(date2.Year(), date2.Month()-1, date2.Day()) :  Date.UTC(date1.Year(), date1.Month()-1, date1.Day());
	return Math.floor(Math.abs(largeDate - smallDate) / (24*60*60*1000));
};
_.DateTime.Today = function() { 
	var dt = new Date();
	return new DateTime(
		dt.getFullYear(),
		dt.getMonth()+1,
		dt.getDate()
	);
};
})(window);
