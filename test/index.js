/* globals QUnit */
'use strict';

var chalk = require('chalk');
var logUtils = require('../');

QUnit.module('Helpers', function () {
  QUnit.test('uncolor', function(assert) {
    var chalked = chalk.red('a') + chalk.bold.green('b') + chalk.blue.underline('c');
    assert.notEqual(chalked, 'abc', 'chalked');
    assert.equal(logUtils.uncolor(chalked), 'abc', 'uncolor');
  });
  QUnit.test('wordlist', function(assert) {
    assert.equal(logUtils.uncolor(logUtils.wordlist(['a', 'b'])), 'a, b');
    assert.equal(logUtils.uncolor(logUtils.wordlist(['a', 'b'], {separator: '-'})), 'a-b');
  });
  QUnit.test('wraptext', function(assert) {
    // // I'm not writing out comprehensive unit tests for this right now.
    // function doAll(text) {
    //   console.log('==========');
    //   console.log('==========');
    //   [4, 6, 10, 15, 20, 25, 30, 40, 60].forEach(function(n) {
    //     doOne(n, text);
    //   });
    // }
    // function doOne(n, text) {
    //   console.log(new Array(n + 1).join('-'));
    //   console.log(logUtils.wraptext(n, text));
    // }
    // var text = 'this is '.red + 'a simple'.yellow.inverse + ' test of'.green + ' ' + 'some wrapped'.blue + ' text over '.inverse.magenta + 'many lines'.red;
    // doAll(text);
    // text = 'foolish '.red.inverse + 'monkeys'.yellow + ' eating'.green + ' ' + 'delicious'.inverse.blue + ' bananas '.magenta + 'forever'.red;
    // doAll(text);
    // text = 'foolish monkeys eating delicious bananas forever'.rainbow;
    // doAll(text);

    assert.equal(logUtils.wraptext(2, 'aabbc'), 'aa\nbb\nc');
    assert.equal(logUtils.wraptext(2, 'aabbcc'), 'aa\nbb\ncc');
    assert.equal(logUtils.wraptext(3, 'aaabbbc'), 'aaa\nbbb\nc');
    assert.equal(logUtils.wraptext(3, 'aaabbbcc'), 'aaa\nbbb\ncc');
    assert.equal(logUtils.wraptext(3, 'aaabbbccc'), 'aaa\nbbb\nccc');
    assert.equal(logUtils.uncolor(logUtils.wraptext(3, chalk.blue('aaa') + chalk.green('bbb') + chalk.underline('c'))), 'aaa\nbbb\nc');
    assert.equal(logUtils.uncolor(logUtils.wraptext(3, chalk.blue('aaa') + chalk.green('bbb') + chalk.underline('cc'))), 'aaa\nbbb\ncc');
    assert.equal(logUtils.uncolor(logUtils.wraptext(3, chalk.blue('aaa') + chalk.green('bbb') + chalk.underline('ccc'))), 'aaa\nbbb\nccc');
  });
  QUnit.test('table', function(assert) {
    assert.equal(logUtils.table([3, 1, 5, 1, 8, 1, 12, 1, 20], [
      'a aa aaa aaaa aaaaa',
      '|||||||',
      'b bb bbb bbbb bbbbb',
      '|||||||',
      'c cc ccc cccc ccccc',
      '|||||||',
      'd dd ddd dddd ddddd',
      '|||||||',
      'e ee eee eeee eeeee eeeeee',
    ]), 'a  |b bb |c cc ccc|d dd ddd    |e ee eee eeee eeeee \n' +
        'aa |bbb  |cccc    |dddd ddddd  |eeeeee              \n' +
        'aaa|bbbb |ccccc   |            |\n' +
        'aaa|bbbbb|        |            |\n' +
        'a  |     |        |            |\n' +
        'aaa|     |        |            |\n' +
        'aa |     |        |            |');
  });
});
