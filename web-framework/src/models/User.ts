// Interface defining the optional name and age properties used by the
// constructor, get(), and set() methods.

// The ? marker makes these properties optional.
interface UserProps {

    name?: string;
    age?: number;
}

export class User
{
    constructor(private data: UserProps) { }

    // The instructor uses propName: string, such as
    // get(propName: string): number | string, however my TypeScript setup rejects that
    // because any string could be passed even though UserProps only defines "name" and "age".
    // keyof UserProps restricts propName to keys that actually exist on UserProps.
    //
    // The return type is a union because the selected property is not known until runtime:
    // "name" may contain a string, while "age" may contain a number.
    // Because these properties are now optional, either may also be undefined if it was
    // not supplied, so undefined must also be included in the return type.
    // The instructor's older TypeScript setup did not require undefined in the return type.
    get(propName: keyof UserProps): number | string | undefined
    {
        return this.data[propName];
    }
   
    // The instructor originally wrote the parameter type inline as:
    // set(update: { name: string; age: number }): void
    //
    // Using UserProps instead reuses the interface rather than repeating the same
    // property definitions. Because the UserProps properties are now optional,
    // set() can also receive only the properties that actually need to change.
    set(update: UserProps): void
    {
        // update is just the parameter name; it contains the property changes passed to set().
        // Object.assign() copies those properties onto the existing data object without
        // replacing properties that were not included in the update.
        Object.assign(this.data, update);
    }

}