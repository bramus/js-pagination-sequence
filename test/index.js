import { equal, deepEqual } from 'assert';
// import { generate } from '../src/index.js'; // 🤔 SyntaxError: The requested module '@bramus/range' does not provide an export named 'range'
import { generate, generateFromObj } from '../dist/index.esm.js';

const addLeadingZeros = (value, targetLength) => {
    return value.toString().padStart(targetLength, '0');
};

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
    };
};

const runExample = (curPage, numPages, numberOfPagesAtEdges = 2, numberOfPagesAroundCurrent = 2, glue = '…') => {
    return generate(curPage, numPages, numberOfPagesAtEdges, numberOfPagesAroundCurrent, glue).map(prettyFormat(curPage)).join('-');
};

const runExampleWithObject = (options = {}) => {
    return generateFromObj(options).map(prettyFormat(options.curPage ?? 1)).join('-');
};

describe('basic series', () => {
    it('it should work', () => {
        equal(runExample(1, 11), '[01]-02-03-04-05-06-07-08-09-10-11');
        equal(runExample(2, 11), '01-[02]-03-04-05-06-07-08-09-10-11');
        equal(runExample(3, 11), '01-02-[03]-04-05-06-07-08-09-10-11');
        equal(runExample(4, 11), '01-02-03-[04]-05-06-07-08-09-10-11');
        equal(runExample(5, 11), '01-02-03-04-[05]-06-07-08-09-10-11');
        equal(runExample(6, 11), '01-02-03-04-05-[06]-07-08-09-10-11');
        equal(runExample(7, 11), '01-02-03-04-05-06-[07]-08-09-10-11');
        equal(runExample(8, 11), '01-02-03-04-05-06-07-[08]-09-10-11');
        equal(runExample(9, 11), '01-02-03-04-05-06-07-08-[09]-10-11');
        equal(runExample(10, 11), '01-02-03-04-05-06-07-08-09-[10]-11');
        equal(runExample(11, 11), '01-02-03-04-05-06-07-08-09-10-[11]');
    });

    it('it should work with adjusted numberOfPagesAtEdges', () => {
        equal(runExample(1, 11, 1), '[01]-02-03-04-05-06-07-..-11');
        equal(runExample(2, 11, 1), '01-[02]-03-04-05-06-07-..-11');
        equal(runExample(3, 11, 1), '01-02-[03]-04-05-06-07-..-11');
        equal(runExample(4, 11, 1), '01-02-03-[04]-05-06-07-..-11');
        equal(runExample(5, 11, 1), '01-02-03-04-[05]-06-07-..-11');
        equal(runExample(6, 11, 1), '01-..-04-05-[06]-07-08-..-11');
        equal(runExample(7, 11, 1), '01-..-05-06-[07]-08-09-10-11');
        equal(runExample(8, 11, 1), '01-..-05-06-07-[08]-09-10-11');
        equal(runExample(9, 11, 1), '01-..-05-06-07-08-[09]-10-11');
        equal(runExample(10, 11, 1), '01-..-05-06-07-08-09-[10]-11');
        equal(runExample(11, 11, 1), '01-..-05-06-07-08-09-10-[11]');
    });

    it('it should work with adjusted numberOfPagesAtEdges and numberOfPagesAroundCurrent', () => {
        equal(runExample(1, 11, 1, 1), '[01]-02-03-04-05-..-11');
        equal(runExample(2, 11, 1, 1), '01-[02]-03-04-05-..-11');
        equal(runExample(3, 11, 1, 1), '01-02-[03]-04-05-..-11');
        equal(runExample(4, 11, 1, 1), '01-02-03-[04]-05-..-11');
        equal(runExample(5, 11, 1, 1), '01-..-04-[05]-06-..-11');
        equal(runExample(6, 11, 1, 1), '01-..-05-[06]-07-..-11');
        equal(runExample(7, 11, 1, 1), '01-..-06-[07]-08-..-11');
        equal(runExample(8, 11, 1, 1), '01-..-07-[08]-09-10-11');
        equal(runExample(9, 11, 1, 1), '01-..-07-08-[09]-10-11');
        equal(runExample(10, 11, 1, 1), '01-..-07-08-09-[10]-11');
        equal(runExample(11, 11, 1, 1), '01-..-07-08-09-10-[11]');
    });
});

