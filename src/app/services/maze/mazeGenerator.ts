import { Action } from 'rxjs/internal/scheduler/Action';
import { Direction } from 'src/app/models/enumerations/direction';
import { Square } from 'src/app/models/maze/square';
import { Stack } from '../utils/stack';

export class MazeGenerator
{
    private repaint: (map: Map<number, Array<Square>>) => void;
    private dimension: number;
    private foundExit: string;

    public map: Map<number, Array<Square>>;
    private visited: Map<number, Array<Square>>;

    constructor(dimension: number, repaint: (map: Map<number, Array<Square>>) => void) {
        this.map = new Map<number, Array<Square>>();
        this.visited = new Map<number, Array<Square>>();
        this.dimension = dimension;
        this.repaint = repaint;
        this.init();
    }

    private get directions(): Direction[] {
        const directions = new Array<Direction>();
        directions.push(Direction.DOWN);
        directions.push(Direction.UP);
        directions.push(Direction.RIGHT);
        directions.push(Direction.LEFT);
        directions.push(Direction.NODIRECTION);
        return directions;
    }

    private calculateNextPosToMakeWall(x: number, y: number,  dir: Direction): number[] {
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


    private isInBoundaries(pos: number[]): boolean
    {
        return !((pos[0] <= 0 || pos[0] >= this.dimension - 1) || (pos[1] <= 0 || pos[1] >= this.dimension - 1));
    }

    private isStillPossibleToMove(a: number, b: number): Direction
    {
        for (const direction of this.directions)
        {
            if (direction !== Direction.NODIRECTION)
            {
                const pos: number[] = this.calculateNextPosToMakeWall(a, b, direction);
                if (this.isPossibleToMove(pos)) {
                    return direction;
                }
            }
        }
        return Direction.NODIRECTION;
    }

    private isPossibleToMove(pos: number[]): boolean
    {
        return this.isInBoundaries(pos) && this.isWall(pos);
    }

    private isWall(pos: number[]): boolean
    {
        const squares = this.map.get(pos[1]);

        if (!squares) {
            return false;
        }

        return squares[pos[0]].isWall;
    }

    public async openMaze(a: number, b: number): Promise<void> {
        const stack = new Stack<Square>();
        const squares = this.map.get(b);

        if (!squares) {
            return;
        }

        const intialSquare = squares[a];
        stack.push(intialSquare);

        while (stack.size() !== 0) {
            const currentSquare: Square | undefined = stack.peek();

            if (!currentSquare) {
                continue;
            }

            await this.removeWall(currentSquare);

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
                        await this.removeWall(squareAfterFutureStep);
                    }

                    await this.removeWall(futureSquare);

                    currentX = futureSquare.x;
                    currentY = futureSquare.y;
                    stack.push(futureSquare);
                }
            }

            stack.pop();
        }
    }

    private async removeWall(square: Square): Promise<void>  {
        if (!square) {
            return;
        }

        square.isWall = false;

        if (this.repaint) {
            this.repaint(this.map);
            await new Promise(resolve => setTimeout(resolve, 100) );
        }

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
