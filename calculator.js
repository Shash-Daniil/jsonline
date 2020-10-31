function calculator(string) {
	let result = 0
	let tmp = string.split(' ')

	if(tmp.length != 3) throw Error

	let [a, op, b] = tmp

	if(isRoman(a) && isRoman(b) === true) {
		result = calculateRoman(a, op, b)
		return result
	}

	if((a <= 10 && a >= 1) && (b <= 10 && b >= 1)) {
		result = calculateArab(a, op, b)
		return result.toString()
	} else {
		throw Error
	}
}

function calculateArab(a, op, b) {
	a = parseInt(a)
	b = parseInt(b)
	switch(op) {
		case '+': return a + b
		case '-': return a - b
		case '*': return a * b
		case '/': return Math.trunc(a / b)
	}
}

function calculateRoman(a, op, b) {
	a = rtoa(a)
	b = rtoa(b)
	if (b >= a && op == '-') return ''
  if (a > 10 || b > 10) throw Error
	let res = calculateArab(a, op, b)
	res = ator(res)
	return res
}

function isRoman(a) {
	let rome = ['I','V','X']
	if (rome.indexOf(a[0]) != -1) {
		return true
	}
	return false
}

function rtoa(x) { //roman to arab 
	romes = {
		"I": 1,
		"V": 5,
		"X": 10,
	} /*сюда можно добавлять и другие римские числа,
	 	будет работать по идее)), только еще в
     функцию ator и isRoman надо добавить их же*/
	x = x.split('')
	x = x.map(e => romes[e])
	let tmp = [...x]
	let indexOfBiggest = x.indexOf(Math.max(...x))
	x = x.map(e => {
		if (tmp.indexOf(e) < indexOfBiggest) {
			tmp[tmp.indexOf(e)] = 0
			return -e
		} else {
			tmp[tmp.indexOf(e)] = 0
			return e
		}
	})
	res = x.reduce((a, e) => e += a, 0)
	return res
}

function ator(num) { // arab to roman
	let RomanSymbols = {
		'C': 100,
		'XC': 90,
		'L': 50,
		'XL': 40,
		'X': 10,
		'IX': 9,
		'V': 5,
		'IV': 4,
		'I': 1,
	}
	
	let values = Object.values(RomanSymbols)
	let keys = Object.keys(RomanSymbols)
	let res = []
	while (num > 0) {
		let i = 0
		if (num == values[i]) {
			res.push(keys[i])
			break
		}
		while (num < values[i]) {
			if (num >= values[i + 1]) {
				res.push(keys[i + 1])
				num -= values[i + 1]
			}
			i++
		}
	}
	res = res.join('')
	return res
}


module.exports = calculator; // Не трогайте эту строчку