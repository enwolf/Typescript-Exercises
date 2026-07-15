import { NumbersCollection } from "./NumbersCollection"
    
export class Sorter {

    /**
     * "public collection: number[]" in the constructor parameter is
     * TypeScript's parameter property shorthand. Writing "public" directly
     * in front of a constructor parameter does TWO things at once:
     *   1. Declares "collection" as a property on the class
     *   2. Assigns the passed-in argument to "this.collection"
     *
     * This single line is equivalent to writing all of this out longhand:
     *   collection: number[];
     *   constructor(collection: number[]) {
     *       this.collection = collection;
     *   }
     */
    constructor(public collection: NumbersCollection ) {}
   
    /**
     * Bubble Sort
     *
     * Repeatedly walks through the array comparing each pair of NEIGHBORING
     * VALUES (not indexes - the indexes j and j+1 never move, only the
     * values stored at those positions get swapped).
     *
     * Outer loop (i): tracks how many passes have completed. Each full pass 
     * pushes the largest remaining unsorted value to its correct position
     * at the end of the array.
     *
     * Inner loop (j): walks through the unsorted portion, comparing
     * collection[j] vs collection[j + 1].
     *   - "length - 1" exists because arrays are zero-indexed - without it,
     *     j + 1 would eventually reach past the last valid index.
     *   - The extra "- i" shrinks the range further each pass, since the
     *     last "i" elements are already sorted and don't need rechecking.
     *
     * The swap (only runs if collection[j] > collection[j + 1]):
     *   1. leftside = collection[j]   -> rescue the left value BEFORE it
     *      gets overwritten in the next line
     *   2. collection[j] = collection[j + 1]  -> move the right value left
     *   3. collection[j + 1] = leftside       -> move the rescued value right
     * Indexes j and j+1 stay fixed the whole time - only their contents
     * trade places.
     */
    
    sort(): void
    {
        //same as const length = this.collection.length; Both do exactly the same thing.
        //The curly braces { } tell TypeScript "copy the value of the property called length
        //from this.collection, into a new variable also called length."
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