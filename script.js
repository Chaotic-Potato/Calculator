let get = function(d) {return document.getElementById(d)}
let getInt = function(d) {return parseInt(get(d).value)}
let dDig = function(n) {return Math.floor(n / 10) + "" + (n % 10)}

var Calc = {
	timers: [],
	count: 0,
	add: function() {
		let newTimer = new Timer(getInt("min-start"), getInt("sec-start"), getInt("q-start"), getInt("min-dur"), getInt("sec-dur"))
		Calc.timers.push(newTimer)
		let row = get("out").insertRow(-1)
		row.id = Calc.count
		let txt = [newTimer.ms + ":" + dDig(newTimer.ss), newTimer.qs, newTimer.me + ":" + dDig(newTimer.se), newTimer.qe]
		for (let i = 0; i < txt.length; i++) {
			let cell = row.insertCell(-1)
			let div = document.createElement("SPAN")
			div.textContent = txt[i]
			cell.classList.add("output")
			cell.appendChild(div)
		}
		let cell = row.insertCell(-1)
		cell.innerHTML += "<button onclick='Calc.del(\"" + row.id + "\")'>DEL</button>"
		Calc.count++
	},
	del: function(id) {
		get(id).outerHTML = ""
	}
}

var Timer = function(ms, ss, qs, md, sd) {
	this.ms = ms
	this.ss = ss
	this.qs = qs

	let start = (ms * 60) + ss + ((5 - qs) * 900)
	let dur = (md * 60) + sd
	let end = start - dur

	this.me = Math.floor((((end - 1) % 900) + 1) / 60)
	this.se = end % 60
	this.qe = 5 - Math.floor((end - 1) / 900)
}
