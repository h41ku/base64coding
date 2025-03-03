# base64coding

Библиотека с функциями для кодирования данных в Base64 и обратно.

## Установка

`npm install base64coding`

## Использование

Пример использования:

```javascript
import { base64Encode, base64Decode, utf8ToBase64, base64ToUtf8 } from 'base64coding'

hexString = base64Encode(arrayBuffer) // кодировать буфер в строку
arrayBuffer = base64Decode(hexString) // декодировать строку в буфер

base64String = utf8ToBase64(utf8String) // кодировать utf-8 строку в base64 строку
utf8String = base64ToUtf8(base64String) // декодировать base64 строку в utf-8 строку
```

## Описание API

Библиотека предоставляет следующие функции:

- `base64Encode(arrayBuffer)` - кодировать буфер `arrayBuffer` в строку в кодировке `base64`, возвращает закодированное содержимое буфера в виде строки в кодировке `base64`
- `base64Decode(base64String)` - декодировать строку `base64String` в двоичные данные, возвращает экземпляр класса `ArrayBuffer` с декодированными данными
- `utf8ToBase64(utf8String)` - кодировать строку `utf8String` из кодировки `utf-8` в строку в кодировке `base64`, возвращает строку в кодировке `base64`
- `base64ToUtf8(base64String)` - декодировать строку `base64String` в строку в `utf-8` кодировке, возвращает строку в `utf-8` кодировке
