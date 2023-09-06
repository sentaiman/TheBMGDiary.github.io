const STORAGE_KEY = "CEfSCfSM";
const VISIBILITY_FOR_DATE = "forDate";
const VISIBILITY_ALL = "all";
const VISIBILITY_ACTIVE = "active";
const VISIBILITY_COMPLETED = "completed";

//for fetch and save events from local storage
var eventStorage = {
    fetch: function() {
        var eventList = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        eventList.forEach(function(event, index) {
            event.id = index;
        });
        eventStorage.uid = eventList.length;
        return eventList;
    },
    save: function(eventList) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(eventList));
    }
};

//for get filtered events
var filters = {
    forDate: function(eventList, selectedDate) {
        return eventList.filter(function(event) {
            return event.date === selectedDate;
        });
    },
    all: function(eventList) {
        return eventList;
    },
    active: function(eventList) {
        return eventList.filter(function(event) {
            return !event.completed;
        });
    },
    completed: function(eventList) {
        return eventList.filter(function(event) {
            return event.completed;
        });
    }
};

Vue.component("create-event-form", {
    template: `<b-form class="create-event-form" @submit="onSubmit" inline>
        <input class="form-control event-title-input" type="text" autocomplete="off"
           placeholder="New event title..." v-model="eventTitle"
           @keyup.enter="createEvent" @input="updateInParent">
        </input>
        <b-button id="addEventBtn" variant="outline-light" @click="createEvent">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </b-button>
        <b-tooltip target="addEventBtn">
            Add new event
        </b-tooltip>
    </b-form>`,
    data: function() {
        return {
            eventTitle: ''
        };
    },
    methods: {
        //disable form submitting
        onSubmit: function(event) {
            event.preventDefault();
        },
        createEvent: function() {
            this.$emit("create", true);
            this.eventTitle = '';
        },
        updateInParent: function() {
            this.$emit("update", this.eventTitle);
        }
    }
});

