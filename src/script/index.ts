import { Generator, Level, Point } from '../utils';

function testLevelGen() {
  const l1 = new Level(
    5, 5, new Point(1, 1), new Point(3, 3), [
      new Point(2, 4),
    ]
  );
  console.log(l1.print())
  console.log(l1.solve())

  const l2 = new Level(
    5, 5, new Point(1, 1), new Point(3, 3), [
      new Point(4, 0),
    ]
  );
  console.log(l2.print())
  console.log(l2.solve())

  const gen = new Generator(5, 5, 0.1, 5);
  const levels = gen.generateLevels(10, 1000);
  levels.forEach(l => {
    console.log(l.level.print())
    console.log('Solution:', l.soln.printMoves())
    console.log('\n');
  });
};

export default {
  testLevelGen,
}
