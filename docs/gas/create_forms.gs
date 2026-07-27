/**
 * 嘉手納町 0727研修 フォーム自動生成スクリプト
 *
 * 使い方:
 *   1. script.google.com で新規プロジェクトを作成し、このコードを貼り付け
 *   2. 実行する関数を選んで「実行」（初回は承認ダイアログでアクセスを許可）
 *   3. ログ（Ctrl+Enter / 実行ログ）に編集URLと回答URLが出るので控える
 *
 * 関数:
 *   createWork7Form()   … ワーク7「出させる? 出させない?」投票フォーム（本命）
 *   createOkNgQuiz()    … OK/NGラインクイズ（テストモード・即時採点+解説）
 *   createStepForm()    … 「2学期の一歩」持ち帰り設計フォーム
 *   createAllForms()    … 上記3本をまとめて作成
 *
 * 注意: ワーク9のAI利用ログは参加者が自作するワークなので、ここでは作らない。
 */

// ===== ワーク7: 出させる? 出させない? =====
function createWork7Form() {
  const form = FormApp.create('【0727研修】ワーク7 出させる? 出させない?');
  form.setDescription(
    '生成AIを子どもが使う場面について、いまのあなたの感覚で選んでください。\n' +
    '正解を当てるワークではありません。割れた場面こそ、職員室で話す価値があります。'
  );
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(false);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('ご回答ありがとうございます。結果は会場のスクリーンで共有します。');

  const CHOICES = ['出させる（AIに答え・成果物を出させてよい）',
                   '出させない（考えを深める使い方だけ）',
                   'AIを使わない'];

  const SCENES = [
    ['① 計算ドリルの答え合わせを、子どもがAIにさせる', ''],
    ['② 自由研究のテーマ決めを、子どもがAIに相談する', ''],
    ['③ 読書感想文の下書きを、子どもがAIに書かせる', ''],
    ['④ 実験計画の穴を、子どもがAIに指摘させる', ''],
    ['⑤ 調べ学習の年表整理を、子どもがAIにさせる', ''],
    ['⑥ 苦手な子向けの類題を、教師がAIに作らせる', '']
  ];

  SCENES.forEach(function (sc) {
    const item = form.addMultipleChoiceItem();
    item.setTitle(sc[0]).setChoiceValues(CHOICES).setRequired(true);
    if (sc[1]) item.setHelpText(sc[1]);
  });

  form.addParagraphTextItem()
    .setTitle('いちばん迷った場面と、その理由（任意）')
    .setRequired(false);

  Logger.log('■ ワーク7フォーム');
  Logger.log('編集URL: ' + form.getEditUrl());
  Logger.log('回答URL: ' + form.getPublishedUrl());
  Logger.log('※当日は回答タブの円グラフを投影してください');
  return form;
}

