import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string'; 
import layout from '../templates/components/number-to-english';

export default Component.extend({
  layout,
  number: 0,

  integerToWord: function(number) {
    let units, tens, scales, start, end, chunks,
        chunksLen, chunk, ints, i, word, words, and = 'und';

    // Is number zero?
    if(parseInt(number) === 0) {
      return 'null';
    }

    // Array of units as words
    units = [
      '', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht',
      'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn',
      'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'
    ];

    // Array of tens as words
    tens = [
      '', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig',
      'achtzig', 'neunzig'
    ];

    // Array of scales as words
    scales = [
      '', 'tausend', 'Million', 'Milliarde', 'Billion', 'Billiarde',
      'Trillion', 'Trilliarde', 'Quadrillion', 'Quadrilliarde', 'Quintillion',
      'Quintilliarde', 'Sextillion', 'Sextilliarde', 'Septillion',
      'Septilliarde', 'Oktillion', 'Oktilliarde', 'Nonillion', 'Nonilliarde',
      'Dezillion', 'Dezilliarde', 'Undezillion'
    ];

    // Split user argument into 3 digit chunks from right to left
    start = number.length;
    chunks = [];
    while(start > 0) {
      end = start;
      chunks.push(number.slice((start = Math.max(0, start - 3)), end));
    }

    // Check if function has enough scale words to be able to stringify the user argument
    chunksLen = chunks.length;
    if(chunksLen > scales.length) {
      return '';
    }

    // Stringify each integer in each chunk
    words = [];
    for(i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);
      if(chunk) {

        // Split chunk into array of individual integers
        ints = chunks[i].split( '' ).reverse().map(parseFloat);

        // If tens integer is 1, i.e. 10, then add 10 to units integer
        if(ints[1] === 1) {
          ints[0] += 10;
          ints[1] = 0;
        }

        // Add scale word if chunk is not zero and array item exists
        if((word = scales[i])) {
          if (i > 1)
          {
            if (ints[0] !== 1 || ints[1] || ints[2])
            {
              if (word.slice(-1) != 'e')
              {
                word += 'e';
              }
              word += 'n';
            }

            word = ' ' + word + ' ';
          }

          words.push(word);
        }

        // Add tens word if array item exists
        if((word = tens[ints[1]])) {
          words.push(word);
        }

        // Add 'and' string after units or tens integer
        if(ints[0] && ints[1]) {
          words.push(and);
        }

        // Add unit word if array item exists
        if((word = units[ints[0]])) {
          if (ints[0] === 1 && (ints[1] || i))
          {
            word = word.slice(0, word.length - 1);

            if (i > 1)
            {
              word += 'e';
            }
          }

          words.push(word);
        }

        // Add hundreds word if array item exists
        if((word = units[ints[2]])) {
          if (ints[2] === 1)
          {
            word = word.slice(0, word.length - 1);
          }

          words.push(word + 'hundert');
        }
      }
    }
    return words.reverse().join('');
  },

  word: computed('number', function() {
    let decimalNumber, integerNumberInWords, decimalNumberInWords, word;
    if (this.decimal) {
      let fullNumber = this.number.toString().split('.');
      let integerNumber = fullNumber[0].length === 0 ? '0' : fullNumber[0];
      decimalNumber = fullNumber[1].length === 0 ? '0' : fullNumber[1];
      integerNumberInWords = this.integerToWord(integerNumber);
      let i = decimalNumber.length;
      let digits = [];
      while (i--)
      {
        digits.push(this.integerToWord(decimalNumber[i]));
      }
      decimalNumberInWords = digits.reverse().join(' ');
    } else {
      integerNumberInWords = this.integerToWord(this.number.toString());
    }

    switch (this.decimal) {
      case 'word':
        word = decimalNumberInWords ? `${integerNumberInWords} Komma ${decimalNumberInWords}` : integerNumberInWords;
        break;
      case 'fraction':
        if (decimalNumberInWords) {
          word = `${integerNumberInWords} und <sup>${decimalNumber}</sup>&frasl;<sub>${`1${"0".repeat(decimalNumber.length)}`}</sub>`;
        } else {
          word = integerNumberInWords;
        }
        break;
      default:
        word = integerNumberInWords;
    }
    if(this.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return htmlSafe(word);
  })
});
