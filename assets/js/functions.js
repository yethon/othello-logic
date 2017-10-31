// Don`t forget to include your javascript script tags in index.html !

$( document ).ready(function() {

  (function (window) {
    const PLAYER_RED = 1,
      PLAYER_BLUE = -1,
      PLAYER_NONE = 0,
      MAX_ROWS = 8,
      MAX_COLS = 8;

    const Util = {
      cellIdForRowAndCol: function (r, c) {
        return "r" + r + "_c" + c;
      },
      rowAndColForCellId: function (cellId) {
        const coords = cellId.split('_');
        coords[0] = parseInt(coords[0].substr(1, coords[0].length));
        coords[1] = parseInt(coords[1].substr(1, coords[1].length));
        return coords;
      },
      cellContentsForPlayer: function (player) {
        if (player === PLAYER_RED) {
          return '<div class="piece red"></div>';
        } else if (player === PLAYER_BLUE) {
          return '<div class="piece blue"></div>';
        }
        return '';
      }
    }

    const Game = {
      init: function () {
        let t_row, r, c, cellInitialized;
        this.board = [];

        //setup initial board state
        //    - all empty, except middle 4 sqares which are alternating colors
        //        ( i.e. [3,3] = red, [3,4] = blue, [4,3] = red, [4,4] = blue )
        for (r = 0; r < MAX_ROWS; r += 1) {
          t_row = []
          for (c = 0; c < MAX_COLS; c += 1) {
            cellInitialized = false;
            if (r === 3) {
              if (c === 3) {
                t_row.push(PLAYER_RED);
                cellInitialized = true;
              } else if (c === 4) {
                t_row.push(PLAYER_BLUE);
                cellInitialized = true;
              }
            } else if (r === 4) {
              if (c === 3) {
                t_row.push(PLAYER_BLUE);
                cellInitialized = true;
              } else if (c === 4) {
                t_row.push(PLAYER_RED);
                cellInitialized = true;
              }
            }
            if (!cellInitialized) {
              t_row.push(PLAYER_NONE);
            }
          }
          this.board.push(t_row);
        }

        //setup click handlers
        $('.cell').on('click', this.cellClicked.bind(this));

        //red goes first
        // Actually.... No, the player in the bottom left corner goes first. PLAYER_BLUE
        this.currentPlayer = PLAYER_BLUE;

        return this;
      },
      drawBoard: function () {
        let r, c, cellId;
        const currPlayer = this.currentPlayer === PLAYER_RED ? 'red' : 'blue';

        //draw all pieces on the board
        for (r = 0; r < MAX_ROWS; r += 1) {
          for (c = 0; c < MAX_COLS; c += 1) {
            cellId = '#' + Util.cellIdForRowAndCol(r, c);
            $(cellId).empty()
              .html(Util.cellContentsForPlayer(this.board[r][c]));
          }
        }

        //show current player
        $('#currentPlayer')
          .removeClass('blue').removeClass('red')
          .addClass(currPlayer)
          .text(currPlayer.toUpperCase());
        return this;
      },
      cellClicked: function (e) {
        const cellId = e.currentTarget.id,
          coords = Util.rowAndColForCellId(cellId);

        this.doTurn(coords[0], coords[1]);
      },

      /******************** TODO: Fix Me! ********************/

      shouldCheckDirection (row, column, value) {
        if (this.isOnBoard(row, column)) {

          const checkValue = this.board[row][column];

          console.log(checkValue);
          console.log(value);
          console.log(`check direction : ${checkValue !== value && checkValue !== 0}`)

          return checkValue !== value && checkValue !== 0;

        } else {
          return false;
        }
      },

      isOnBoard (row, column) {
        return ![row, column].includes(-1) && ![row, column].includes(8);
      },

      emptyCell(row, column) {
        return this.board[row][column] === 0;
      },

      opponentCell(row, column) {
        const checkValue = this.board[row][column];

        return checkValue !==this.currentPlayer;
      },

      didOutflankOpponent (row, column) {
        // console.warn(`fuck ${this.board[row][column] === this.currentPlayer}`);
        return this.board[row][column] === this.currentPlayer;
      },

      flipRow(cells) {
        cells.forEach(([row, column]) => {
          this.board[row][column] = this.currentPlayer;
        });
      },

      doTurn: function (row, column) {

        //Implement the correct rules
        let cells = [];
        let validChoice = false;

        const DIRECTION = {
          up: [ - 1 , 0],
          down: [ 1 , 0],
          right: [ 0 , 1],
          left: [ 0 , -1],
          A: [1,1],
          B: [1, -1],
          C: [-1, 1],
          D: [-1, -1]
        };

        for (const [x, y] of Object.values(DIRECTION)) {

          console.warn(`Direction ::: ${x}, ${y}`);

          let i = x;
          let j = y;

          if (this.emptyCell(row, column) &&
            this.isOnBoard(row + i, column + j) &&
            this.opponentCell(row + i, column + j)) {

            cells = [];

            while (this.isOnBoard(row + i, column + j) &&
              !this.emptyCell(row + i, column + j)) {

              cells.push([row + i, column + j])

              if (this.didOutflankOpponent(row + i, column + j)) {
                this.flipRow(cells);
                cells = [];
                validChoice = true;
                break;
              }

              console.warn(`you did not outflank`);

              i = i + x;
              j = j + y;
            }

          }



        }

        // // DOWN

        // // if (Current cell is empty && the next cell is Opponent
        // if (this.emptyCell(row, column) && this.opponentCell(row + i, column)) {

        // // while (Cell in direction r+1 is NOT empty && is opponent && is on the board))

        // while (!this.emptyCell(row + i, column) &&
        // this.isOnBoard(row + i, column)) {

        // cells.push([row + i, column])

        // if (this.didOutflankOpponent(row + i, column)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }

        // console.warn(`you did not outflank`);

        // i++;
        // }

        // i = 1;
        // }

        // // UP
        // if (this.emptyCell(row, column) && this.opponentCell(row - i, column)) {

        // // while (Cell in direction r+1 is NOT empty && is opponent && is on the board))

        // while (!this.emptyCell(row - i, column) &&
        // this.isOnBoard(row - i, column)) {

        // cells.push([row - i, column])

        // if (this.didOutflankOpponent(row - i, column)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }

        // console.warn(`you did not outflank`);

        // i++;
        // }

        // i = 1;
        // }

        // // Vertical: Down
        // if (this.shouldCheckDirection(row + 1, column, this.currentPlayer)) {
        // cells = [];

        // for (let i = row + 1; i < MAX_ROWS; i++) {
        // cells.push([i, column]);
        // if (this.didOutflankOpponent(i, column)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // }
        // }

        // // Horizontal: Right
        // if (this.shouldCheckDirection(row, column + 1, this.currentPlayer)) {
        // cells = [];

        // for (let i = column + 1; i < MAX_COLS; i++) {
        // cells.push([row, i]);
        // if (this.didOutflankOpponent(row, i)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // }
        // }

        // // Vertical: Up
        // if (this.shouldCheckDirection(row - 1, column, this.currentPlayer)) {
        // cells = [];

        // for (let i = row - 1; i >= 0; i--) {
        // cells.push([i, column]);
        // if (this.didOutflankOpponent(i,column)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // }
        // }

        // // Horizontal: Left
        // if (this.shouldCheckDirection(row, column - 1, this.currentPlayer)) {
        // cells = [];

        // for (let i = column - 1; i >= 0; i--) {
        // cells.push([row, i]);
        // if (this.didOutflankOpponent(row,i)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // }
        // }

        // // Diagonal: down, right
        // if (this.shouldCheckDirection(row + 1, column + 1, this.currentPlayer)) {
        // cells = [];
        // let i = row + 1;
        // let j = column + 1;

        // while (i < MAX_ROWS && j < MAX_COLS) {
        // cells.push([i, j]);

        // if (this.didOutflankOpponent(i, j)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // i++;
        // j++;
        // }
        // }

        // // Diagonal: down, left
        // if (this.shouldCheckDirection(row + 1, column - 1, this.currentPlayer)) {
        // cells = [];
        // let i = row + 1;
        // let j = column - 1;

        // while (i < MAX_ROWS && j >= 0) {
        // cells.push([i, j]);

        // if (this.didOutflankOpponent(i, j)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // i++;
        // j--;
        // }
        // }

        // // Diagonal: up, left
        // if (this.shouldCheckDirection(row - 1, column - 1, this.currentPlayer)) {
        // cells = [];
        // let i = row - 1;
        // let j = column - 1;

        // while (i >= 0 && j >= 0) {
        // cells.push([i, j]);

        // if (this.didOutflankOpponent(i, j)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // i--;
        // j--;
        // }
        // }

        // // Diagonal: up, right
        // if (this.shouldCheckDirection(row - 1, column + 1, this.currentPlayer)) {
        // cells = [];
        // let i = row - 1;
        // let j = column + 1;

        // while (i >= 0 && j < MAX_COLS) {
        // cells.push([i, j]);

        // if (this.didOutflankOpponent(i, j)) {
        // this.flipRow(cells);
        // cells = [];
        // validChoice = true;
        // break;
        // }
        // i--;
        // j++;
        // }
        // }

        if (validChoice) {
          this.board[row][column] = this.currentPlayer;
          this.currentPlayer *= -1;
        }

        this.drawBoard();
      }

      /*******************************************************/


    }

    window.Othello = Game;
  })(window)

  window.Othello.init().drawBoard();


});
