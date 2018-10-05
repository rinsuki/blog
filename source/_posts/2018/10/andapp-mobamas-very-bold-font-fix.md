---
title: AndApp(macOS)版モバマスのやたらと太いフォントをどうにかする
date: 2018-10-05 23:27:25
tags:
---

タイトル通り。
macOSのAndApp版のモバマス(というか、Electronの日本語のbold描画)は明らかにフォントが(ChromeApps版/Chrome+UA偽造より)太いです。

<img src="https://img.esa.io/uploads/production/attachments/9631/2018/10/05/39944/73035941-7d50-46a9-a178-f41c7da8f627.png" height=240>
(左がAndApp版モバマス、右がChrome+UA偽造)

この挙動を何とか直せないかと試行錯誤していたところ、AndApp版モバマスのアプリのファイルを一部書き替える形で直せたので、ここにメモしておきます。

<!-- more -->

## 注意事項

この手順ではAndApp版モバマスアプリの中身を一部書き換えます。この変更をしたことにより、あなたが誰かから怒られたり、(ないとは思いますが)モバゲーアカウントがBANされたりしても筆者は責任を負いません。了承できる方のみ**自己責任で**行なってください。

##  手順

まず、AndApp版モバマスが起動している場合は終了させてください。
そうしたら、Terminal.appを開き、

```
curl https://gist.githubusercontent.com/rinsuki/690c4a9e19ef6ae690098b52116f3801/raw/andapp-mobamas-fix-font-family.sh | sh
```

を実行してください。成功すれば、以下の画像のようにcurlのDL速度表示のみが表示されるはずです。
![image.png (853.8 kB)](https://img.esa.io/uploads/production/attachments/9631/2018/10/06/39944/baa3cb86-d873-4943-8efe-1b18d2e0f0f5.png)

あとはAndApp版モバマスアプリを起動して、実際に反映されているか確かめるだけです。

もし失敗したり元に戻したい場合は、AndAppのアプリ→アプリケーションを管理→(下にスクロールして)アプリケーションのところにある「アイドルマスターシンデレラガールズ」をuninstallしたあと、トップとかカテゴリから探してインストールしなおしてください。
