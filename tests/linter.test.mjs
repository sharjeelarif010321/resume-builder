import test from 'node:test';
import assert from 'node:assert/strict';
import LZString from 'lz-string';

// Test metric detection regex
const METRIC_REGEX = /\b(\d+(?:\.\d+)?%|\$[\d,]+(?:\.\d+)?[kmb]?|\d+x|\d+\s*(?:k|m|b)\b|\d+\+?\s*(?:users|clients|customers|servers|endpoints|nodes|queries|requests|qps|rps|ms|seconds|minutes|hours|days|weeks|months|years|tb|gb|mb|teams|engineers|developers|dollars))\b|\b\d{2,}\b/i;

test('Metric detector recognizes percentages, numbers, and scale units', () => {
  assert.equal(METRIC_REGEX.test('Reduced latency by 45% across all endpoints'), true);
  assert.equal(METRIC_REGEX.test('Handled 25,000+ daily requests'), true);
  assert.equal(METRIC_REGEX.test('P95 latency dropped to 18ms'), true);
  assert.equal(METRIC_REGEX.test('Saved $120k in cloud computing costs'), true);
  assert.equal(METRIC_REGEX.test('Responsible for team communication'), false);
});

test('Weak opener detection catches passive verbs', () => {
  const weakVerbs = ['helped', 'assisted', 'worked on', 'responsible for', 'handled'];
  const testPhrase = 'Assisted team with writing code';
  const firstWord = testPhrase.split(' ')[0].toLowerCase();
  assert.equal(weakVerbs.includes(firstWord), true);
});

test('LZString compress and decompress roundtrip preserves data', () => {
  const sampleData = { fullName: 'Sharjeel Arif', roles: ['Engineer'] };
  const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(sampleData));
  assert.ok(compressed.length > 0);
  const decompressed = JSON.parse(LZString.decompressFromEncodedURIComponent(compressed));
  assert.deepEqual(decompressed, sampleData);
});
