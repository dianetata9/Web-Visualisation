// capture references to the interactive web page html elements
//Note, on the html index page, the data.js file is included before the app.js\
// so every variable, object of function defined there is also accessible here and any
//following script file

var datePicker = document.querySelector('#datetime'),
	ufoTable = document.querySelector('#ufo-table'),
	filterButton = document.querySelector('#filter-btn');

	function renderTable(table){
		if(table.length == 0) return;
		var tbody = ufoTable.tBodies[0]

		function clearCurrentContent(){
			console.log('clearing tbody contents')

			Array.from(tbody.rows).forEach(r => {			
				r.remove()
			})
		}

		function buildRow(record){			
			let tr = document.createElement('tr')
			if(record == null){
				return null;
			}
			[].forEach.call(Object.keys(record), function(key){
					let td = document.createElement('td')
					td.innerText = record[key]
					tr.appendChild(td)
				});
			return tr
		}

		//clear existing content
		clearCurrentContent()

		//append table rows only to the <tbody> element
		
		Array.from(table || []).forEach(function(rec){			
			let tr = buildRow(rec)
			tbody.appendChild(tr)
		})
	}

	function filterByDate(date, table){
		date = new Date(date.toLocaleDateString())

		let filteredTable = table.filter(function(entry){			
			let recordDate = new Date(entry.datetime)
			return date.getTime() === recordDate.getTime()
		})

		return filteredTable
	}

	function handleFilterTableClick(event){
		event.preventDefault()
		let userSelectedDate = datePicker.valueAsDate
		if(userSelectedDate == null){
			alert('Undefined date entered')
			return
		}

		let filteredTable = filterByDate(userSelectedDate, data)  || []// data variable is defined in the data.js file

		renderTable(filteredTable);
	}

	//hook the filter event handler to the event

	filterButton.addEventListener('click', handleFilterTableClick);

	//pre-display the current table

	(function(dataArray){
		renderTable(dataArray)
	})(data)