class ConditionalOperation {
  constructor(areConditionsFulfilled, operate, checkInterval = 1000) {
    this._areConditionsFulfilled = areConditionsFulfilled
    this._operate = operate
    this._checkInterval = checkInterval
  }

  async run() {
    while (true) {
      if (this._areConditionsFulfilled()) {
        await this._operate()
      }
      await wait(this._checkInterval)
    }
  }
}

class Runner {
  constructor(units) {
    this._units = units
  }

  run() {
    for (const unit of this._units) {
      unit.run()
    }
  }
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

let string = ''
let number = 1

const unit1 = new ConditionalOperation(
  () => string.length === 0 || string[string.length - 1] === '|',
  () => {
    string += number
    number++
    console.log(string)
  }
)

const unit2 = new ConditionalOperation(
  () => string.length >= 1 && string[string.length - 1] !== '|',
  () => {
    string += '|'
    console.log(string)
  }
)

const runner = new Runner([
  unit1,
  unit2
])

runner.run()
