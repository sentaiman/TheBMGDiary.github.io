let btn = document.querySelector("#addBtn");
let listItems = document.querySelector("#listItems");
let eventAdd = document.querySelector("#eventAdd");
let delBtn = document.getElementsByClassName("delBtn");
let editBtn = document.getElementsByClassName("editBtn");
let saveEdit = document.getElementsByClassName("saveEdit");
let inputs = [];
let daysEvents = document.querySelector("#daysEvents")
let listOptions = document.querySelector(".listOptions")
let backMonth = document.querySelector("#backMonth"), forwardMonth = document.querySelector("#forwardMonth")
let editMode = 0;
let monthEvents = document.querySelector(".monthEvents");
let monthListItems = document.querySelector("#monthListItems");


let calendar = document.querySelector("#calendar");
let dateObj = new Date();
presentMonth = dateObj.getMonth();
presentYear = dateObj.getFullYear();

viewingMonth = presentMonth;
viewingYear = presentYear;



newerDATE = new Date(2020,05,30)///////////
console.log(newerDATE);
currentDAY = newerDATE.getDay();
console.log(currentDAY);

document.querySelector(".todayDate").innerText = dateObj.getDate();
dayConvert = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
document.querySelector(".todayDay").innerText = dayConvert[dateObj.getDay()];

let monthHas30Days = [3, 5, 8, 10];

//rewrite this function to spit out amt of days in a given month. then call this function on today's month, in order to return dIM (important var!!!)

function daysInGivenMonth(year, month){
  //thisMonth = dateObj.getMonth(); //calculating number of days in the month
  month == 1 && (year % 4 == 0) ? daysInMonth = 29 
    : month == 1 && (year % 4 !== 0) ? daysInMonth = 28
  : monthHas30Days.includes(month) ? daysInMonth = 30 
  : daysInMonth = 31;
  return daysInMonth;
}

//dayOfWeek offset for the start of each month:
function getFirstDayOfMonth(year, month) {
  viewingMonthDateObj = new Date(year, month, 00)
  return firstDayOfMonth = viewingMonthDateObj.getDay() + 1;
}
  //if 0 = Sunday, so no offset.

function monthName(month){
  names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return names[month]
}

daysInMonth = daysInGivenMonth(viewingYear, viewingMonth)

// Setting month and year for present month
$(".monthYear").text(`${monthName(presentMonth)} ${presentYear}`)

class Month {
  constructor(monthNum) {
    this.name = monthName(monthNum);
    this.dayCount = daysInGivenMonth(viewingYear, monthNum);
  }
}


//    Return to current month button    //

$(".returnMonth").click(() => {
  $("#calendar").fadeOut(20).fadeIn(180);
  $(".returnMonth").css("visibility", "hidden");

  viewingMonth = presentMonth;
  viewingYear = presentYear;

  console.log(viewingMonth);
  switchedMonth = new Month(viewingMonth);
  console.log(switchedMonth);
  createMonth(switchedMonth.dayCount);
  $(".monthYear").text(`${switchedMonth.name} ${viewingYear}`)

  dateActivate();
  updateMonthList();
  cancelSelected();
  }
);

function createMonth(daysInMonth){
  while (calendar.children.length > 7) {
    calendar.removeChild(calendar.lastChild);
  }

  firstDayOfMonth = getFirstDayOfMonth(viewingYear, viewingMonth);

  for (let i = 0; i < firstDayOfMonth && firstDayOfMonth !== 7; i++){
    let dates = document.createElement("DIV");
    dates.textContent = daysInGivenMonth(viewingYear, viewingMonth-1)-firstDayOfMonth+i+1;
    dates.className = "prevMonthDayNum"
    calendar.appendChild(dates)
  };

  //Creating text for each day in the given month

  for (let i = 1; i <= daysInMonth; i++) {
      let dates = document.createElement("DIV");
      dates.textContent = i;
      dates.className = "dayNum"
      calendar.appendChild(dates)
      if (i==dateObj.getDate() && dateObj.getMonth() == viewingMonth && dateObj.getFullYear() == viewingYear){
        dates.classList.add("today")
        console.log(dates.classList);
        document.querySelector(".today").classList.add("currentDate")}
  }


  //Placeholder dates for days in upcoming month
  remainderSpaceLimit = ((getFirstDayOfMonth(viewingYear, viewingMonth) + daysInGivenMonth(viewingYear, viewingMonth))>35)?42:35;
  console.log(remainderSpaceLimit);
  for (let i = 1; i <= (remainderSpaceLimit - (getFirstDayOfMonth(viewingYear, viewingMonth) + daysInGivenMonth(viewingYear, viewingMonth))); i++) {
    console.log(35 - (getFirstDayOfMonth(viewingYear, viewingMonth) + daysInGivenMonth(viewingYear, viewingMonth)))
    console.log(i + firstDayOfMonth)
    console.log(getFirstDayOfMonth(viewingYear, viewingMonth + 1))
    let dates = document.createElement("DIV");
    dates.textContent = i;
    dates.className = "prevMonthDayNum"
    calendar.appendChild(dates)
  };  
}

