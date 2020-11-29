export class Square
{
    public isWall: boolean;
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.isWall = true;
        this.x = x;
        this.y = y;
    }

    public getStringRep(): string {
        if (this.isWall){
            return '#';
        } else {
            return ' ';
        }
    }
}
