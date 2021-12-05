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
import { generate } from "@bramus/pagination-sequence";

const BASE_URL = '#';

const PaginationEntry = ({ value, isCurrent = false }) => {
    if (value == '…') {
        return (
			<li data-pagination-ellipsis><span>…</span></li>
		);
    }
	
	if (isCurrent) {
		return (
			<li data-pagination-current><span>{value}</span></li>
		);
	}
	
    return (
        <li>
            <a href={`${BASE_URL}/page/${value}`} title={`Go to page ${value}`}>{value}</a>
        </li>
    );
}

const Pagination = ({ curr, max }) => {
    const sequence = generate(curr, max);

	// @TODO: Conditionally make the first/prev/next/last links active or inactive, but you get the idea …
    return (
		<ul className="pagination">
			<li data-pagination-first><a href={`${BASE_URL}/page/${1}`} title="First Page">&laquo;</a></li>
			<li data-pagination-prev><a href={`${BASE_URL}/page/${curr-1}`} title="Previous Page">&lsaquo;</a></li>
        	{sequence.map(number =>
				<PaginationEntry key={number} value={number} isCurrent={number == curr} />
			)}
			<li data-pagination-next><a href={`${BASE_URL}/page/${curr+1}`} title="Next Page">&rsaquo;</a></li>
			<li data-pagination-last><a href={`${BASE_URL}/page/${max}`} title="Last Page">&raquo;</a></li>
	    </ul>
	);
}

ReactDOM.render(
  <Pagination curr="25" max="50" />,
  document.getElementById('root')
);
```
## License

`@bramus/pagination-sequence` is released under the MIT public license. See the enclosed `LICENSE` for details.