createMonth(daysInMonth);

////////BACK AND FWD MONTH FUNCTIONALITY/////

$(backMonth).click(showPrevMonth);
$(forwardMonth).click(showNextMonth);

function showPrevMonth (){
  $("#calendar").fadeOut(20).fadeIn(180);

  if (viewingMonth == 0){
    viewingMonth = 11;
    viewingYear --;
  } else{
    viewingMonth--;
  }

  console.log("Now viewing" + viewingMonth + ". But actual is " + presentMonth)
  console.log(viewingMonth);
  switchedMonth = new Month(viewingMonth);
  console.log(switchedMonth);
  createMonth(switchedMonth.dayCount);
  $('.monthYear').text(`${switchedMonth.name} ${viewingYear}`)

  if (viewingMonth !== presentMonth || viewingYear !== presentYear){
    $('.returnMonth').css('visibility', 'visible')
  } else {
    $('.returnMonth').css('visibility', 'hidden')
  }

  dateActivate();
  updateMonthList();
  cancelSelected();
}


function showNextMonth() {
  $("#calendar").fadeOut(20).fadeIn(180);

  if (viewingMonth == 11) {
    viewingMonth = 0;
    viewingYear++;
  } else {
    viewingMonth++;
  }

  console.log("Now viewing" + viewingMonth + ". But actual is " + presentMonth)
  console.log(viewingMonth);
  switchedMonth = new Month(viewingMonth);
  console.log(switchedMonth);
  createMonth(switchedMonth.dayCount);
  $(".monthYear").text(`${switchedMonth.name} ${viewingYear}`)

  if (viewingMonth !== presentMonth || viewingYear !== presentYear) {
    $('.returnMonth').css('visibility', 'visible')
  } else {
    $('.returnMonth').css('visibility', 'hidden')
  }

  dateActivate();
  updateMonthList();
  cancelSelected();
}

//////////////////////


function showMonthEvents(){
  console.log("Hi months")
  daysEvents.style.visibility = "visible";
  document.querySelector("#daysEventsTop").style.visibility = "hidden";
  document.querySelector("#listContainer").style.visibility = "hidden";
}

//showMonthEvents();

function dateActivate(){
  let dayNum = document.querySelectorAll(".dayNum");
  console.log("activating days!!")
  console.log(dayNum);
  dayNum.forEach(item => {
      item.addEventListener("click", (e) => { 
        $("#daysEventsTop").fadeIn(150); 

      dayNum.forEach(item => {item.classList.remove("currentlySelected")});
      document.querySelector("#daysEventsTop").style.visibility = "visible";
        document.querySelector("#listContainer").style.visibility = "visible";  
      console.log(item.innerText)
      e.target.classList.add("currentlySelected")
        console.log(e.target.classList)

      monthEvents.style.display = "none";
      daysEvents.style.visibility = "visible";
      eventAdd.addEventListener("click", () =>{
        eventAdd.placeholder = "";
      })

      let eventAdder = document.querySelector("#addEventTitle")
        eventAdder.innerHTML = `<span class="inlineText">Add an event to <span class="inlineText"> ${monthName(viewingMonth)} ${item.innerText}`
          itemInner = item.innerText
          
          clickedDate = itemInner;
          console.log(clickedDate);
          updateList();
          updateMonthList();
          eventAdd.placeholder = "What's on today?"

        }
      )
    }
  );
}

dateActivate();

document.querySelector(".cancelSelected").addEventListener("click", cancelSelected)

function cancelSelected(){
  $("#daysEventsTop").fadeOut(150); 
  $(".monthEvents").delay(150).fadeIn(150);
};

JSON.parse(localStorage.getItem("calData")) ? items = JSON.parse(localStorage.getItem("calData")) : items = [];
updateMonthList();

class ListItem {
  constructor(name) {
    this.date = clickedDate;
    this.month = viewingMonth;
    this.year = viewingYear; 
    this.id = viewingYear.toString() + viewingMonth.toString() + clickedDate.toString() + items.length.toString();
    this.name = name;
    this.color = "#000000";
    console.log(items)
  }
}

//btn.addEventListener("click", addListItem);
eventAdd.addEventListener("keyup", e => {
  if (e.keyCode === 13 && eventAdd.value != ""){addListItem()}
});

function addListItem () {
  items.push(new ListItem(eventAdd.value))
  console.log("Item Added to List")
  items.forEach(item => console.log("List items are: " + item.name))
  eventAdd.value = "";
  updateList();
  buttonActivate();
};

