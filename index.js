// Get references to the tbody element, input fields and button
var $tbody = document.querySelector("tbody");
var $timeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#loadmore");
var $goBackBtn = document.querySelector("#goback");

//var $loadMoreBtn = document.querySelector("#alientable");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$loadMoreBtn.addEventListener("click", loadMore);
$goBackBtn.addEventListener("click", goBack);

// Set filteredDataSet to dataSet initially
var filteredDataSet = dataSet;

var startNum = 0;
var endNum = 50;

// renderTable renders the filteredDataSet to the tbody
function renderTable(pageStart, pageEnd) {
  $tbody.innerHTML = "";
    
  maxEnd = filteredDataSet.length;    

  for (var i = pageStart; i < pageEnd; i++) {
    console.log(filteredDataSet.length); 
    var data = filteredDataSet[i];
    var fields = Object.keys(data);    

    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow();
    for (var j = 0; j < fields.length; j++) {
        
      // For every field in the table object, create a new cell at set its inner text to be the current value at the current field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}


function retrieveData()  {
     // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filteredDateTime = $timeInput.value.trim().toLowerCase();
  var filteredCity = $cityInput.value.trim().toLowerCase();
  var filteredState = $stateInput.value.trim().toLowerCase();
  var filteredCountry = $countryInput.value.trim().toLowerCase();
  var filteredShape = $shapeInput.value.trim().toLowerCase(); 

  // Set filteredDataSet to an array of all addresses whose "state" matches the filter
  filteredDataSet = dataSet.filter(function(data) {
    var dateTimeField = data.datetime.toLowerCase();
    var cityField = data.city.toLowerCase();
    var stateField = data.state.toLowerCase();
    var countryField = data.country.toLowerCase();
    var shapeField = data.shape.toLowerCase();
  
    // check if the info in the database is strictly equal to the info entered
    // only return database info if it is, otherwise don't
    // also allow for some empty fields  
      
    return ((filteredDateTime === "" || dateTimeField === filteredDateTime) &&
           (filteredCity === "" || cityField === filteredCity) &&
           (filteredCountry === "" || countryField === filteredCountry) &&
           (filteredState === "" || stateField === filteredState) &&
           (filteredShape === "" || shapeField === filteredShape));
  });
}

function handleSearchButtonClick() {
  retrieveData();
  renderTable(startNum, endNum);
}

function loadMore () {
    retrieveData();
    
    //check to see if you're at the beginning
    if (endNum == 0) {
        $goBackBtn.classList.remove('disabled');
    }
    
    startNum = startNum + 50;
    endNum = endNum + 50;
    
    if (endNum > filteredDataSet.length) {
        endNum = filteredDataSet.length;
        $loadMoreBtn.classList.add("disabled");
    }
    
    renderTable(startNum, endNum);
}

function goBack() {
    event.preventDefault();
    
    retrieveData();
    
    //check to see if you're at the end already
    if (endNum >= filteredDataSet.length) {
        $loadMoreBtn.classList.remove('disabled');
    }
    
    
    console.log(startNum);
    console.log(endNum);
    startNum = startNum - 50;
    endNum = endNum - 50;
    
    if (startNum == 0) {
         $goBackBtn.classList.add("disabled");
    }
    renderTable(startNum, endNum);
}

// Render the table for the first time on page load
// not doing this because the dataset is too big/too much
// it's neater starting with an empty table
// renderTable();
