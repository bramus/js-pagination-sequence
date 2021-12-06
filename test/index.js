import { generate } from '../dist/index.js';

const addLeadingZeros = (value, targetLength) => {
    return value.toString().padStart(targetLength, '0');
}

const prettyFormat = (activeValue) => {
    return (value) => {
        if (value === '…') {
            return '..';
        }

        let formatted = addLeadingZeros(value, 2);

        if (value === activeValue) {
            return `[${formatted}]`;
        }

        return formatted;
    }
}

const runExample = (curPage, numPages, numberOfPagesAtEdges = 2, numberOfPagesAroundCurrent = 2, glue = '…') => {
    console.log(generate(curPage, numPages, numberOfPagesAtEdges, numberOfPagesAroundCurrent, glue).map(prettyFormat(curPage)).join('-'));
}

runExample(1, 11);
runExample(2, 11);
runExample(3, 11);
runExample(4, 11);
runExample(5, 11);
runExample(6, 11);
runExample(7, 11);
runExample(8, 11);
runExample(9, 11);
runExample(10, 11);
runExample(11, 11);
console.log('');

runExample(1, 11, 1);
runExample(2, 11, 1);
runExample(3, 11, 1);
runExample(4, 11, 1);
runExample(5, 11, 1);
runExample(6, 11, 1);
runExample(7, 11, 1);
runExample(8, 11, 1);
runExample(9, 11, 1);
runExample(10, 11, 1);
runExample(11, 11, 1);
console.log('');

runExample(1, 11, 1, 1);
runExample(2, 11, 1, 1);
runExample(3, 11, 1, 1);
runExample(4, 11, 1, 1);
runExample(5, 11, 1, 1);
runExample(6, 11, 1, 1);
runExample(7, 11, 1, 1);
runExample(8, 11, 1, 1);
runExample(9, 11, 1, 1);
runExample(10, 11, 1, 1);
runExample(11, 11, 1, 1);
console.log('');

runExample(1, 11, 1);
runExample(2, 11, 1);
runExample(3, 11, 1);
runExample(4, 11, 1);
runExample(5, 11, 1);
runExample(10, 11, 1);
console.log('');

runExample(1, 11, 1, 1);
runExample(2, 11, 1, 1);
runExample(3, 11, 1, 1);
runExample(4, 11, 1, 1);
runExample(5, 11, 1, 1);
runExample(10, 11, 1, 1);
console.log('');

runExample(1, 12, 1, 1);
runExample(2, 12, 1, 1);
runExample(3, 12, 1, 1);
runExample(4, 12, 1, 1);
runExample(5, 12, 1, 1);
runExample(6, 12, 1, 1);
runExample(7, 12, 1, 1);
runExample(8, 12, 1, 1);
runExample(9, 12, 1, 1);
runExample(10, 12, 1, 1);
runExample(11, 12, 1, 1);
runExample(12, 12, 1, 1);
console.log('');

runExample(1, 11, 2, 1);
runExample(2, 11, 2, 1);
runExample(3, 11, 2, 1);
runExample(5, 11, 2, 1);
runExample(10, 11, 2, 1);
console.log('');

runExample(1, 12);
runExample(5, 12);
runExample(10, 12);
console.log('');

runExample(1, 74);
runExample(2, 74);
runExample(3, 74);
runExample(4, 74);
runExample(5, 74);
runExample(6, 74);
runExample(7, 74);
runExample(8, 74);
runExample(9, 74);
console.log('…');
runExample(67, 74);
runExample(68, 74);
runExample(69, 74);
runExample(70, 74);
runExample(71, 74);
runExample(72, 74);
runExample(73, 74);
runExample(74, 74);
