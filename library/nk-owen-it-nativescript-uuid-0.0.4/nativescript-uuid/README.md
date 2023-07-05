# NativeScript UUID
Usunięto zawartość pliku index.android.js ponieważ zawiera import tns-core-modules który nie działa z nativescript 8
This is a plugin for Nativescript that allows you to get a UUID (Universal Unique Identifier) for a device.

Inspired from [`StackOverflow: How to preserve identifierForVendor in ios after uninstalling ios app on device?`](http://stackoverflow.com/questions/21878560/how-to-preserve-identifierforvendor-in-ios-after-uninstalling-ios-app-on-device).

Uses [`SAMKeychain Cocoa Pod`](https://cocoapods.org/pods/SAMKeychain).

## Installation

Run the following command from the root of your project:

```bash
tns plugin add @owen-it/nativescript-uuid
```

## Usage

#### JavaScript
```js
  const nsUuid = require("nativescript-uuid");

  const uuid = nsUuid.getUUID();
  console.log(`The device UUID is ${uuid}`);
```

#### TypeScript
```typescript
  import {getUUID} from 'nativescript-uuid';

  const uuid = getUUID();
  console.log(`The device UUID is ${uuid}`);
```
