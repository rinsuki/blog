---
title: Chromeを再起動するとGoogleのデフォルトアカウントがChromeでログインしているアカウントになるのをどうにかする
date: 2018-09-10 14:27:54
tags:
    - google
    - chrome
---

お久しぶりです。
新しいマシンをセットアップしていたのですが、その時に「Googleで複数アカウントにログインした状態でChromeを再起動すると、Googleでのデフォルトアカウントが強制的にChromeでログインしているものになる」現象が起き、対策方法を見つけたので紹介します。

<strong>2018年11月27日追記: Chrome 70以降では無効化の方法が変わったので、Chrome 70以降に対応した物を追記しました(macOS版 70.0.3538.102 と 72.0.3622.0 で検証)。</strong>

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
を開き、Defaultから

- Chrome 69の場合: Disabled
- Chrome 70以降の場合: Enabled Dice (fix auth errors)

にします。変更すると画面下にRELAUNCH NOWというボタンが出てくるので、そこをクリックしたあと、google.com上でログアウトし、好きな順番でログインし直せば完了です。