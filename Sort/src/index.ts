import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

/**
 * ============================================================================
 * MODULE: index.ts
 * ROLE: Main Application Entry Point & Sandbox Environment.
 * RESPONSIBILITY: Instantiates our data collections and runs their inherited 
 *                 sorting methods directly.
 * ============================================================================
 */

// 1. Testing our numbers array
console.log("Numbers Collection Start\n");
const numbersCollection = new NumbersCollection([10000, 10, 3, -5, 0]);

numbersCollection.sort(); // Inherited directly from Sorter parent class
console.log(numbersCollection.data + "\n\nNumbers Collection end\n");


// 2. Testing our string characters
console.log("Characters Collection Start\n");
const charactersCollection = new CharactersCollection("Xaayb");

charactersCollection.sort(); // Inherited directly from Sorter parent class
console.log(charactersCollection.data + "\n\nCaracter Collection end\n");


// 3. Testing our linear linked list
const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

console.log("Linked List Collection Start\n");
linkedList.sort(); // Slipped this in so it actually sorts before printing!
linkedList.print();
console.log("\nLinked List Collection end");