// ===== OK/NGラインクイズ（テストモード） =====
function createOkNgQuiz() {
  const form = FormApp.create('【0727研修】OK? NG? 生成AI活用ラインクイズ');
  form.setDescription('○か×か△か。判定そのものより「なぜそう考えたか」が大事です。')
      .setIsQuiz(true)
      .setCollectEmail(false)
      .setConfirmationMessage('お疲れさまでした。割れた問題は全体で扱います。');

  // [設問, 選択肢, 正解, 解説]
  const QUIZ = [
    ['学級通信の誤字脱字チェックをAIにさせた',
     ['○ 問題ない', '△ 場合による', '× やってはいけない'], '○ 問題ない',
     '校務での文章校正は最も安全な使い方。ただし固有名詞・日付は必ず自分で再確認を。'],
    ['通知表所見の素案をAIに作らせ、自分で書き直して確定した',
     ['○ 問題ない', '△ 場合による', '× やってはいけない'], '○ 問題ない',
     '本日のワーク4+5そのもの。事実メモから作り、最低1か所は自分の言葉に直して確定する。出力は下書き、決定は教師。'],
    ['AIが挙げた参考図書を、現物を確認せずに学級だよりに載せた',
     ['○ 問題ない', '△ 場合による', '× やってはいけない'], '× やってはいけない',
     '存在しない書籍・論文をもっともらしく挙げるのは生成AIの典型的な誤り（ハルシネーション）。実在確認は必須。'],
    ['子どもの作文を、名前が入ったまま貼り付けて添削させた',
     ['○ 問題ない', '△ 場合による', '× やってはいけない'], '× やってはいけない',
     '個人情報は入れない。名前を消すのではなく、最初から事実メモ・匿名番号に変換して入れないのが手癖。'],
    ['読書感想文の宿題で、子どもがAIに下書きを作らせた',
     ['○ 問題ない', '△ 場合による', '× やってはいけない'], '△ 場合による',
     '正解は「学校のルールと、その課題のねらいを確認しにいく行動」。ねらいが表現の練習なら学びは空洞化する（虚無）。コンクール応募なら規程違反になることも。'],
    ['授業中にAIの答えが間違っていたので、その場で子どもと一緒に検証した',
     ['○ 問題ない', '△ 場合による', '× やってはいけない'], '○ 問題ない',
     'むしろ最良の授業。AIの誤りは失敗ではなく教材。前日に一度試しておく（リハーサル）と、教室で余裕をもって扱える。']
  ];

  QUIZ.forEach(function (q) {
    const item = form.addMultipleChoiceItem();
    const choices = q[1].map(function (c) {
      return item.createChoice(c, c === q[2]);
    });
    item.setTitle(q[0])
        .setChoices(choices)
        .setPoints(1)
        .setRequired(true)
        .setFeedbackForCorrect(FormApp.createFeedback().setText(q[3]).build())
        .setFeedbackForIncorrect(FormApp.createFeedback().setText(q[3]).build());
  });

  Logger.log('■ OK/NGクイズ');
  Logger.log('編集URL: ' + form.getEditUrl());
  Logger.log('回答URL: ' + form.getPublishedUrl());
  Logger.log('※「回答後に成績を表示」設定になっているか確認してください');
  return form;
}

// ===== 2学期の一歩（持ち帰り設計） =====
function createStepForm() {
  const form = FormApp.create('【0727研修】2学期の一歩');
  form.setDescription('今日の研修の持ち帰りを1つだけ決めます。回答は各校のコアメンバーと教育委員会で共有します。')
      .setCollectEmail(false)
      .setConfirmationMessage('宣言ありがとうございました。2学期にお会いしましょう。');

  form.addListItem()
    .setTitle('学校名')
    .setChoiceValues(['嘉手納小学校', '屋良小学校', '嘉手納中学校', 'その他'])
    .setRequired(true);

  form.addListItem()
    .setTitle('2学期に鍛える「慣れ」を1つ選んでください')
    .setChoiceValues([
      'A1 対話で育てる（一発完成を求めない）',
      'A2 型で頼む（役割/ゴール/前提/形式）',
      'A3 出力を疑う（配る前に検品する）',
      'A4 個人情報を入れない（事実メモに変換する）',
      'A5 出力は下書き、決定は自分',
      'B6 答えを出させない使い方（問いを深める相棒として）',
      'B7 目的で使い分ける（再現か、拡張か）',
      'B8 子どもの前で失敗する（AIの誤りを教材にする）',
      'B9 出典まで行く（要約で止まらない）',
      'B10 記録と明示（採用と、捨てた理由）',
      'B11 手続きを確認する（規約・ルール・同意）',
      'B12 待つ（AIに触る前に自分の案を書く）'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('いつ・どこで試しますか?（単元名や場面、使うアプリまで具体的に）')
    .setHelpText('例: 10月の「割合」の単元で、誤答分析をスプレッドシートのGeminiでやってみる')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('いま不安なことを1つ')
    .setHelpText('この場でコアメンバーが答えます。答えきれなかったものは2学期のフォロー研修のネタにします。')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('「問いは、＿＿＿＿。」 — あなたの言葉で埋めてください（任意）')
    .setRequired(false);

  Logger.log('■ 2学期の一歩');
  Logger.log('編集URL: ' + form.getEditUrl());
  Logger.log('回答URL: ' + form.getPublishedUrl());
  return form;
}

// ===== まとめて作成 =====
function createAllForms() {
  const folderName = '0727研修フォーム';
  let folder;
  const it = DriveApp.getFoldersByName(folderName);
  folder = it.hasNext() ? it.next() : DriveApp.createFolder(folderName);

  const forms = [createWork7Form(), createOkNgQuiz(), createStepForm()];
  forms.forEach(function (f) {
    const file = DriveApp.getFileById(f.getId());
    file.moveTo(folder);
  });

  Logger.log('=== 3本を「' + folderName + '」フォルダにまとめました ===');
  Logger.log(folder.getUrl());
}
