# Aliens R Real - JavaScript and DOM Manipulation

### Automatic Table and User Search

* basic HTML web page

* Uses ufo sighting dataset provided in the form of a JavaScript object

* appends a table to web page and then adds new rows of data for each UFO sighting

* user can to set multiple filters and search for UFO sightings using the following criteria based on the table columns: 

  1. `date/time`
  2. `city`
  3. `state`
  4. `country`
  5. `shape`

### Paginated Table

* client-side pagination that only displays a maximum of 50 results at a time (e.g. 50 results per page)

* These changes happen in the DOM using JavaScript (the user is never directed to another web page as they paginate through the results.)

* pagination mostly works, except the user will have to refresh the page to run a clean search as the variables were not cleared. also disabling the previous/next buttons based on hitting the ends can be a bit buggy/inconsistent