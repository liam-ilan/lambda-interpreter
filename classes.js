class Function {
  constructor (argument, expression) {
    this.argument = argument
    this.expression = expression
  }

  run (scope) {
    
  }
}

class Application {
  constructor (func, argument) {
    this.func = func
    this.argument = argument
  }

  run (scope) {
    
  }
}

class Id {
  constructor (name) {
    this.name = name
  }

  run (scope) {
    
  }
}

class Assignment {
  constructor (id, expression) {
    this.id = id
    this.expression = expression
  }

  run (scope) {
    scope[this.id.name] = this.expression

    if (this.id.name === 'out') {console.log(this.expression.run(scope))}
  }
}

class Runtime {
  constructor (assignments) {
    this.assignments = assignments
  }

  run (scope) {
    this.assignments.forEach((item) => item.run(scope))
  }
}

module.exports = {
  Runtime,
  Assignment,
  Function,
  Id,
  Application
}
