import { Direction } from 'src/app/models/enumerations/direction';
import { Square } from 'src/app/models/maze/square';

export abstract class BaseMazeUtils {
    public map: Map<number, Array<Square>>;

    protected get directions(): Direction[] {
        const directions = new Array<Direction>();
        directions.push(Direction.DOWN);
        directions.push(Direction.UP);
        directions.push(Direction.RIGHT);
        directions.push(Direction.LEFT);
        directions.push(Direction.NODIRECTION);
        return directions;
    }

    protected abstract calculateNextPosToMakeWall(x: number, y: number,  dir: Direction): number[];

    protected isInBoundaries(pos: number[]): boolean
    {
        const dimension = this.map.size;
        return !((pos[0] <= 0 || pos[0] >= dimension - 1) || (pos[1] <= 0 || pos[1] >= dimension - 1));
    }

    protected isStillPossibleToMove(a: number, b: number): Direction
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

    protected abstract isPossibleToMove(pos: number[]): boolean;

    protected isWall(pos: number[]): boolean
    {
        const squares = this.map.get(pos[1]);

        if (!squares) {
            return false;
        }

        return squares[pos[0]].isWall;
    }
}
