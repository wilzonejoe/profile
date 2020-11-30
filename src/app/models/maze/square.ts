export class Square {
    public isWall: boolean;
    public x: number;
    public y: number;
    public visited: boolean;
    public startPoint: boolean;
    public endPoint: boolean;

    constructor(x: number, y: number) {
        this.isWall = true;
        this.x = x;
        this.y = y;
        this.visited = false;
        this.startPoint = false;
        this.endPoint = false;
    }

    public markAsVisited(): void {
        this.visited = true;
    }

    public removeWall(): void {
        this.isWall = false;
    }

    public getStringRep(): string {
        if (this.isWall){
            return '#';
        } else {
            return ' ';
        }
    }
}
