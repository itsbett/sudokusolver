function getElements () {
  let elementList = document.getElementsByTagName('input')
  let grid = []

  for (let i = 0; i < 9; i++) {
    grid.push([])
    for (let j = 0; j < 9; j++) {
      let element = elementList[i + j * 9].value
      if (element === '') {
        grid[i].push(0)
      } else {
        grid[i].push(parseInt(element))
      }
    }
  }
  return grid
}
function clearBoard () {
  let elementList = document.getElementsByTagName('input')
  for (let i = 0; i < 81; i++) {
    elementList[i].value = ''
  }
}

function main () {
  let grid = getElements()
  let output = document.getElementById('output')

  if (solveSudoku(grid)) {
    output.innerText = ''
    printSolution(grid)
  } else {
    output.innerText = 'No solution exists for this puzzle.'
  }
}

function usedInRow (grid, row, num) {
  for (let col = 0; col < 9; col++) {
    if (grid[row][col] === num) {
      return true
    }
  }
  return false
}

function usedInCol (grid, col, num) {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === num) {
      return true
    }
  }
  return false
}

function usedInBox (grid, rowStartingPos, colStartingPos, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row + rowStartingPos][col + colStartingPos] === num) {
        return true
      }
    }
  }
  return false
}

function isValidNumber (grid, row, col, num) {
  return !usedInRow(grid, row, num) && !usedInCol(grid, col, num) && !usedInBox(grid, row - row % 3, col - col % 3, num)
}

function getEmptySpace (grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return { x: row, y: col }
      }
    }
  }
  return 'GAME COMPLETE'
}

function solveSudoku (grid) {
  if (getEmptySpace(grid) === 'GAME COMPLETE') {
    return true
  }

  let emptySpace = getEmptySpace(grid)
  let row = emptySpace.x
  let col = emptySpace.y

  for (let num = 1; num <= 9; num++) {
    if (isValidNumber(grid, row, col, num)) {
      grid[row][col] = num

      if (solveSudoku(grid)) {
        return true
      }
      grid[row][col] = 0
    }
  }
  return false
}

function printSolution (grid) {
  let elementList = document.getElementsByTagName('input')
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      elementList[j + i * 9].value = grid[j][i]
    }
  }
}
