# `@creature-chess/board-react`

React drag-and-drop implementation of @creature-chess/board

Takes in a `BoardState` of your choosing, renders the pieces, and exposes click/drop listeners. See _Props_ below for more information.

## Usage

```tsx
import { DragObjectWithType } from "react-dnd";
import { BoardState } from "@creature-chess/board";

type ChessPiece = {};

const onDrop = (item: DragObjectWithType & { piece: ChessPiece }, x: number, y: number) => {
    /* dispatch to redux etc here */
};

const onClick = (x: number, y: number) => {
    /* dispatch to redux etc here */
};

const ChessBoard = () => {
    const board = useSelector<State, BoardState<ChessPiece>>(state => state.board);

    return (
        <BoardGrid
            state={board}
            renderItem={id => <ChessPiece id={id} />}
            onDrop={onDrop}
            onClick={onClick}
        />
    )
};
```

### Props

#### state

```typescript
const state: BoardState;
```

The board to be rendered.

#### renderItem

```typescript
const renderItem: (id: string, x: number, y: number) => React.ReactNode | React.ReactNode[];
```

A render function called for every piece on the board. You can render a component using the id, then inside that component you can read from the Redux store, for example, to render accordingly.

#### onDrop

```typescript
const onDrop: <TPiece extends HasId>(item: DragObjectWithType & { piece: TPiece }, x: number, y: number) => void;
```

This function is called whenever an item with type `"Piece"` is dropped onto an empty tile of an unlocked board.

#### onClick

```typescript
const onClick: (x: number, y: number) => void;
```

This function is called whenever an empty tile is clicked.

**note:** it does not take `locked` into account.
