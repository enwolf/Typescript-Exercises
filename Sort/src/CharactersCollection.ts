/**
 * ============================================================================
 * CLASS: CharactersCollection
 * ROLE: Text string data container manager.
 * RESPONSIBILITY: Exposes properties and methods to enable case-insensitive 
 *                 string sorting. Handles JavaScript string immutability constraints
 *                 internally to satisfy the 'Sortable' contract requirements.
 * ============================================================================
 */
export class CharactersCollection
{

    constructor(public data: string) { }

    /**
     * Exposes the total number of characters present inside the dataset.
     */
    get length(): number 
    {
        return this.data.length;
    }

    /**
     * Executes a case-insensitive character evaluation between two indices.
     * Prevents uppercase ASCII values from clustering ahead of lowercase letters.
     */
    compare(leftIndex: number, rightIndex: number): boolean 
    {
        return (this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase());
    }

    /**
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
