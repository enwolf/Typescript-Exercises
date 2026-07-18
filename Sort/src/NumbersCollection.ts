import { Sorter } from "./Sorter"

/**
 * ============================================================================
 * CLASS: NumbersCollection
 * ROLE: Numeric array data container manager (Child Implementation).
 * RESPONSIBILITY: Handles standard lookup, evaluation, and index-based swapping 
 *                 mechanics for an array of primitives. Extends the abstract 
 *                 'Sorter' class to inherit built-in sorting capabilities.
 * ============================================================================
 */
export class NumbersCollection extends Sorter
{

    constructor(public data: number[])
    {
        super();
    }

    /**
     * Abstract Template Property Implementation.
     * Exposes the total element count of the underlying numeric array.
     */
    get length(): number
    {
        return this.data.length;
    }

    /**
     * Abstract Template Method Implementation.
     * Directly evaluates whether the number on the left is greater than the right.
     */
    compare(leftIndex: number, rightIndex: number): boolean 
    {
        return this.data[leftIndex] > this.data[rightIndex];
    }

    /**
     * Abstract Template Method Implementation.
     * Mutates the array positions by swapping index data via a temporary tracker variable.
     */
    swap(leftIndex: number, rightIndex: number): void 
    {
        const leftHand = this.data[leftIndex];
        this.data[leftIndex] = this.data[rightIndex]
        this.data[rightIndex] = leftHand;
    }
}
