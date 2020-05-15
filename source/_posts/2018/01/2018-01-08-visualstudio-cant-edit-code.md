---
title: Visual Studio「コードが実行されているときは、変更が許可されません」をどうにかする
date: 2018-01-08
tags:
  - VisualStudio
  - VisualStudio2017
---

# 前提
- デバッグ実行
- あーここはそうじゃなくてこうだな、ちょっとソース編集しましょ
- VS「コードが実行されているときは、変更が許可されません」
- ア？？？？？？？？

# 注意点

- エディット コンティニュ機能を無効化するので、エディット コンティニュ機能でやれること(例外が投げられたときとかにコードを編集して再開など)はできなくなります
  - ただしXAMLに関してはそのまま

# やりかた

1. Visual Studioのメニューバーから「ツール」→「オプション」を選択
  ![image.png](https://qiita-image-store.s3.amazonaws.com/0/210120/73ef13ec-1052-c4cd-692b-39731a0adf5f.png)

1. 検索欄に「エディット」と入力して、出てきた中から「エディット コンティニュを有効にする」のチェックボックスを外してOKを押す
  ![image.png](https://qiita-image-store.s3.amazonaws.com/0/210120/c5ba0345-d758-1ec2-d359-e54f63eaec1e.png)

# 結果

デバッグ実行中でもコードが編集できます よかったね