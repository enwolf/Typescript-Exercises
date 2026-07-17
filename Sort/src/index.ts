import { Sorter } from "./Sorter";
import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

/**
 * ============================================================================
 * MODULE: index.ts
 * ROLE: Main Application Entry Point & Sandbox Environment.
 * RESPONSIBILITY: Instantiates data structures, hooks them into the sorting 
 *                 engine, and logs final results to execute manual tests.
 * ==================
 */

//const charactersCollection = new CharactersCollection("Xaayb")
//const sorter = new Sorter(charactersCollection);
//sorter.sort();
//console.log(charactersCollection.data);


//const numbersCollection = new NumbersCollection([10000, 10, 3, -5, 0]);
//const sorter = new Sorter(numbersCollection);
//sorter.sort();
//console.log(numbersCollection.data); 


const linkedList = new LinkedList();

linkedList.add(500);
linkedList.add(-10);
linkedList.add(-3);
linkedList.add(4);

const sorter = new Sorter(linkedList);
sorter.sort();
linkedList.print();