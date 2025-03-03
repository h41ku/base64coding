const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const lookup = new Uint8Array(256)
for (let i = 0; i < chars.length; i ++) {
    lookup[chars.charCodeAt(i)] = i
}

export const base64Encode = arrayBuffer => { // returns String

    let bytes = new Uint8Array(arrayBuffer)
    let len = bytes.length
    let result = ''

    for (let i = 0; i < len; i += 3) {
        result += chars[bytes[i] >> 2]
        result += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]
        result += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]
        result += chars[bytes[i + 2] & 63]
    }

    if (len % 3 === 2) {
        result = result.substring(0, result.length - 1) + '='
    } else if (len % 3 === 1) {
        result = result.substring(0, result.length - 2) + '=='
    }

    return result
}

export const base64Decode = base64String => { // returns ArrayBuffer

    if (base64String.length % 4) {
        throw new Error('Invalid argument: unexpected length of base64 encoded string.')
    }

    let bufferLength = (base64String.length / 4) * 3

    if (base64String[base64String.length - 1] === '=') {
        bufferLength --
        if (base64String[base64String.length - 2] === '=') {
            bufferLength --
        }
    }

    const arraybuffer = new ArrayBuffer(bufferLength)
    const bytes = new Uint8Array(arraybuffer)

    for (let i = 0, p = 0; i < base64String.length; i += 4) {

        let encoded1 = lookup[base64String.charCodeAt(i)]
        let encoded2 = lookup[base64String.charCodeAt(i + 1)]
        let encoded3 = lookup[base64String.charCodeAt(i + 2)]
        let encoded4 = lookup[base64String.charCodeAt(i + 3)]

        bytes[p ++] = (encoded1 << 2) | (encoded2 >> 4)
        bytes[p ++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)
        bytes[p ++] = ((encoded3 & 3) << 6) | (encoded4 & 63)
    }

    return arraybuffer
}

export const utf8ToBase64 = utf8String => base64Encode(new TextEncoder().encode(utf8String).buffer)

export const base64ToUtf8 = base64String => new TextDecoder().decode(new Uint8Array(base64Decode(base64String)))
