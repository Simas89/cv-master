import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { current } from 'immer';

interface FieldState {
  blockSize: number;
  value: Block[][];
}

interface Block {
  isAlive: boolean;
  isNew: boolean;
}

interface SetAliveProps {
  hBlock: number;
  vBlock: number;
  alive: boolean;
}

const initialState: FieldState = {
  blockSize: 40,
  value: [[{ isAlive: false, isNew: false }]],
};

const randomBool = () => !Math.round(Math.random());

export const slice = createSlice({
  name: 'gameOfLife',
  initialState,
  reducers: {
    setBlockSize: (state, action: PayloadAction<number>) => {
      state.blockSize = action.payload;
    },

    setHorizontalBlocks: (state, action: PayloadAction<number>) => {
      const numOfBlocks = action.payload;
      const hLenght = current(state).value.length;

      for (let i = hLenght; i < numOfBlocks; i++) {
        state.value.push([{ isAlive: randomBool(), isNew: false }]);
      }

      for (let i = hLenght; i > numOfBlocks; i--) {
        state.value.pop();
      }
    },

    setVerticalBlocks: (state, action: PayloadAction<number>) => {
      const numOfBlocks = action.payload;
      const hLenght = current(state).value.length;

      for (let i = 0; i < hLenght; i++) {
        const vLenght = current(state).value[i].length;

        for (let j = vLenght; j < numOfBlocks; j++) {
          state.value[i].push({ isAlive: randomBool(), isNew: false });
        }

        for (let j = vLenght; j > numOfBlocks; j--) {
          state.value[i].pop();
        }
      }
    },

    setAlive: (state, action: PayloadAction<SetAliveProps>) => {
      const { hBlock, vBlock, alive } = action.payload;
      state.value[hBlock][vBlock].isAlive = alive;
    },

    setGameOfLife: (state) => {
      const hBlocks = state.value.length;
      const vBlocks = state.value[0].length;

      let newField: Block[][] = [];

      for (let i = 0; i < hBlocks; i++) {
        newField.push([]);
        for (let j = 0; j < vBlocks; j++) {
          newField[i].push({ isAlive: false, isNew: false });
        }
      }

      for (let i = 0; i < hBlocks; i++) {
        for (let j = 0; j < vBlocks; j++) {
          newField[i][j] = { ...state.value[i][j] };

          let neighbours = 0;

          // Top
          if (j > 0) {
            state.value[i][j - 1].isAlive && neighbours++;
          }
          // Bottom
          if (j < vBlocks - 1) {
            state.value[i][j + 1].isAlive && neighbours++;
          }
          // Left
          if (i > 0) {
            state.value[i - 1][j].isAlive && neighbours++;
          }
          // Right
          if (i < hBlocks - 1) {
            state.value[i + 1][j].isAlive && neighbours++;
          }
          // Top Left
          if (i > 0 && j > 0) {
            state.value[i - 1][j - 1].isAlive && neighbours++;
          }
          // Top Right
          if (i < hBlocks - 1 && j > 0) {
            state.value[i + 1][j - 1].isAlive && neighbours++;
          }
          // Bottom Left
          if (i > 0 && j < vBlocks - 1) {
            state.value[i - 1][j + 1].isAlive && neighbours++;
          }
          // Bottom Right
          if (i < hBlocks - 1 && j < vBlocks - 1) {
            state.value[i + 1][j + 1].isAlive && neighbours++;
          }

          if (state.value[i][j].isAlive) {
            if (neighbours < 2) {
              newField[i][j].isAlive = false;
            }
            if (neighbours === 2 || neighbours === 3) {
              newField[i][j].isAlive = true;
            } else {
              newField[i][j].isAlive = false;
            }
          } else {
            if (neighbours === 3) {
              newField[i][j].isAlive = true;
            }
          }
        }
      }
      state.value = newField;
    },
  },
});

export const {
  setHorizontalBlocks,
  setVerticalBlocks,
  setAlive,
  setGameOfLife,
} = slice.actions;

export default slice.reducer;
