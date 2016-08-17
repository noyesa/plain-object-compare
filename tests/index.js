import { expect } from 'chai';
import compare from '../src/index';

describe('compare', () => {
  it('exists', () => {
    expect(compare).to.be.a('function');
  });

  it('compares primitives', () => {
    // Numbers.
    expect(compare(0, 0)).to.equal(true);
    expect(compare(0, 1)).to.equal(false);

    // Strings.
    expect(compare('a', 'a')).to.equal(true);
    expect(compare('a', 'b')).to.equal(false);

    // Booleans.
    expect(compare(true, true)).to.equal(true);
    expect(compare(true, false)).to.equal(false);
  });

  it('matches regular expressions against strings', () => {
    expect(compare(/yes/, 'yes')).to.equal(true);
    expect(compare(/yes/, 'no')).to.equal(false);
  });

  it('compares the literal property values of objects', () => {
    expect(compare({
      foo: 'bar',
    }, {
      foo: 'bar',
    })).to.equal(true);

    expect(compare({
      foo: 'bar',
    }, {
      foo: 'baz',
    })).to.equal(false);

    expect(compare({
      foo: 'bar',
      biz: 'baz',
    }, {
      foo: 'bar',
      biz: 'buzz',
    })).to.equal(false);
  });

  it('matches regular expression property values against string values', () => {
    expect(compare({
      foo: /yes/,
    }, {
      foo: 'yes',
    })).to.equal(true);

    expect(compare({
      foo: /yes/,
    }, {
      foo: 'no',
    })).to.equal(false);

    // Regular expressions are not compared from actual.
    expect(compare({
      foo: 'yes',
    }, {
      foo: /yes/,
    })).to.equal(false);
  });

  it('recurses nested objects', () => {
    expect(compare({
      foo: {
        bar: 'baz',
      },
    }, {
      foo: {
        bar: 'baz',
      },
    })).to.equal(true);

    expect(compare({
      foo: {
        bar: 'baz',
      },
    }, {
      buzz: 'bash',
    })).to.equal(false);
  });
});
