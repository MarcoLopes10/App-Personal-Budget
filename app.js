class Expense {
	constructor(year, month, day, type, description, value) {
		this.year = year
		this.month = month
		this.day = day
		this.type = type
		this.description = description
		this.value = value
	}

	validateData() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getNextId() {
		let nextId = localStorage.getItem('id')
		return parseInt(nextId) + 1
	}

	save(d) {
		let id = this.getNextId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	getAllRecords() {

		//array de expenses
		let expenses = Array()

		let id = localStorage.getItem('id')

		//Get all data from expenses register in localStorage
		for(let i = 1; i <= id; i++) {

			//Get Expenses
			let expense = JSON.parse(localStorage.getItem(i))

			//There'a a possibilaty of index that is removed
			//For that cases we will jump that index
			if(expense === null) {
				continue
			}
			expense.id = i
			expenses.push(expense)
		}

		return expenses
	}

	search(expense){

		let expensesFilter = Array()
		expensesFilter = this.getAllRecords()
		console.log(expensesFilter);
		console.log(expense)

		//Year
		if(expense.year != ''){
			console.log("Year Filter");
			expensesFilter = expensesFilter.filter(d => d.year == expense.year)
		}
			
		//Month
		if(expense.month != ''){
			console.log("Month Filter");
			expensesFilter = expensesFilter.filter(d => d.month == expense.mount)
		}

		//Day
		if(expense.day != ''){
			console.log("Day Filter");
			expensesFilter = expensesFilter.filter(d => d.day == expense.day)
		}

		//Type
		if(expense.type != ''){
			console.log("Type Filter");
			expensesFilter = expensesFilter.filter(d => d.type == expense.type)
		}

		//Description
		if(expense.description != ''){
			console.log("Description Filter");
			expensesFilter = expensesFilter.filter(d => d.description == expense.description)
		}

		//Value
		if(expense.value != ''){
			console.log("Value Filter");
			expensesFilter = expensesFilter.filter(d => d.value == expense.value)
		}

		
		return expensesFilter

	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function registerExpense() {

	let year = document.getElementById('year')
	let month = document.getElementById('month')
	let day = document.getElementById('day')
	let type = document.getElementById('type')
	let description = document.getElementById('description')
	let value = document.getElementById('value')

	let expense = new Expense(
		year.value, 
		month.value, 
		day.value, 
		type.value, 
		description.value,
		value.value
	)


	if(expense.validateData()) {
		bd.save(expense)

		document.getElementById('modal_title').innerHTML = 'New Record of Expense Insert with Sucess'
		document.getElementById('modal_title_div').className = 'modal-header text-success'
		document.getElementById('modal_content').innerHTML = 'Expense was register with sucess!'
		document.getElementById('modal_btn').innerHTML = 'Back'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//Dialog of Sucess
		$('#modalRegisterExpense').modal('show') 

		year.value = '' 
		month.value = ''
		day.value = ''
		type.value = ''
		description.value = ''
		value.value = ''
		
	} else {
		
		document.getElementById('modal_title').innerHTML = 'Error in the Inclusion of the Record'
		document.getElementById('modal_title_div').className = 'modal-header text-danger'
		document.getElementById('modal_content').innerHTML = 'Error Saving, check if every Fields are Correctly Field!'
		document.getElementById('modal_btn').innerHTML = 'Back and Check'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//Dialog de Error
		$('#modalRegisterExpense').modal('show') 
	}
}

function getListExpenses(expenses = Array(), filtro = false) {

    if(expenses.length == 0 && filtro == false){
		expenses = bd.getAllRecords() 
	}
	
	let listExpenses = document.getElementById("listExpenses")
    listExpenses.innerHTML = ''
	expenses.forEach(function(d){

		//Making a New Line (tr)
		var line = listExpenses.insertRow();

		//Making the Columms (td)
		line.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}` 

		//Set the Type
		switch(d.type){
			case '1': d.type = 'Food'
				break
			case '2': d.type = 'Education'
				break
			case '3': d.type = 'Recreation'
				break
			case '4': d.type = 'Helth'
				break
			case '5': d.type = 'Transportation'
				break
			
		}
		line.insertCell(1).innerHTML = d.type
		line.insertCell(2).innerHTML = d.description
		line.insertCell(3).innerHTML = d.value

		//Make the Button 
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'
		btn.id = `id_expense_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_expense_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		line.insertCell(4).append(btn)
		console.log(d)
	})

 }

 
 function queryExpense(){
	 
	let year  = document.getElementById("year").value
	let month = document.getElementById("month").value
	let day = document.getElementById("day").value
	let type = document.getElementById("type").value
	let description = document.getElementById("description").value
	let value = document.getElementById("value").value

	let expense = new Expense(year, month, day, type, description, value)

	let expenses = bd.search(expense)
	 
	this.getListExpenses(expenses, true)

 }
