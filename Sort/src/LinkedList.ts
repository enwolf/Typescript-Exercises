/**
 * ============================================================================
 * CLASS: Node
 * ROLE: Individual data element container within the LinkedList structure.
 * RESPONSIBILITY: Stores a discrete numeric value and maintains a linear 
 *                 reference pointer (`next`) to the subsequent sequential node.
 * ============================================================================
 */
class Node
{
    next: Node | null = null;
    constructor(public data: number) { }

}

/**
 * ============================================================================
 * CLASS: LinkedList
 * ROLE: Linear node-based collection manager.
 * RESPONSIBILITY: Coordinates traversal, element indexing, and list mutation. 
 *                 Fulfills the 'Sortable' interface by exposing standardized 
 *                 length, compare, and swap hooks for the sorting algorithm.
 * ============================================================================
 */
export class LinkedList
{
    head: Node | null = null;

    /**
     * Appends a new node to the end of the list.
     * If the list is empty, sets the new node as the head.
     */
    add(data: number): void 
    {
        const node = new Node(data);

        if (!this.head) 
        {
            this.head = node;
            return;
        }

        let tail = this.head;

        while (tail.next) 
        {
            tail = tail.next;
        }

        tail.next = node;
    }

    /**
     * Traverses the list to calculate and return the total node count.
     */
    get length(): number 
    {

        if (!this.head) 
        {
            return 0;
        }

        let length = 1;
        let node = this.head;

        while (node.next)
        {
            length++;
            node = node.next;

        }

        return length;
    }

    /**
     * Traverses the list to find and return the Node at a specific index.
     * Throws an error if the index does not exist in the collection.
     */
    at(index: number): Node 
    {
        if (!this.head)
        {
            throw new Error("Index out of bounds");

        }

        let counter = 0;
        let node: Node | null = this.head;

        while (node)
        {
            if (counter === index) 
            {
                return node;
            }

            counter++
            node = node.next;
        }
        throw new Error("Index out of bounds");
    }

    /**
     * Compares the numeric values of two nodes at the given indices.
     * Satisfies the Sortable interface contract.
     */
    compare(leftIndex: number, rightIndex: number): boolean 
    {
        if (!this.head) 
        {
            throw new Error("List is empty")
        }

        return this.at(leftIndex).data > this.at(rightIndex).data;
    }

    /**
     * Swaps the values of two nodes by overwriting their inner data.
     * Cheats performance by avoiding complicated pointer re-linking.
     * Satisfies the Sortable interface contract.
     */
    swap(leftIndex: number, rightIndex: number): void 
    {
        const leftNode = this.at(leftIndex);
        const rightNode = this.at(rightIndex);

        const leftHand = leftNode.data;
        leftNode.data = rightNode.data;
        rightNode.data = leftHand;
    }

    /**
     * Logs the data value of every node sequentially to the console.
     */
    print(): void
    {

        if (!this.head)
        {
            return;
        }

        let node: Node | null = this.head;
        while (node)
        {
            console.log(node.data);
            node = node.next;
        }
    }
}
