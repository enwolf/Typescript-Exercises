# 📓 Developer Learning Log

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

