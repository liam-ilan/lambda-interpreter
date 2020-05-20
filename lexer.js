// compelexMatch returns an object, with keys as indexes and matches as values
function complexMatch(str, re, currentIndex = 0) {

  // init res
  let res = {}

  // match
  let match = str.match(re)

  // if we found something
  if (match !== null) {

    // add to res
    res[match.index + currentIndex] = match[0]

    // cut current match out of str
    let newStr = str.split('') 
    newStr.splice(match.index, match[0].length)
    newStr = newStr.join('')

    // recursively call complexMatch on newStr
    res = {...res, ...complexMatch(newStr, re, match[0].length + currentIndex)}
  }

  // return
  return res
}

// table to keep all our tokens
// priority goes top down
const tokenTable = [
  {re: /lambda /,                           res: (val) => 'lambda'},
  {re: /\./,                                res: (val) => '.'},
  {re: /\(/,                                res: (val) => '('},
  {re: /\)/,                                res: (val) => ')'},
  {re: /=/,                                 res: (val) => '='},
  {re: /[a-zA-Z0-9]+/,                      res: (val) => val}
]

// returns list of tokens
function lex(str) {

  // res
  let res = new Array()

  // taken = indexes to ignore
  let taken = []

  // for each token in table
  tokenTable.forEach((item) => {

    // complex match
    let match = complexMatch(str, item.re)

    // for eatch match
    Object.keys(match).forEach((index) => {

      // indexes taken by this token (filter out taken)
      tokenIndexes = new Array(match[index].length).fill(null).map((item, i) => i + parseInt(index))
      tokenIndexes = tokenIndexes.filter((i) => !taken.includes(i))

      // if takes indexes
      if (tokenIndexes.length !== 0) {
        newStr = tokenIndexes.reduce((acc, i) => acc + str[i], '')

        // get token and put in res
        res[tokenIndexes[0]] = item.res(newStr)
        taken = [...taken, ...tokenIndexes]
      }
    })
  })

  // remove empty
  res = res.filter((item) => {return item})

  return res
}

module.exports = lex