function buttonActivate () {
  console.log("Activating buttons!")
  itemsOnThisDay = items.filter(item => item.date == clickedDate && item.month == viewingMonth && item.year == viewingYear)
  console.log("Amt of items today: " + itemsOnThisDay.length);

  if (document.querySelectorAll(".itemText").length != 0 && document.querySelectorAll(".listOptions").length != 0){
    for (let i = 0; i < itemsOnThisDay.length; i++){
      console.log(document.querySelectorAll(".itemText"))
        document.querySelectorAll(".itemText")[i].addEventListener("click", editItem);
      }
      for (let i = 0; i < itemsOnThisDay.length; i++) {
        document.querySelectorAll(".listOptions")[i].addEventListener("click", delItem)
    }
  }
}

function editItem(e){
  for (i = 0; i < e.path.length; i++) {
    if (/list-text/.test(e.path[i].id)) {pathNum = i};
  }

  parentIdName = e.path[pathNum].id
  console.log(parentIdName) //jun 2 event 0 == 2020520
  let parentIdNum = parentIdName.slice(9);
  console.log(parentIdNum)
  let parentEl = document.querySelector(`#list-text${parentIdNum}`);
  console.log(parentEl)

  if (editMode == 0 && document.querySelectorAll("#itemEditor").length < 1){
    console.log("New box made")
    var editBox = document.createElement('textarea')
    editBox.id = "itemEditor";
    editBox.type = "textarea";
    editBox.wrap = "hard";
    editBox.contentEditable = "true";
    editBox.value = document.querySelector(`#list-item${parentIdNum}`).innerText;
    parentEl.appendChild(editBox)
    editBox.focus();
    editMode = 1;
    console.log(document.querySelectorAll("#itemEditor").length)

  let saveEdit = document.createElement('button')
  saveEdit.id = "saveItem"
  saveEdit.innerText = "Save Edit"
  //parentEl.appendChild(saveEdit)

    document.querySelector(`#list-item${parentIdNum}`).style.display = "none";
 
  for (i = 0; i < parentEl.children.length; i++){
    if (/saveItem/.test(parentEl.children[i].id)){saveBtnPath = i};
  }
  for (i = 0; i < parentEl.children.length; i++) {
    if ((parentEl.children[i].classList[0] === "list")) {pathNumList = i};
  }
  for (i = 0; i < parentEl.children[pathNumList].children.length; i++) {
    if ((parentEl.children[pathNumList].children[i].classList[0] === "itemText")) { pathNumEditBtn = i };
  }

  //parentEl.children[pathNumList].children[pathNumEditBtn].style.display = "none";

  function acceptEdit() {
    s = items.map(item => (item.id == parentIdNum))
    items[s.indexOf(true)].name = editBox.value;
    console.log(items);
    updateList(); 
  }

  //e.path[pathNum].children[saveBtnPath].addEventListener("click", acceptEdit)
  
  editBox.addEventListener("keyup", e => { if (e.keyCode === 13 && editBox.value != "") acceptEdit()})

  editMode = 0;

  }
}


function delItem(e) {
  console.log(items);
  console.log(e.path[2].children[0].id)

  parentIdName = e.path[2].children[0].id 
  console.log("The ID number is: " + parentIdName)
  let parentIdNum = parentIdName.slice(9)
  console.log("Del is looking for " + parentIdNum)
  s = items.map(item => (item.id == parentIdNum))
  console.log(s);
  items.splice(s.indexOf(true), 1);
  console.log(items)
  updateList();
}

function updateList(){
  console.log("Now updating...")
  localStorage.setItem("calData", JSON.stringify(items));
  listItems.innerHTML = "";
  items.forEach((item, id) => {
    (item.date == clickedDate && item.month == viewingMonth && item.year == viewingYear) ? listItems.innerHTML += 
    `<li class = "singleItem">
      <div class="itemText" id="list-text${item.id}"><span id = "list-item${item.id}">${item.name}</span>
      <div class="list">
      </div>
      </div>

      <div class="itemOptions">
        <p class="listOptions">...</p>
      </div>

    </li>` : ""
  }
  )
  buttonActivate();
  updateMonthList();
}

function updateMonthList(){
  monthListItems.innerHTML = "";
  console.log(items)
  sorted = items.sort(function (a, b) { return a.date - b.date });
  
  sorted.forEach(item => {
    console.log(item.date)

  })

  let startDate = 0;
  sorted.forEach((item, id) => {
    if (item.month == viewingMonth && item.year == viewingYear){
      
      if (startDate != item.date) {
        monthListItems.innerHTML += 
        `<li class = "singleMonthItem">
      <h4>On ${monthName(viewingMonth)} ${item.date}:</h4>`};
      startDate = item.date;
      monthListItems.innerHTML +=
      `<div class="monthItemText" id="month-text${item.id}">
      <span id = "monthList-item${item.id}">${item.name}</span>
        <div class="list">
        </div>
      
      </div>
      </li>`}
      }
  )
}