describe('larger series', () => {
    it('it should work', () => {
        equal(runExample(1, 12), '[01]-02-03-04-05-06-07-08-..-11-12');
        equal(runExample(5, 12), '01-02-03-04-[05]-06-07-08-..-11-12');
        equal(runExample(10, 12), '01-02-..-05-06-07-08-09-[10]-11-12');
    });

    it('it should work with adjusted numberOfPagesAroundCurrent', () => {
        equal(runExample(1, 11, 2, 1), '[01]-02-03-04-05-06-..-10-11');
        equal(runExample(2, 11, 2, 1), '01-[02]-03-04-05-06-..-10-11');
        equal(runExample(3, 11, 2, 1), '01-02-[03]-04-05-06-..-10-11');
        equal(runExample(5, 11, 2, 1), '01-02-03-04-[05]-06-..-10-11');
        equal(runExample(10, 11, 2, 1), '01-02-..-06-07-08-09-[10]-11');
    });

    it('it should work with adjusted numberOfPagesAtEdges and numberOfPagesAroundCurrent', () => {
        equal(runExample(1, 12, 1, 1), '[01]-02-03-04-05-..-12');
        equal(runExample(2, 12, 1, 1), '01-[02]-03-04-05-..-12');
        equal(runExample(3, 12, 1, 1), '01-02-[03]-04-05-..-12');
        equal(runExample(4, 12, 1, 1), '01-02-03-[04]-05-..-12');
        equal(runExample(5, 12, 1, 1), '01-..-04-[05]-06-..-12');
        equal(runExample(6, 12, 1, 1), '01-..-05-[06]-07-..-12');
        equal(runExample(7, 12, 1, 1), '01-..-06-[07]-08-..-12');
        equal(runExample(8, 12, 1, 1), '01-..-07-[08]-09-..-12');
        equal(runExample(9, 12, 1, 1), '01-..-08-[09]-10-11-12');
        equal(runExample(10, 12, 1, 1), '01-..-08-09-[10]-11-12');
        equal(runExample(11, 12, 1, 1), '01-..-08-09-10-[11]-12');
        equal(runExample(12, 12, 1, 1), '01-..-08-09-10-11-[12]');
    });
});

describe('large series', () => {
    it('it should work', () => {
        equal(runExample(1, 74), '[01]-02-03-04-05-06-07-08-..-73-74');
        equal(runExample(2, 74), '01-[02]-03-04-05-06-07-08-..-73-74');
        equal(runExample(3, 74), '01-02-[03]-04-05-06-07-08-..-73-74');
        equal(runExample(4, 74), '01-02-03-[04]-05-06-07-08-..-73-74');
        equal(runExample(5, 74), '01-02-03-04-[05]-06-07-08-..-73-74');
        equal(runExample(6, 74), '01-02-03-04-05-[06]-07-08-..-73-74');
        equal(runExample(7, 74), '01-02-..-05-06-[07]-08-09-..-73-74');
        equal(runExample(8, 74), '01-02-..-06-07-[08]-09-10-..-73-74');
        equal(runExample(9, 74), '01-02-..-07-08-[09]-10-11-..-73-74');
        equal(runExample(67, 74), '01-02-..-65-66-[67]-68-69-..-73-74');
        equal(runExample(68, 74), '01-02-..-66-67-[68]-69-70-..-73-74');
        equal(runExample(69, 74), '01-02-..-67-68-[69]-70-71-72-73-74');
        equal(runExample(70, 74), '01-02-..-67-68-69-[70]-71-72-73-74');
        equal(runExample(71, 74), '01-02-..-67-68-69-70-[71]-72-73-74');
        equal(runExample(72, 74), '01-02-..-67-68-69-70-71-[72]-73-74');
        equal(runExample(73, 74), '01-02-..-67-68-69-70-71-72-[73]-74');
        equal(runExample(74, 74), '01-02-..-67-68-69-70-71-72-73-[74]');
    });
});

describe('generate from object', () => {
    it('is should return the same', () => {
        equal(runExample(1, 1), runExampleWithObject());
        equal(runExample(1, 1), runExampleWithObject({}));

        equal(runExample(1, 74), runExampleWithObject({ curPage: 1, numPages: 74 }));
    });
});
