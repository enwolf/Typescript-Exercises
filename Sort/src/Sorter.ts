/**
 * ============================================================================
 * ABSTRACT CLASS: Sorter
 * ROLE: Generic sorting engine parent blueprint.
 * RESPONSIBILITY: Dictates a unified Bubble Sort routine via template methods. 
 *                 Instead of wrapping external collections, child classes 
 *                 inherit this class to acquire direct sorting powers by 
 *                 implementing the required abstract template properties.
 * ============================================================================
 */
export abstract class Sorter
{
    // Concrete child implementations must provide these underlying mechanics
    abstract length: number;
    abstract compare(leftIndex: number, rightIndex: number): boolean;
    abstract swap(leftIndex: number, rightIndex: number): void;

    /**
     * Standard Bubble Sort implementation using Template Method Pattern.
     * Iteratively bubbles the largest values directly within the child instance.
     */
    sort(): void
    {
        const { length } = this;

        for (let i = 0; i < length; i++)
        {
            for (let j = 0; j < length - i - 1; j++)
            {
                if (this.compare(j, j + 1))
                {
                    this.swap(j, j + 1);
                }
            }
        }
    }
}
