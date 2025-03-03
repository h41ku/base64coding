import { base64Encode, base64Decode, utf8ToBase64, base64ToUtf8 } from '../src/index.js'
import { assert, passTest } from './UnitTest.js'

function testEncodingStrings() {

	const samples = {
		'Abc': 'QWJj',
		'()=>[]': 'KCk9Pltd',
		'Привет!': '0J/RgNC40LLQtdGCIQ==',
		'abcd': 'YWJjZA==',
		'ab': 'YWI=',
		'a': 'YQ==',
		'': ''
	}

	for (let sample in samples) {
		const encodedString = utf8ToBase64(sample)
		assert(encodedString, samples[sample], 'A0')
		const decodedString = base64ToUtf8(encodedString)
		assert(decodedString, sample, 'A1')
	}
}

function testEncodingArrayBuffer() {

	const n = 1024
	const buffer = new ArrayBuffer(n)
	const sample = new Uint8Array(buffer)

	for (let i = 0; i < n; i ++) {
		sample[i] = (i % 255)
	}

	const encodedString = base64Encode(sample)
	const decodedBytes = new Uint8Array(base64Decode(encodedString))
	assert(sample.join(','), decodedBytes.join(','), 'A0')
}

passTest(testEncodingStrings)
passTest(testEncodingArrayBuffer)

