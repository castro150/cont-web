(function() {
	'use strict';

	/**
	 * @ngdoc overview
	 * @name contWebApp
	 * @description # contWebApp
	 * 
	 * Main module of the application.
	 */
	angular.module('contWebApp').config(function(calendarConfig) {
				calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
				calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
				calendarConfig.i18nStrings.weekNumber = 'Semana {week}'; //This will set the week number hover label on the month view
				calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.
				calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.
				calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.
			});
})();
