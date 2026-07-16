# 📓 Developer Learning Log

# 📓 Developer Learning Log

## ⚡ Quick Run
From the `Sort/` folder:
```bash
npm start

## 🧩 TypeScript Parameter Shorthand & Bubble Sort Mechanics

### 📋 Key Conceptual Takeaways
* **Constructor Shorthand:** Using `public` inside the constructor parameters automatically creates and assigns class fields, eliminating traditional Java-style field declaration boilerplate.
* **Destructuring Syntax:** `const { length } = this.collection;` directly extracts object properties into local block variables with matching names.
* **Loop Efficiency Math (`length - i - 1`):** The `-1` boundary stops the look-ahead pointer from going out of bounds, while the `-i` boundary stops the loop from checking elements that have already bubbled to the end.

---

### 💻 Original Implementation & Embedded Analysis (Untouched)

```typescript
class Sorter {
    /** 
     * "public collection: number[]" in the constructor parameter is 
     * TypeScript's parameter property shorthand. Writing "public" directly 
     * in front of a constructor parameter does TWO things at once: 
     * 1. Declares "collection" as a property on the class 
     * 2. Assigns the passed-in argument to "this.collection" 
     * 
     * This single line is equivalent to writing all of this out longhand: 
     * collection: number[]; 
     * constructor(collection: number[]) { 
     * this.collection = collection; 
     * } 
     */
    constructor(public collection: number[]) {}

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
     * - "length - 1" exists because arrays are zero-indexed - without it, 
     * j + 1 would eventually reach past the last valid index. 
     * - The extra "- i" shrinks the range further each pass, since the 
     * last "i" elements are already sorted and don't need rechecking. 
     * 
     * The swap (only runs if collection[j] > collection[j + 1]): 
     * 1. leftside = collection[j] -> rescue the left value BEFORE it 
     * gets overwritten in the next line 
     * 2. collection[j] = collection[j + 1] -> move the right value left 
     * 3. collection[j + 1] = leftside -> move the rescued value right 
     * Indexes j and j+1 stay fixed the whole time - only their contents 
     * trade places. 
     */
    sort(): void { 
        //same as const length = this.collection.length; Both do exactly the same thing. 
        //The curly braces { } tell TypeScript "copy the value of the property called length 
        //from this.collection, into a new variable also called length." 
        const { length } = this.collection; 

        for (let i = 0; i < length; i++) { 
            for (let j = 0; j < length -i -1; j++) { 
                if (this.collection[j] > this.collection[j + 1]) { 
                    const leftside = this.collection[j]; 
                    this.collection[j] = this.collection [j + 1]; 
                    this.collection[j + 1] = leftside; 
                } 
            } 
        } 
    } 
} 

const sorter = new Sorter([10, 3, -5, 0]); 
sorter.sort(); 
console.log(sorter.collection);
```


---

## 🏗️ Refactoring Phase: The Flawed Solution Using Type Guards

### 📋 Key Conceptual Takeaways
* **The Union Type Limitation:** By switching to `number[] | string`, TypeScript restricts us to methods and properties that exist on *both* types (like `.length`).
* **Type Guards at Runtime:** To perform type-specific operations (like swapping array indices), we have to use runtime checks like `instanceof Array` or `typeof === 'string'`.
* **Why This Approach Fails Design Patterns:** This creates an unsustainable "bad code" architecture. Every time we want to add a new data type (like a Linked List), we have to alter the core `Sorter` class with another nested `if` block, breaking the **Open/Closed Principle**.

---

### 💻 The Flawed Implementation & Analysis (Untouched)

```typescript
class Sorter {
  /**
   * "public collection: number[]" in the constructor parameter is
   * TypeScript's parameter property shorthand. Writing "public" directly
   * in front of a constructor parameter does TWO things at once:
   * 1. Declares "collection" as a property on the class
   * 2. Assigns the passed-in argument to "this.collection"
   *
   * This single line is equivalent to writing all of this out longhand:
   * collection: number[];
   * constructor(collection: number[]) {
   * this.collection = collection;
   * }
   */
  constructor(public collection: number[] | string ) {}

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
   * - "length - 1" exists because arrays are zero-indexed - without it,
   * j + 1 would eventually reach past the last valid index.
   * - The extra "- i" shrinks the range further each pass, since the
   * last "i" elements are already sorted and don't need rechecking.
   *
   * The swap (only runs if collection[j] > collection[j + 1]):
   * 1. leftside = collection[j] -> rescue the left value BEFORE it
   * gets overwritten in the next line
   * 2. collection[j] = collection[j + 1] -> move the right value left
   * 3. collection[j + 1] = leftside -> move the rescued value right
   * Indexes j and j+1 stay fixed the whole time - only their contents
   * trade places.
   */

