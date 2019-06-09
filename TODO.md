# todo

- return point history during applyMove, only consume in PlayableLevel
- add types to Level methods

- Add undo and restart
- Undo is list of locations
- Add condition to level gen. Track bounce walls and teleport when used, so that solution must include them
- animate where the block was

- find way to compress level into small string
  - x, y, coord of start, coord of finish, coord of all blocks in 2d array (all coords in 2d array, numbers in hex?)
- Use this for handful of pre-gen and/or sharing/saving
- Share level via b64 encoded url!

- change random positioner. instead, calc all possible locations, then randomly select and pop. make a new class for it: LevelPopulator().getPosition()
- randomly place teleporters first, ensure they don't share x or y (to prevent infinite loops)
- could still go infinite with slopes. add counter to applyMove and throw exception if it has moved 10x the level width

- move all code into react repo? no need to deal with lerna now
- but keep logic in its own folder with its own index.js, for easy splitting out later

- Custom level maker? Let’s you know if solvable

- level converts all blocks to lookup of key>obj. Faster checking for “collides with block” when moving piece

- continuously make levels when less than 10 in queue, measure how many attempts it takes

- Stopwatch class
  - Tracks time started, duration that updates, and time remaining by comparing to now

refs
- https://stackoverflow.com/questions/29170368/ice-sliding-puzzle-path-finding
- https://github.com/Ohohcakester/Ice-Sliding-Puzzle
