---
title: Chromeを再起動するとGoogleのデフォルトアカウントがChromeでログインしているアカウントになるのをどうにかする
date: 2018-09-10 14:27:54
tags:
    - google
    - chrome
---

お久しぶりです。
新しいマシンをセットアップしていたのですが、その時に「Googleで複数アカウントにログインした状態でChromeを再起動すると、Googleでのデフォルトアカウントが強制的にChromeでログインしているものになる」現象が起き、対策方法を見つけたので紹介します。

<!-- more -->

具体的には、以下のような挙動を直します。

- ChromeでGoogleアカウント producer@example.com にログインした状態で、google.com上でログアウトしたあとアカウント rin@example.com にログインする。これでgoogle.com上では rin@example.com がデフォルトアカウントになる
    - Googleアカウントはセッション内で最初にログインしたアカウントがそのセッションのデフォルトアカウントとして扱われる
- 上の手順でgoogle.com上で rin@example.com  をデフォルトアカウントにしたあと、 producer@example.com でログインする。
    - これで、google.com上では rin@example.com がデフォルト、 producer@example.com がサブアカウントになる
- Chromeを再起動する
- google.com上で producer@example.com がデフォルトになっている ← なんで???


## 直し方

```
chrome://flags#account-consistency
``` 
を開き、DefaultからDisabledにします。変更すると画面下にRELAUNCH NOWというボタンが出てくるので、そこをクリックしたあと、google.com上でログアウトし、好きな順番でログインし直せば完了です。