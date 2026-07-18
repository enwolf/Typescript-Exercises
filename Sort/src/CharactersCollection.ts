import { Sorter } from "./Sorter";

/**
 * ============================================================================
 * CLASS: CharactersCollection
 * ROLE: Text string data container manager (Child Implementation).
 * RESPONSIBILITY: Exposes properties and methods to enable case-insensitive 
 *                 string sorting. Extends the abstract 'Sorter' class to 
 *                 inherit built-in sorting capabilities.
 * ============================================================================
 */
export class CharactersCollection extends Sorter
{

    constructor(public data: string)
    {
        super();
    }

    /**
     * Abstract Template Property Implementation.
     * Exposes the total number of characters present inside the dataset.
     */
    get length(): number 
    {
        return this.data.length;
    }

    /**
     * Abstract Template Method Implementation.
     * Executes a case-insensitive character evaluation between two indices.
     */
    compare(leftIndex: number, rightIndex: number): boolean 
    {
        return (this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase());
    }

    /**
     * Abstract Template Method Implementation.
     * Swaps two characters by index. Converts string to an array temporarily 
     * to bypass JavaScript native string immutability restrictions.
     */
    swap(leftIndex: number, rightIndex: number): void 
    {
        const characters = this.data.split("");

        const leftHand = characters[leftIndex];
        characters[leftIndex] = characters[rightIndex];
        characters[rightIndex] = leftHand;

        this.data = characters.join("");
    }
}
