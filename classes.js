/*
  Runtime Class
  Contains list of Assignments to run
*/
class Runtime {
  constructor (assignments) {
    this.assignments = assignments
    this.scope = {}
  }

  run (scope) {
    this.scope = {...scope}

    for (let assignment of this.assignments) {
      this.scope = {...assignment.run(this.scope).scope}
    }

    return this
  }
}

/*
  Assignment Class
  Contains id, expression, and assigns ran expression to id in scope
  if assignment is to main, should also log expression
*/
class Assignment {
  constructor (id, expression) {
    this.id = id
    this.expression = expression
    this.scope = {}
  }

  run (scope) {
    this.scope = {...scope}
    this.scope[this.id.name] = this.expression.run(this.scope)
    if (this.id.name === 'main') {
      console.log(this.scope[this.id.name].print())
    }

    return this
  }
}

/*
  Abstraction Class
  Should return a copy of itself with the correct scope
  Contains argument and expression
*/
class Abstraction {
  constructor (argument, expression) {
    this.argument = argument
    this.expression = expression
    this.scope = {}
  }

  run (scope) {
    let copy = new Abstraction(this.argument, this.expression)
    copy.scope = {...scope}

    return copy
  }

  print () {
    let id = this.argument.name
    let expression = this.expression.print()

    return `λ ${id}. ${expression}`
  }
}

/*
  Id Class
  Should look in scope for name and return value ran
*/

class Id {
  constructor (name) {
    this.name = name
    this.scope = {}
  }

  run (scope) {
    this.scope = {...scope}
    return this.scope[this.name].run(this.scope)
  }

  print () {
    return this.name
  }
}

/*
  
*/
class Application {
  constructor (abstraction, argument) {
    this.abstraction = abstraction
    this.argument = argument
    this.scope = {}
  }

  run (scope) {
    this.scope = {...scope}
    this.abstraction = this.abstraction.run(this.scope)
    this.abstraction.scope[this.abstraction.argument.name] = this.argument.run(this.scope)
    this.abstraction.scope = {...this.scope, ...this.abstraction.scope}
    return this.abstraction.expression.run(this.abstraction.scope)
  }

  print () {
    return `${this.abstraction.print()} ${this.expression.print()}`
  }
}



module.exports = {
  Runtime,
  Assignment,
  Abstraction,
  Id,
  Application
}
