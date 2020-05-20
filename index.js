// consts
const fs = require('fs')
const lex = require('./lexer')
const parse = require('./parser')
const classes = require('./classes')

// read file
const code = fs.readFileSync(process.argv[2], 'utf8')

// lex
console.log('---------------------------------- TOK ----------------------------------')
let tokens = lex(code)
console.log(tokens)

// parse
console.log('---------------------------------- AST ----------------------------------')
let ast = parse(tokens)
console.log(JSON.stringify(ast, null, 2))

// run
console.log('---------------------------------- RUN ----------------------------------')
let scope = {}
ast.run(scope)
// console.log(JSON.stringify(scope, null, 2))