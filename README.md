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

To be clear: this package will only generate an array with values that needs to be shown. You will need to process the array yourself for use within your the JavaScript Framework Du Jour™, as demonstrated in the Integration Example below. You might consider this a limitation.

## Integration Example (React)

🔗 Try it online: [https://codepen.io/bramus/pen/NWaxNKQ](https://codepen.io/bramus/pen/NWaxNKQ)

```js
import React from "react";
import ReactDOM from "react-dom";
import { generate } from "@bramus/pagination-sequence";

const BASE_URL = '#';

const PaginationEntry = ({ value, onEntryClick = null, label = null, title = null, isCurrent = false, isDisabled = false, ...props }) => {
    label ??= value;
    title ??= `Go to page ${value}`;
    onEntryClick ??= (e) => {};
        
    if (value == '…') {
        return (
            <li data-pagination-ellipsis {...props}><span>{label}</span></li>
        );
    }

    if (isDisabled) {
        return (
            <li data-pagination-disabled {...props}><span>{label}</span></li>
        );
    }

    if (isCurrent) {
        props['data-pagination-current'] = true;
    }

    return (
        <li {...props}>
            <a href={`${BASE_URL}/page/${value}`} title={title} onClick={onEntryClick}>{label}</a>
        </li>
    );
}

const Pagination = ({ curPage, numPages, numPagesAtEdges = 2, numPagesAroundCurrent = 2, onEntryClick = null }) => {
    const sequence = generate(curPage, numPages, numPagesAtEdges, numPagesAroundCurrent);
    // console.log(sequence);

    return (
        <ul className="pagination">
            <PaginationEntry data-pagination-first onEntryClick={onEntryClick} value={1} title="Go to First Page" label="&laquo;" isDisabled={curPage === 1} />
            <PaginationEntry data-pagination-prev onEntryClick={onEntryClick} value={curPage-1} title="Go to Previous Page" label="&lsaquo;" isDisabled={curPage === 1} />
            {sequence.map((val, idx) => 
                <PaginationEntry key={`page-${(val == '…') ? `…-${idx}` : val}`} onEntryClick={onEntryClick} value={val} isCurrent={val == curPage} />
            )}
            <PaginationEntry data-pagination-next onEntryClick={onEntryClick} value={curPage+1} title="Go to Next Page" label="&rsaquo;" isDisabled={curPage === numPages} />
            <PaginationEntry data-pagination-next onEntryClick={onEntryClick} value={numPages} title="Go to Last Page" label="&raquo;" isDisabled={curPage === numPages} />
        </ul>
    );
}

ReactDOM.render(
    <Pagination curPage="25" numPages="50" />,
    document.getElementById('root')
);
```
## License

`@bramus/pagination-sequence` is released under the MIT public license. See the enclosed `LICENSE` for details.
