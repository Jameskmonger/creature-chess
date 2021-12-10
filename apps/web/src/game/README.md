# `@creature-chess/app` -> game

The game has an entry component `GamePage` which conditionally renders one of two layouts - `DesktopGame` or `MobileGame`.

## Modules

The layouts are made up of a group of modules, these modules should represent a single gameplay "view". By design, they should be quite atomic, and the CSS for these modules should allow them to grow naturally, and be constrained by their container.

Some examples of modules are:

- **board** - shows the "play area" of the game - the board and bench
- **cardShop** - the card shop ui and functionality
- **roundIndicator** - shows the current round of the game

As you can see, they don't need to be very complex.
