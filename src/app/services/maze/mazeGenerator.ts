import { Direction } from 'src/app/models/enumerations/direction';
import { Square } from 'src/app/models/maze/square';
import { Stack } from '../utils/stack';
import { BaseMazeUtils } from './baseMazeUtils';

export class MazeGenerator extends BaseMazeUtils{
    private dimension: number;

    constructor(dimension: number) {
        super();
        this.map = new Map<number, Array<Square>>();
        this.dimension = dimension;
        this.init();
    }

    public async openMaze(x: number, y: number, drawMap: (map: Map<number, Array<Square>>) => Promise<void>): Promise<void> {
        const stack = new Stack<Square>();
        const squares = this.map.get(y);

        if (!squares) {
            return;
        }

        const intialSquare = squares[x];
        stack.push(intialSquare);

        while (stack.size() !== 0) {
            const currentSquare: Square | undefined = stack.peek();

            if (!currentSquare) {
                continue;
            }

            await this.removeWall(currentSquare, drawMap);

            let futureSquare: Square | null = null;

            let currentX: number = currentSquare.x;
            let currentY: number = currentSquare.y;

            while (this.isStillPossibleToMove(currentX, currentY) !== Direction.NODIRECTION) {
                const randomDirectionIndex: number = Math.floor(Math.random() * 4);
                const d: Direction = this.directions[randomDirectionIndex];
                const nextPos: number[] = this.calculateNextPosToMakeWall(currentX, currentY, d);

                if (this.isPossibleToMove(nextPos)) {
                    const rowSquares = this.map.get(nextPos[1]);

                    if (!rowSquares) {
                        continue;
                    }

                    futureSquare = rowSquares[nextPos[0]];

                    const futureRowSquares = this.map.get(nextPos[3]);

                    if (futureRowSquares) {
                        const squareAfterFutureStep = futureRowSquares[nextPos[2]];
                        await this.removeWall(squareAfterFutureStep, drawMap);
                    }

                    await this.removeWall(futureSquare, drawMap);

                    currentX = futureSquare.x;
                    currentY = futureSquare.y;
                    stack.push(futureSquare);
                }
            }

            stack.pop();
        }
    }

    private async removeWall(square: Square, drawMap: (map: Map<number, Array<Square>>) => Promise<void>): Promise<void>  {
        if (!square) {
            return;
        }

        square.removeWall();

        if (drawMap) {
            await drawMap(this.map);
        }
    }

    protected isPossibleToMove(pos: number[]): boolean
    {
        return this.isInBoundaries(pos) && this.isWall(pos);
    }

    protected calculateNextPosToMakeWall(x: number, y: number,  dir: Direction): number[] {
        const toReturn: number[] = new Array<number>();
        let xpath: number = x;
        let ypath: number = y;
        switch (dir)
        {
            case Direction.UP:
                ypath--;
                y -= 2;
                break;
            case Direction.DOWN:
                ypath++;
                y += 2;
                break;
            case Direction.LEFT:
                xpath--;
                x -= 2;
                break;
            case Direction.RIGHT:
                xpath++;
                x += 2;
                break;
        }
        toReturn[0] = x;
        toReturn[1] = y;
        toReturn[2] = xpath;
        toReturn[3] = ypath;
        return toReturn;
    }

    private init(): void {
        for (let i = 0; i < this.dimension; i++) {
            const list: Array<Square> = new Array<Square>();
            for (let j = 0; j < this.dimension; j++) {
                list.push(new Square(j, i));
            }
            this.map.set(i, list);
        }
    }

    public printMaze(map: Map<number, Array<Square>>): void {
        let mazeMap = '';

        for (let i = 0; i < map.size; i++) {
            const squares = map.get(i);

            if (!squares) {
                continue;
            }

            for (const t of squares) {
                mazeMap += t.getStringRep();
            }

            mazeMap += '\n';
        }

        console.log(mazeMap);
        console.log('\n');
    }
}