new Vue({
    el: "#app",
    data: {
        //calendar
        today: moment(),
        dateContext: moment(),
        selectedDate: moment(),
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        //events
        newEventForm: {
            eventTitle: ""
        },
        eventList: eventStorage.fetch(),
        visibility: VISIBILITY_ALL,
        windowWidth: window.outerWidth,
        collapseEventList: true
    },
    watch: {
        eventList: {
            handler: function(eventList) {
                eventStorage.save(eventList);
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        //calendar
        year: function() {
            return this.dateContext.format("Y");
        },
        month: function() {
            return this.dateContext.format("MMMM");
        },
        daysInMonth: function() {
            return this.dateContext.daysInMonth();
        },
        currentDate: function() {
            return this.dateContext.get("date");
        },
        firstDayOfMonth: function() {
            let firstDay = moment(this.dateContext).subtract(
                this.currentDate,
                "days"
            );
            return firstDay.weekday();
        },
        previousMonth: function() {
            return moment(this.dateContext).subtract(1, "month");
        },
        previousMonthAsString: function() {
            return this.previousMonth.format("MMMM");
        },
        nextMonth: function() {
            return moment(this.dateContext).add(1, "month");
        },
        nextMonthAsString: function() {
            return this.nextMonth.format("MMMM");
        },

        daysInPreviousMonth: function() {
            return this.previousMonth.daysInMonth();
        },
        daysFromPreviousMonth: function() {
            let daysList = [];
            let count = this.daysInPreviousMonth - this.firstDayOfMonth;
            while (count < this.daysInPreviousMonth) {
                count++;
                daysList[count] = count;
            }

            return daysList.filter(function() {
                return true;
            });
        },

        dateList: function() {
            let $this = this;

            let dateList = [];

            let previousMonth = this.previousMonth;
            let nextMonth = this.nextMonth;

            //dates for display
            let formattedCurrentMonth = this.dateContext.format("MM");
            let formattedCurrentYear = this.year;
            let formattedPreviousMonth = previousMonth.format("MM");
            let formattedPreviousYear = previousMonth.format("Y");
            let formattedNextMonth = nextMonth.format("MM");
            let formattedNextYear = nextMonth.format("Y");

            //counters
            let countDayInCurrentMonth = 0;
            let countDayInPreviousMonth = 0;

            //filling in dates from the previous month
            this.daysFromPreviousMonth.forEach(function(dayFromPreviousMonth) {
                countDayInCurrentMonth++;
                countDayInPreviousMonth++;

                let formattedDay = $this.formattingDay(dayFromPreviousMonth);
                let previousMonth =
                    $this.daysFromPreviousMonth.length ===
                    countDayInPreviousMonth
                        ? $this.previousMonthAsString
                        : false;
                let previousYear =
                    formattedCurrentYear !== formattedPreviousYear &&
                    $this.daysFromPreviousMonth.length ===
                        countDayInPreviousMonth
                        ? formattedPreviousYear
                        : false;
                let additional = {
                    month: previousMonth,
                    year: previousYear
                };

                if (!previousMonth && !previousYear) {
                    additional = false;
                }

                dateList[countDayInCurrentMonth] = {
                    key: countDayInCurrentMonth,
                    dayNumber: formattedDay,
                    date:
                        formattedDay +
                        "." +
                        formattedPreviousMonth +
                        "." +
                        formattedPreviousYear,
                    blank: true,
                    today: false,
                    additional: additional,
                    weekDay: false,
                    moment: moment(
                        formattedPreviousYear +
                            formattedPreviousMonth +
                            formattedDay
                    )
                };
            });

            //filling in dates from the current month
            while (
                countDayInCurrentMonth <
                this.firstDayOfMonth + this.daysInMonth
            ) {
                countDayInCurrentMonth++;

                let day = countDayInCurrentMonth - countDayInPreviousMonth;
                let weekDay = this.getWeekDay(countDayInCurrentMonth);
                let formattedDay = this.formattingDay(day);

                dateList[countDayInCurrentMonth] = {
                    key: countDayInCurrentMonth,
                    dayNumber: formattedDay,
                    date:
                        formattedDay +
                        "." +
                        formattedCurrentMonth +
                        "." +
                        formattedCurrentYear,
                    blank: false,
                    today:
                        formattedDay === this.todayDate &&
                        this.todayInCurrentMonthAndYear,
                    additional: false,
                    weekDay: weekDay,
                    moment: moment(
                        formattedCurrentYear +
                            formattedCurrentMonth +
                            formattedDay
                    )
                };
            }

            let daysInNextMonth = 7 - (countDayInCurrentMonth % 7);
            let countDayInCurrentMonthSaved = countDayInCurrentMonth;
            let day = 0;

            //filling in dates from the next month
            if (daysInNextMonth < 7) {
                while (
                    countDayInCurrentMonth <
                    countDayInCurrentMonthSaved + daysInNextMonth
                ) {
                    countDayInCurrentMonth++;
                    day++;

                    let formattedDay = this.formattingDay(day);
                    let nextMonth = day === 1 ? this.nextMonthAsString : false;
                    let nextYear =
                        formattedCurrentYear !== formattedNextYear && day === 1
                            ? formattedNextYear
                            : false;
                    let additional = {
                        month: nextMonth,
                        year: nextYear
                    };

                    if (!nextMonth && !nextYear) {
                        additional = false;
                    }

                    dateList[countDayInCurrentMonth] = {
                        key: countDayInCurrentMonth,
                        dayNumber: formattedDay,
                        date:
                            formattedDay +
                            "." +
                            formattedNextMonth +
                            "." +
                            formattedNextYear,
                        blank: true,
                        today: false,
                        additional: additional,
                        weekDay: false,
                        moment: moment(
                            formattedNextYear +
                                formattedNextMonth +
                                formattedDay
                        )
                    };
                }
            }

            return dateList.filter(function() {
                return true;
            });
        },

        todayDate: function() {
            return this.formattingDay(this.today.get("date"));
        },
        todayMonth: function() {
            return this.today.format("MMMM");
        },
        todayYear: function() {
            return this.today.format("Y");
        },

        //get selected day and month
        todayInCurrentMonthAndYear: function() {
            return (
                this.month === this.todayMonth && this.year === this.todayYear
            );
        },

        //get selected day and month
        selectedDayAndMonth: function() {
            let dayAndMonth = this.selectedDate.format("DD MMMM");
            dayAndMonth = dayAndMonth.split(" ");
            dayAndMonth = {
                day: dayAndMonth[0],
                month: dayAndMonth[1]
            };

            return dayAndMonth;
        },

        //get selected weekday
        selectedWeekDay: function() {
            return this.selectedDate.format("dddd");
        },

        //comparison today with selectedDate
        todayIsEqualSelectDate: function() {
            return (
                this.selectedDate.format("YYYYMMDD") ===
                this.today.format("YYYYMMDD")
            );
        },

        //events
        /**
         *  get list events for selected in calendar date
         */
        eventListForSelectedDate: function() {
            return filters[VISIBILITY_FOR_DATE](
                this.eventList,
                this.selectedDate.format("DD.MM.YYYY")
            );
        },

        /**
         *  get filtered list events for selected in calendar date and completed filter
         */
        filteredEventListForSelectedDate: function() {
            return filters[this.visibility](this.eventListForSelectedDate);
        }
    },
    methods: {
        //calendar

        //changing date list
        addMonth: function() {
            this.dateContext = this.nextMonth;
        },
        subtractMonth: function() {
            this.dateContext = this.previousMonth;
        },

        //changing selected date
        setSelectedDate: function(moment) {
            if (
                this.selectedDate.format("YYYYMMDD") !==
                moment.format("YYYYMMDD")
            ) {
                this.selectedDate = moment;
                this.collapseEventList = false;
            } else {
                this.collapseEventList = !this.collapseEventList;
            }
        },

        //set selected date as today
        goToday: function() {
            this.selectedDate = this.today;
            this.dateContext = this.today;
        },

        //add 0 before [1..9] numbers in day
        formattingDay: function(day) {
            return ("0" + day).slice(-2);
        },

        //get weekday from data Weekdays
        getWeekDay: function(day) {
            let index = day;
            if (index > 7) {
                index %= 7;
            }
            index = index === 0 ? 6 : index - 1;
            return this.days[index];
        },

        //selected date compare with date
        dateIsEqualSelectDate: function(date) {
            return (
                this.selectedDate.format("YYYYMMDD") ===
                date.moment.format("YYYYMMDD")
            );
        },

        //events

        //disable form submitting
        onSubmit: function(event) {
            event.preventDefault();
        },
        //adding event
        createEvent: function() {
            let eventTitle =
                this.newEventForm.eventTitle &&
                this.newEventForm.eventTitle.trim();
            if (!eventTitle) {
                return;
            }
            this.eventList.push({
                id: eventStorage.uid++,
                title: eventTitle,
                completed: false,
                date: this.selectedDate.format("DD.MM.YYYY")
            });
            this.newEventForm.eventTitle = "";
        },

        changeCompletedEvent: function(event) {
            event.completed = !event.completed;
        },

        deleteEvent: function(event) {
            let index = this.eventList.indexOf(event);
            this.eventList.splice(index, 1);
        },

        changeVisibility: function(visibility) {
            if (filters[visibility]) {
                this.visibility = visibility;
            } else {
                this.visibility = VISIBILITY_ALL;
            }
        }
    },
    filters: {
        capitalize: function(value) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener("resize", () => {
                this.windowWidth = window.innerWidth;
            });
        });
    }
});
