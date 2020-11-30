import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Square } from 'src/app/models/maze/square';
import { MazeGenerator } from 'src/app/services/maze/mazeGenerator';
import { MazeSolver } from 'src/app/services/maze/mazeSolver';

@Component({
  selector: 'app-mazesolver',
  templateUrl: './mazesolver.component.html',
  styleUrls: ['./mazesolver.component.less']
})
export class MazesolverComponent implements OnInit {
  private mazeGenerator: MazeGenerator;

  constructor() {
  }

  ngOnInit(): void {
    this.generateMaze();
  }

  private async generateMaze(): Promise<void> {
    this.mazeGenerator = new MazeGenerator(31);
    await this.repaint(this.mazeGenerator.map);

    await this.mazeGenerator.openMaze(1, 1, this.repaint);
    const mazeSolver: MazeSolver = new MazeSolver(this.mazeGenerator.map);
    await mazeSolver.solveMaze(1, 1, this.repaint);
  }

  private async repaint(map: Map<number, Array<Square>>): Promise<void> {
    const squareDimension = 20;
    const canvasElement = $('#mazeCanvas');

    if (!canvasElement || !(canvasElement.get(0) instanceof HTMLCanvasElement)) {
      return;
    }

    const canvas = canvasElement.get(0) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    canvas.width  = squareDimension * map.size;
    canvas.height = squareDimension * map.size;

    if (!ctx) {
      return;
    }

    for (let y = 0; y < map.size; y++) {
      const row = map.get(y);

      if (!row) {
        continue;
      }

      for (let x = 0; x < map.size; x++) {
        const square = row[x];

        ctx.beginPath();
        if (square.startPoint) {
          ctx.fillStyle = '#FF0000';
        } else if (square.endPoint) {
          ctx.fillStyle = '#0000FF';
        } else if (square.visited) {
          ctx.fillStyle = '#FFFF00';
        } else {
          ctx.fillStyle = square.isWall ? '#000' : '#FFF';
        }

        ctx.fillRect(x * squareDimension, y * squareDimension, squareDimension, squareDimension);
        ctx.stroke();
      }
    }

    await new Promise(resolve => setTimeout(resolve, 5) );
  }
}
