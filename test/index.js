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

console.log(generate(1, 11).map(prettyFormat(1)).join('-'));
console.log(generate(2, 11).map(prettyFormat(2)).join('-'));
console.log(generate(3, 11).map(prettyFormat(3)).join('-'));
console.log(generate(4, 11).map(prettyFormat(4)).join('-'));
console.log(generate(5, 11).map(prettyFormat(5)).join('-'));
console.log(generate(10, 11).map(prettyFormat(10)).join('-'));
console.log('');

console.log(generate(1, 11, 1).map(prettyFormat(1)).join('-'));
console.log(generate(2, 11, 1).map(prettyFormat(2)).join('-'));
console.log(generate(3, 11, 1).map(prettyFormat(3)).join('-'));
console.log(generate(4, 11, 1).map(prettyFormat(4)).join('-'));
console.log(generate(5, 11, 1).map(prettyFormat(5)).join('-'));
console.log(generate(10, 11, 1).map(prettyFormat(10)).join('-'));
console.log('');

console.log(generate(1, 11, 1, 1).map(prettyFormat(1)).join('-'));
console.log(generate(2, 11, 1, 1).map(prettyFormat(2)).join('-'));
console.log(generate(3, 11, 1, 1).map(prettyFormat(3)).join('-'));
console.log(generate(4, 11, 1, 1).map(prettyFormat(4)).join('-'));
console.log(generate(5, 11, 1, 1).map(prettyFormat(5)).join('-'));
console.log(generate(10, 11, 1, 1).map(prettyFormat(10)).join('-'));
console.log('');

console.log(generate(1, 11, 2, 1).map(prettyFormat(1)).join('-'));
console.log(generate(2, 11, 2, 1).map(prettyFormat(2)).join('-'));
console.log(generate(3, 11, 2, 1).map(prettyFormat(3)).join('-'));
console.log(generate(5, 11, 2, 1).map(prettyFormat(5)).join('-'));
console.log(generate(10, 11, 2, 1).map(prettyFormat(10)).join('-'));
console.log('');

console.log(generate(1, 12).map(prettyFormat(1)).join('-'));
console.log(generate(5, 12).map(prettyFormat(5)).join('-'));
console.log(generate(10, 12).map(prettyFormat(10)).join('-'));
console.log('');

console.log(generate(1, 74).map(prettyFormat(1)).join('-'));
console.log(generate(2, 74).map(prettyFormat(2)).join('-'));
console.log(generate(3, 74).map(prettyFormat(3)).join('-'));
console.log(generate(4, 74).map(prettyFormat(4)).join('-'));
console.log(generate(5, 74).map(prettyFormat(5)).join('-'));
console.log(generate(6, 74).map(prettyFormat(6)).join('-'));
console.log(generate(7, 74).map(prettyFormat(7)).join('-'));
console.log(generate(8, 74).map(prettyFormat(8)).join('-'));
console.log(generate(9, 74).map(prettyFormat(9)).join('-'));
console.log('…');
console.log(generate(67, 74).map(prettyFormat(67)).join('-'));
console.log(generate(68, 74).map(prettyFormat(68)).join('-'));
console.log(generate(69, 74).map(prettyFormat(69)).join('-'));
console.log(generate(70, 74).map(prettyFormat(70)).join('-'));
console.log(generate(71, 74).map(prettyFormat(71)).join('-'));
console.log(generate(72, 74).map(prettyFormat(72)).join('-'));
console.log(generate(73, 74).map(prettyFormat(73)).join('-'));
console.log(generate(74, 74).map(prettyFormat(74)).join('-'));
