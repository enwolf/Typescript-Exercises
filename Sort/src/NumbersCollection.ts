/**
 * ============================================================================
 * CLASS: NumbersCollection
 * ROLE: Numeric array data container manager.
 * RESPONSIBILITY: Handles standard lookup, evaluation, and index-based swapping 
 *                 mechanics for an array of primitives to fulfill the 'Sortable' 
 *                 interface requirements.
 * ============================================================================
 */
export class NumbersCollection
{

    constructor(public data: number[]) { }

    /**
     * Exposes the total element count of the underlying numeric array.
     */
    get length(): number
    {
        return this.data.length;
    }

    /**
     * Directly evaluates whether the number on the left is greater than the right.
     */
    compare(leftIndex: number, rightIndex: number): boolean 
    {
        return this.data[leftIndex] > this.data[rightIndex];
    }

    /**
     * Mutates the array positions by swapping index data via a temporary tracker variable.
     */
    swap(leftIndex: number, rightIndex: number): void 
    {
        const leftHand = this.data[leftIndex];
        this.data[leftIndex] = this.data[rightIndex]
        this.data[rightIndex] = leftHand;
    }
}
