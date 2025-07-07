# @connext/doom

Pequeña utilidad para manejar estados reactivos dentro de ConnextJS.

```ts
import { createDoomState } from '@connext/doom';

const counter = createDoomState(0);

counter.subscribe(value => {
  console.log('nuevo valor', value);
});

counter.set(1);
```
