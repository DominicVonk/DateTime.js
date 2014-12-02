/**
 * Author: Dominic Vonk
 * Class: DateTime
 */
 
(function(_) { 
_.DateTime = function (year, month, day, hour, minute, second) {
	
		var date;
		if (typeof month === "undefined") {
			date = new Date(year);
		} else {
			date = new Date(year, month, (typeof day !== "undefined" ? day : 1), (typeof hour !== "undefined" ? hour : 0), (typeof minute !== "undefined" ? minute : 0), (typeof second !== "undefined" ? second : 0));
		}
		return {
			AddDays : function(days) {
				date = new Date(date.getTime() + (days * 24*60*60*1000));
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
			  return date.getDay();
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
			}
		};
	
};
_.DateTime.UTC = function() {
	var now = new Date();
	dt = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	return new _.DateTime(
		parseInt(dt.getFullYear()),
		parseInt(dt.getMonth()),
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
		parseInt(dt.getMonth()),
		parseInt(dt.getDate()),
		parseInt(dt.getHours()),
		parseInt(dt.getMinutes()),
		parseInt(dt.getSeconds())
	);
};
_.DateTime.Difference = function(date1, date2) {
	var largeDate = (date1.Time() > date2.Time()) ? date1 : date2;
	var smallDate = (date1.Time() > date2.Time()) ? date2 : date1;
	var results = {
		years: 0,
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds : 0
	};
	for(var result in results) {
		var add = 0;
		if (result == "years") {
			while (largeDate.Year() > smallDate.Year()) {
				add++;
				smallDate.AddYears(add);
			}
		}
		else if (result == "months") {
			while (largeDate.Month() > smallDate.Month()) {
				add++;
				smallDate.AddMonths(add);
			}
		}
		else if (result == "days") {
			while (largeDate.Day() > smallDate.Day()) {
				add++;
				smallDate.AddDays(add);
			}
		}
		else if (result == "hours") {
			while (largeDate.Hour() > smallDate.Hour()) {
				add++;
				smallDate.AddHours(add);
			}
		}
		else if (result == "minutes") {
			while (largeDate.Minute() > smallDate.Minute()) {
				add++;
				smallDate.AddMinutes(add);
			}
		}
		else if (result == "seconds") {
			while (largeDate.Second() > smallDate.Second()) {
				add++;
				smallDate.AddSeconds(add);
			}
		}
	  results[result] = add;
	}
	return results;
};
_.DateTime.Today = function() { 
	var dt = new Date();
	return new DateTime(
		dt.getFullYear(),
		dt.getMonth(),
		dt.getDate()
	);
};
})(window);
