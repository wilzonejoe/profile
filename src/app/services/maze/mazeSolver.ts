import { Direction } from 'src/app/models/enumerations/direction';
import { Square } from 'src/app/models/maze/square';
import { Stack } from '../utils/stack';
import { BaseMazeUtils } from './baseMazeUtils';

export class MazeSolver extends BaseMazeUtils{
    public map: Map<number, Array<Square>>;

    constructor(map: Map<number, Array<Square>>) {
        super();
        this.map = map;
    }

    private setEndPoint(): void {
        let square: Square | undefined;
        const squareRows: Square[] | undefined = this.map.get(this.map.size - 2);

        if (squareRows) {
            square = squareRows[this.map.size - 2];

            if (square && !square.isWall) {
                square.endPoint = true;
            }
        }
    }

    public async solveMaze(x: number, y: number, drawMap: (map: Map<number, Array<Square>>) => Promise<void>): Promise<void> {
        this.setEndPoint();
        const stack = new Stack<Square>();
        const squares = this.map.get(y);

        if (!squares) {
            return;
        }

        const intialSquare = squares[x];
        intialSquare.startPoint = true;
        stack.push(intialSquare);

        while (stack.size() !== 0) {
            const currentSquare: Square | undefined = stack.peek();

            if (!currentSquare) {
                continue;
            }

            await this.markAsVisited(currentSquare, drawMap);

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

                    await this.markAsVisited(futureSquare, drawMap);

                    currentX = futureSquare.x;
                    currentY = futureSquare.y;
                    stack.push(futureSquare);

                    if (futureSquare && futureSquare.endPoint) {
                        return;
                    }
                }
            }

            if (stack.peek()) {
                stack.pop();
            }
        }
    }

    private async markAsVisited(square: Square, drawMap: (map: Map<number, Array<Square>>) => Promise<void>): Promise<void>  {
        if (!square) {
            return;
        }

        square.markAsVisited();

        if (drawMap) {
            await drawMap(this.map);
        }
    }

    protected calculateNextPosToMakeWall(x: number, y: number,  dir: Direction): number[] {
        const toReturn: number[] = new Array<number>();
        let xpath: number = x;
        let ypath: number = y;
        switch (dir)
        {
            case Direction.UP:
                ypath--;
                break;
            case Direction.DOWN:
                ypath++;
                break;
            case Direction.LEFT:
                xpath--;
                break;
            case Direction.RIGHT:
                xpath++;
                break;
        }
        toReturn[0] = xpath;
        toReturn[1] = ypath;
        return toReturn;
    }

    protected isPossibleToMove(pos: number[]): boolean {
        return this.isInBoundaries(pos) && !this.isWall(pos) && !this.isVisited(pos);
    }

    protected isVisited(pos: number[]): boolean {
        const squares = this.map.get(pos[1]);

        if (!squares) {
            return false;
        }

        return squares[pos[0]].visited;
    }
}
