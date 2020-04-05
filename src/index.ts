/**
 * Index types
 * Reference: https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
 */

// Lookup Types

// type Person = {
//     name: string;
//     age: number;
//     location: string;
// }

type age = Person['age']
type name = Person['name']
type nameOrAge = Person['age' | 'name']

type PersonKey = keyof Person

const PersonProp: PersonKey = 'location'

function get<T, K extends keyof T>(obj: T, propertyName: K): T[K] {
    return obj[propertyName]
}

let x: { foo: number; bar: string; } = {foo: 10, bar: "hello!"}

let foo = get(x, 'foo')
let bar = get(x, 'bar')


function pluck<T, K extends keyof T>(data: T[], key: K): T[K][] {
    return data.map(item => item[key])
}

let y: { foo: number; bar: string; } = { foo: 20, bar: "world!" }


/**
 * Mapped Types
 * Reference: https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
 */

// type Person = {
//     name: string;
//     age: number;
//     location: string;
// }

type BooleanifiedPerson = {
    [P in "name" | "age" | "location"]: Person[P]
}

type BooleanifiedPerson2 = {
    [P in keyof Person]: boolean
}

type Booleanify<T> = {
    [P in keyof T]: boolean
}

type BooleanifiedPerson3 = Booleanify<Person>

/**
 * 幽霊型(Phantom Types)
 */

type FirstName = string & { __BrandFirstName: never}
type LastName = string & { __BrandLastName: never}

const getFullName = (firstName: FirstName, lastName: LastName) => firstName + ' ' + lastName

const firstName: FirstName = 'john' as FirstName
const lastName: LastName = 'Smith' as LastName

const fullName = getFullName(firstName, lastName)


/**
 * Conditional types
 */

type Person = {
    name: string;
    age: number;
    location: string;
}

// let personKey: keyof Person
type NumberKeys<T> = {
    [P in keyof T]: number extends T[P] ? P :never
}[keyof T]

type numberKeys = NumberKeys<Person>


type StringKeys<T> = {
    [P in keyof T]: string extends T[P] ? P : never
}[keyof T]

type stringKeys = StringKeys<Person>


type Diff<T, U> = T extends U ? never : T;
let e: Diff<"hoge" | "foo" | "piyo", "foo">


// `infer T`
type _ReturnType<T> = T extends (first: infer U, ...args: any[]) => any ? T : never

function say(str: string): void {}
function add(a: number, b: number): number {
    return a + b
}
type hoge = string
let f: _ReturnType<typeof say>

type ResolveType<T> = T extends Promise<infer R> ? T : never

async function promiseFunc(): Promise<{ name: string}> {
    return {
        name: 'hoge'
    }
}

type _resolvedType = ResolveType<ReturnType<typeof promiseFunc>>


type actionA = (payload: number) => ({
    type: 'actionA',
    payload
})

const actionA = (payload: number): ActionA => ({
    type: 'actionA',
    payload
})


let name: string = 'Gunji'



/**
 * Examples
 */

 type FruitsMap = {
     banana: { name: "banana", price: number }
     apple: { name: "apple", price: number }
     orange: { name: "orange" }
 }

 type Filter<T, U> = T extends U ? T : never
 type FilteredMap<T, U> = {
     [K in keyof T]: T[K] extends Filter<T[K], U> ? T[K] : never
 }

 type filtered = FilteredMap<FruitsMap, { price: number }>
