import { range } from '@bramus/range';

/**
 * Generate a sequence of numbers for use in a pagination system, the clever way.
 * @author Bramus Van Damme <bramus@bram.us>
 *
 * The algorithm always returns the same amount of items in the sequence,
 * independent of the position of the current page.
 *
 * Example rows generated:
 * (adjusted to indicate the current page between [] + leading 0s added)
 *
 * [01]-02-03-04-05-06-07-08-..-73-74
 * 01-[02]-03-04-05-06-07-08-..-73-74
 * 01-02-[03]-04-05-06-07-08-..-73-74
 * 01-02-03-[04]-05-06-07-08-..-73-74
 * 01-02-03-04-[05]-06-07-08-..-73-74
 * 01-02-03-04-05-[06]-07-08-..-73-74
 * 01-02-..-05-06-[07]-08-09-..-73-74
 * 01-02-..-06-07-[08]-09-10-..-73-74
 * 01-02-..-07-08-[09]-10-11-..-73-74
 * ...
 * 01-02-..-65-66-[67]-68-69-..-73-74
 * 01-02-..-66-67-[68]-69-70-..-73-74
 * 01-02-..-67-68-[69]-70-71-72-73-74
 * 01-02-..-67-68-69-[70]-71-72-73-74
 * 01-02-..-67-68-69-70-[71]-72-73-74
 * 01-02-..-67-68-69-70-71-[72]-73-74
 * 01-02-..-67-68-69-70-71-72-[73]-74
 * 01-02-..-67-68-69-70-71-72-73-[74]
 *
 */
const generate = (curPage, numPages, numPagesAtEdges = 2, numPagesAroundCurrent = 2, glue = '…') => {

    // Define the number of items we would generate in a normal scenario
    // (viz. lots of pages, current page in the middle):
    //
    // numItemsInSequence = the current page + the number of items surrounding
    // the current page (left and right) + the number of items at the edges
    // of the generated sequence (left and right) + the glue in between the
    // different parts generated
    //
    // The goal is to enforce all sequences generated to have this amount
    // of items. By default this magic number would be 11, as seen/counted
    // in this sequence: 1-02-..-11-12-[13]-14-15-..-88-74
    const numItemsInSequence = 1 + (numPagesAroundCurrent * 2) + (numPagesAtEdges * 2) + 2;

    // curPage cannot be greater than numPages.
    const reworkedCurPage = Math.min(curPage, numPages);

    // The value we're about to return$
    let finalSequence = [];

    // If we have less than numItemsInSequence pages in total, there is no need to
    // start calculating but just return the full sequence, starting at 1
    if (numPages <= numItemsInSequence) {
        finalSequence = range(1, numPages);
    }

    // We have more pages than numItemsInSequence, start calculating
    else {

        // If we have no forced amount of items on the edges, then the
        // sequence must start from the current page number instead of 1
        const start = (numPagesAtEdges > 0) ? 1 : reworkedCurPage;

        // Parts of the sequence we'll be generating
        const sequence = {
            leftEdge: null,
            glueLeftCenter: null,
            centerPiece: null,
            glueCenterRight: null,
            rightEdge: null,
        };

        // If the current page is nearby the left edge (viz. curPage is
        // less than half of numItemsInSequence away from left edge):
        // Don't generate a Center Piece, but extend the left part as
        // the left part would otherwise overlap the center piece.
        if (reworkedCurPage < (numItemsInSequence/2)) {
            sequence.leftEdge = range(1, Math.ceil(numItemsInSequence/2) + numPagesAroundCurrent);
            sequence.centerPiece = [glue];
            if (numPagesAtEdges > 0) sequence.rightEdge = range(numPages-(numPagesAtEdges-1), numPages);
        }

        // If the current page is nearby the right edge (viz. curPage is
        // less than half of numItemsInSequence away from right edge):
        // Don't generate a center piece but extend the right part as
        // the right part would otherwise overlap the center piece.
        else if (reworkedCurPage > numPages - (numItemsInSequence/2)) {
            if (numPagesAtEdges > 0) sequence.leftEdge = range(start, numPagesAtEdges);
            sequence.centerPiece = [glue];
            sequence.rightEdge = range(Math.min(numPages - Math.floor(numItemsInSequence/2) - numPagesAroundCurrent, reworkedCurPage - numPagesAroundCurrent), numPages);
        }

        // The current page falls somewhere in the middle:
        // Generate ranges normally
        else {

            // Center Piece
            sequence.centerPiece = range(reworkedCurPage - numPagesAroundCurrent, reworkedCurPage + numPagesAroundCurrent);

            // Left/Right Edges (only if we requested)
            if (numPagesAtEdges > 0) sequence.leftEdge = range(start,numPagesAtEdges);
            if (numPagesAtEdges > 0) sequence.rightEdge = range(numPages-(numPagesAtEdges-1), numPages);

            // The glue we'll use to stick left, center, and right together
            // Special case: If the gap between left and center is only one
            // unit, don't add '...' but add that number instead
            sequence.glueLeftCenter = (sequence.centerPiece[0] == (numPagesAtEdges+2)) ? [numPagesAtEdges+1] : [glue];
            sequence.glueCenterRight = [glue];

        }

        // Join all (non-empty) parts of sequence into the final sequence
        finalSequence = Object.values(sequence).filter(v => v !== null).flat();

    }

    return finalSequence;
};

export { generate };
