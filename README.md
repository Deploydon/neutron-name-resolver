# Neutron Name Resolver

Resolve Neutron addresses to Neutron Names and vice versa. This library provides both direct API functions and React hooks.


**Neutron.Name Contract Address:** `neutron12m8v02t70rkcks6c95la9f76rmve4c0xuxc80z7edvqr96xms2mqcdvyu4`

## Installation

```bash
npm install https://github.com/Deploydon/neutron-name-resolver
```

## Quick Start

```js
const { reverseLookup, resolveName, useReverseLookup } = require('neutron-name-resolver');
```

## API Functions

### `reverseLookup(address, rpc?)`

Look up a Neutron Name from a Neutron address.

**Parameters:**
- `address` (string, required): The Neutron address to lookup
- `rpc` (string, optional): Custom RPC endpoint

**Returns:** Promise that resolves to the name data or `null` if not found

**Example:**
```js
const result = await reverseLookup('neutron167ucsyj55sxh3vfsa000qs27vddepl0yyrwuww');
console.log(result); //"Deploydon"
```

### `resolveName(name, rpc?)`

Resolve a Neutron address from a Neutron Name.

**Parameters:**
- `name` (string, required): The Neutron Name to resolve
- `rpc` (string, optional): Custom RPC endpoint

**Returns:** Promise that resolves to the address data or `null` if not found

**Example:**
```js
const result = await resolveName('Deploydon');
console.log(result); //'neutron167ucsyj55sxh3vfsa000qs27vddepl0yyrwuww'
```

### `bulkReverseLookup(addresses, rpc?)`

Look up Neutron Names for multiple addresses in a single query.

**Parameters:**
- `addresses` (string[], required): Array of Neutron addresses to lookup
- `rpc` (string, optional): Custom RPC endpoint

**Returns:** Promise that resolves to an array of name data or `null` if error or not found. Will match the same index as provided. 

**Example:**
```js
const addresses = ['neutron167ucsyj55sxh3vfsa000qs27vddepl0yyrwuww', 'neutron1swap4q9fu42f2l5sm9qwneu62rl9zmx473wy6q'];
const results = await bulkReverseLookup(addresses);
console.log(results); // ["Deploydon",null]
```

## React Hooks

All React hooks support automatic refetching and provide loading/error states.

### `useReverseLookup(address, options?)`

React hook for reverse lookup functionality.

**Parameters:**
- `address` (string): The address to lookup
- `options` (object, optional):
  - `rpc` (string): Custom RPC endpoint
  - `enabled` (boolean): Whether the query is enabled (default: `true`)
  - `refetchInterval` (number): Auto-refetch interval in ms (default: `30000`)

**Returns:**
```js
{
  value: any,        // The lookup result
  isLoading: boolean, // Loading state
  error: Error,      // Error object if any
  isError: boolean,  // Whether there's an error
  refetch: function  // Manual refetch function
}
```

**Example:**
```jsx
function AddressDisplay({ address }) {
  const { value, isLoading, error } = useReverseLookup(address);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{value?.name || address}</div>;
}
```

### `useResolveName(name, options?)`

React hook for name resolution functionality.

**Parameters:**
- `name` (string): The name to resolve
- `options` (object, optional): Same as `useReverseLookup`

**Returns:** Same structure as `useReverseLookup`

**Example:**
```jsx
function NameResolver({ name }) {
  const { value, isLoading } = useResolveName(name);
  
  return (
    <div>
      {isLoading ? 'Resolving...' : value?.address}
    </div>
  );
}
```

### `useBulkReverseLookup(addresses, options?)`

React hook for bulk reverse lookup functionality.

**Parameters:**
- `addresses` (string[]): Array of addresses to lookup
- `options` (object, optional): Same as `useReverseLookup`

**Returns:** Same structure as `useReverseLookup`

**Example:**
```jsx
function AddressList({ addresses }) {
  const { value, isLoading } = useBulkReverseLookup(addresses);
  
  if (isLoading) return <div>Loading names...</div>;
  
  return (
    <ul>
      {value?.map((result, index) => (
        <li key={addresses[index]}>
          {result?.name || addresses[index]}
        </li>
      ))}
    </ul>
  );
}
```

## Configuration

A RPC is already defined, but you can override and provide a custom endpoint if you need to. 