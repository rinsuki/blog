---
title: NSButtonをCombineで扱いたい
date: 2019-10-09
tags:
  - Cocoa
  - Swift
  - Combine
---

NSButtonをCombineで扱いたい。

`NSTextField`、`NSTextView`はそれぞれNotificationCenterで`NSControl.textDidChangeNotification`/`NSText.didChangeNotification`を利用すればよいが、NSButtonにはそういう感じのNotificationはない。

じゃあどうするかというと、KVO (Key-Value Observing)を使う。

<!-- more -->

Combineでは`NSObject#publisher(for:options:)`を使うことで、従来のKVOをCombineの世界に持ってこれる[^1]。

しかし、素直に

```swift
// button is NSButton

button.publisher(for: \.state, options: [.initial, .new])
```

と書いても、initialを除いて変更が流れてこない。

なぜなら、NSButton.stateの実態は`NSButtonCell`へのproxyなため [^2]。

なので、`button.cell.state`を見るようにするとよい。

```swift
// button is NSButton

button.cell!.publisher(for: \.state, options: [.initial, .new])
```

[^1]: しかし、ドキュメントには developer.apple.com/documentation にも Xcode 内のものにも載っていない。Xcode上の補完では出るし説明も出るが、Jump to Definition しても Foundation framework の定義に飛ぶだけ(そしてその定義の中にも見当らない)、という謎がある。
[^2]: 最初に見つけたのは https://stackoverflow.com/a/3223395 。ドキュメントをよくよく見ると<blockquote>NSButton and NSMatrix both provide a control view, which displays an NSButtonCell object. However, while a matrix requires you to access the button cell objects directly, most button class methods act as “covers” for identically declared button cell methods. In other words, the implementation of the button method invokes the corresponding button cell method for you, allowing you to be unconcerned with the existence of the button cell. The only button cell methods that don’t have covers relate to the font used to display the key equivalent and to specific methods for highlighting or showing the state of the button.<br>(from <cite>https://developer.apple.com/documentation/appkit/nsbutton</cite>)</blockquote>と書いてあるのでまあわからなくもないが、KVOのことには一切触れられていないので、なかなか厳しい。まあそもそもドキュメントには`NSButtonCell`にKVOができるとも書いてないけど。