  sort(): void 
  {

    //same as const length = this.collection.length; Both do exactly the same thing.
    //The curly braces { } tell TypeScript "copy the value of the property called length
    //from this.collection, into a new variable also called length."
    const { length } = this.collection;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length -i -1; j++) 
      {
        /**
         *
         * If collection is an array, do this logic, referad to as a "typeGuard" in TypeScript.
         * This is a way to check the type of a variable at runtime.
         * The other reason we are using type guards is because we are using a union type for the collection property,
         * which means it can be either a number[] or a string. We need to check the type of the collection before
         * we can perform any operations on it, other wise we are only limted to working with the properties and methods
         * that are common to both types, which is not what we want.
         *
         */
        if(this.collection instanceof Array) {
          //Collection === number[]
          //All of htis only works if collection is a number[]
          //If collection is an array of numbers
          if (this.collection[j] > this.collection[j + 1]) 
          {
            const leftside = this.collection[j];
            this.collection[j] = this.collection [j + 1];
            this.collection[j + 1] = leftside;
          }
        }

        // Only going to work if collection is a string.
        //If collection is a string, do this logic instead:
        //~~~logic to compare and swap characters in a string goes here~~~
        if (typeof this.collection === 'string') 
        {

        }
      }
    }
  }
}

const sorter = new Sorter([10, 3, -5, 0]);
sorter.sort();
console.log(sorter.collection);
```

---

## 🏗️ Refactoring Phase: The Intermediate Solution (Decoupled Classes)

### 📋 Key Conceptual Takeaways
* **Delegation of Responsibility:** We stripped data mutation out of `Sorter`. `Sorter` now only manages the core sorting steps, while `NumbersCollection` owns the actual index swapping and comparisons.
* **Cleaner Loops:** The nested loops no longer contain messy array bracket logic or type guards. It reads almost like pure human logic: `if compare, then swap`.
* **The Semicolon Rule:** Ensured proper line termination inside the collection mutator to maintain consistent OOP styling conventions.

### 💻 Refactored Sorter Blueprint
```typescript
import { NumbersCollection } from "./NumbersCollection"
    
export class Sorter {
    constructor(public collection: NumbersCollection ) {}
   
    sort(): void {
        const { length } = this.collection;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i - 1; j++) {
                if (this.collection.compare(j, j + 1)) {                                   
                    this.collection.swap(j, j + 1);
                }       
            }
        }
    }
}
```
---

## 🏗️ Refactoring Phase: The Elegant Solution (Interface Polymorphism)

### 📋 Key Conceptual Takeaways
* **Loose Coupling via Interfaces:** By changing the constructor to accept the `Sortable` interface rather than a concrete class, `Sorter` can now sort *any* data structure (arrays, strings, linked lists) without needing modification [source: 1.3.3, 1.3.4].
* **Structural Typing / Duck Typing:** TypeScript uses structural typing [source: 1.3.4]. Unlike Java, a collection class doesn't explicitly need an `implements Sortable` keyword [source: 1.3.1]. As long as the class has `length`, `compare()`, and `swap()`, TypeScript permits it automatically!

### 💻 Production Blueprint with Consolidated Comments
```typescript
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
```
---

## 🔤 String Sorting Mechanics: CharactersCollection

### 📋 Key Conceptual Takeaways
* **ASCII Value Trap:** In the standard character set, uppercase letters (`A-Z: 65-90`) have lower numeric values than lowercase letters (`a-z: 97-122`). Without normalization, capitals always get stuck at the front of a sorted collection [INDEX].
* **Case-Insensitive Normalization:** Using `.toLowerCase()` inside `compare()` normalizes character weights for true alphabetical sorting without mutating the actual casing of the string dataset.
* **String Immutability Bypass:** JavaScript strings are immutable. To swap characters by index, the `swap()` method converts the string to a mutable array via `.split("")`, shifts the indices, and compiles it back into a string using `.join("")`.

### 💻 CharactersCollection Implementation
```typescript
export class CharactersCollection
{

    constructor(public data: string) { }

    get length(): number 
    {
        return this.data.length;
    }


    compare(leftIndex: number, rightIndex: number): boolean 
    {
        return (this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase());
    }


    swap(leftIndex: number, rightIndex: number): void 
    {
        const characters = this.data.split("");

        const leftHand = characters[leftIndex];
        characters[leftIndex] = characters[rightIndex];
        characters[rightIndex] = leftHand;

        this.data = characters.join("");
    }
}
```
---

## 🚦 Execution Phase: Testing Interface Polymorphism in index.ts

### 📋 Key Conceptual Takeaways
* **Pluggable Architecture:** Because the `Sorter` class demands a `Sortable` interface instead of a raw array, we can seamlessly swap out the data structure instance in our main execution file without changing a single line of our sorting engine algorithm [source: 3, 4].
* **Preserving Reference Code:** Commenting out previous dataset execution blocks (like `NumbersCollection`) allows us to easily flip our runtime context back and forth between numbers and text configurations for fast debugging [source: 3].

### 💻 Main Execution Sandbox (`index.ts`)
```typescript
import { Sorter } from "./Sorter";
import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";

// Test Case: Validating case-insensitive alphabetical string sorting
const charactersCollection = new CharactersCollection("Xaayb");
const sorter = new Sorter(charactersCollection);
sorter.sort();
console.log(charactersCollection.data);

// Historical Sandbox: Commented out to isolate string sorting verification
//const numbersCollection = new NumbersCollection([10000, 10, 3, -5, 0]);
//const sorter = new Sorter(numbersCollection);
//sorter.sort();
//console.log(numbersCollection.data);
```
