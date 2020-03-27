---
title: App Sandboxの中のmacOSアプリから本当のホームディレクトリを知る
date: 2019-09-30
tags:
  - Cocoa
  - Swift
---

NSOpenPanelとか`com.apple.security.temporary-exception.files.home-relative-path`系を使うときに(Sandbox内のものではなく)本当のホームディレクトリが欲しくなることがありますが、

- `NSHomeDirectory()`
- `ProcessInfo.processInfo.environment["HOME"]`
- `("~/hoge/fuga" as NSString).expandingTildeInPath`

ではいずれもApp Sandbox内のホームディレクトリ(`/Users/xxxxx/Library/Containers/...`)が返されてしまったため、本当のホームディレクトリを返すAPIを探しました。

<!-- more -->

# 結論

`getpwuid(getuid())`で帰ってくる**Cのstruct**を見る

```swift
guard let pw = getpwuid(getuid()) else {
    // fatalErrorでもよいのでは
    let alert = NSAlert()
    alert.messageText = "エラー"
    alert.informativeText = "getpwuid(getuid())に失敗しました"
    alert.alertStyle = .critical
    alert.runModal()
    return
}
let homeDirPath = String(cString: pw.pointee.pw_dir)
print(homeDirPath) // "/Users/xxxxx"
```

もうちょっといい方法がありそうなものですが、私の力では見つけられませんでした。
もしもっと良い方法を知っていたらコメント欄で教えてくれると助かります。
