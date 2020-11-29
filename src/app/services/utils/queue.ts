export class Queue<T> {
    private mStore: T[] = [];

    public push(val: T): void {
        this.mStore.push(val);
    }

    public pop(): T | undefined {
        return this.mStore.shift();
    }

    public size(): number {
        return this.mStore.length;
    }
}
