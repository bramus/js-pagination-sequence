# JavaScript Pagination Sequence Generator

Generate a sequence of numbers for use in a pagination system, the clever way.

## Installation

```bash
npm i @bramus/pagination-sequence
```

## Usage / Example

```js
import { generate } from '@bramus/pagination-sequence';

// [1, 2, '…', 65, 66, 67, 68, 69, '…', 73, 74]
const sequence = generate(67, 74);
```

## API

The exposed function has the following API:

```js
generate(curPage, numPages, numberOfPagesAtEdges = 2, numberOfPagesAroundCurrent = 2, glue = '…');
```

Parameters:

- `curPage`: The current active page
- `numPages`: The total number of pages
- `numberOfPagesAtEdges` _(default: 2)_: Number of pages to show on the outer edges.
- `numberOfPagesAroundCurrent` _(default: 2)_: Number of pages to show around the active page.
- `glue` _(default: '…')_: The string to show when there's a gap

## Limitations

To be clear: this package will only generate an array with values that needs to be shown. You will need to process the array yourself for use within your the JavaScript Framework Du Jour™. You might consider this a limitation.

## License

`@bramus/pagination-sequence` is released under the MIT public license. See the enclosed `LICENSE` for details.
