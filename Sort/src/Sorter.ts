interface Sortable {

    length: number;
    compare(leftindex: number, rightIndex: number): boolean;
    swap (leftIndex: number, RightIndex: number): void;
    
}

export class Sorter {

    /**
     * TypeScript parameter shorthand: "public" directly in front 
     * of a constructor parameter declares "collection" as a property 
     * and assigns the argument to "this.collection" automatically.
     */
    constructor(public collection: Sortable ) {}
   
    /**
     * Standard Bubble Sort implementation.
     * Iteratively bubbles the largest remaining values to the end.
     */
    sort(): void
    {
        const { length } = this.collection;

        for (let i = 0; i < length; i++)
        {
            for (let j = 0; j < length -i -1; j++)
            {
                if(this.collection.compare(j, j + 1))
                {                                   
                    this.collection.swap(j, j+1);
                }       
            }
        }
    }
}
