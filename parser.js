const classes = require('./classes')

function parse (tokens) {
  // ID
  if (tokens.length === 1) {
    return new classes.Id(tokens[0])
  }

  // FUNCTION
  if (tokens[0] === 'lambda') {
    return new classes.Function(parse([tokens[1]]), parse(tokens.slice(3, tokens.length)))
  }

  // ASSIGNMENT
  if (tokens[1] === '=') {

    // count until next assignment
    let i = 0
    for (token of tokens) {
      i += 1
      if (tokens[i + 1] === '=') break;
    }

    // runtimeList stores argument for classes.Runtime
    // this is the current assignment and the next one if it exists
    let runtimeList = [new classes.Assignment(parse([tokens[0]]), parse(tokens.slice(2, i)))]
    if (i !== tokens.length) {runtimeList.push(...parse(tokens.slice(i, tokens.length)).assignments)}

    return new classes.Runtime(runtimeList)
  }

  // EXPRESSION
  let depth = 0
  let currentItem = []
  let foundLambda = false

  // items will hold all items inside tokens (grouped by their respective brackets if they have any)
  let items = []

  // for each token
  for (token of tokens) {
    if (token === ')') depth -= 1

    if (depth === 0) {

      // if we haven't found a function
      if (!foundLambda) {

        // if current item exists, push
        if (currentItem.length !== 0) {items.push(currentItem)}
        currentItem = []

        // if we found lambda
        if (token === 'lambda') {
          foundLambda = true
          currentItem.push(token)
        }

        else if (token !== '(' && token !== ')') {items.push([token])}

      } else {
        // if lambda, push all tokens to a single item
        currentItem.push(token)
      }
      
    } else {
      currentItem.push(token)
    }

    if (token === '(') depth += 1
  }
  
  // push last item if exists
  if (currentItem.length !== 0) {items.push(currentItem)}


  if (items.length === 1) {
    return parse(items[0])
  }

  // create new application
  return new classes.Application(
    parse(items.slice(0, items.length - 1).reduce((acc, item) => [...acc, ...item])), 
    parse(items[items.length - 1])
  )
}

module.exports = parse