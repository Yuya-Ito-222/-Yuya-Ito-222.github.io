//idを取得するときは#を先頭に置く。querySelectorでそのidの最初の要素を取り出す
//#new-task-formはtextとsubmitのところ
const form = document.querySelector("#new-task-form");
//#new-task-inputはtextのところのid
const input = document.querySelector("#new-task-input");
//tasksリストの中身　
const list_el = document.querySelector("#tasks");


//formの要素にaddEventListerを追加。
//submitイベントはformが送信されたときに発生。
form.addEventListener('submit', function(event) {
    // イベントが明示的に処理されない場合に、その既定のアクションを通常通りに行うべきではないことを伝える
    //　下記がないと、クリックしたときにTaskリストに追加されない
    event.preventDefault();
    
    //テキストボックスの値を取得するにはinput要素を表すvalueプロパティを使用する
    const task = input.value;

    //divタグを追加
    const task_el = document.createElement('div');
    //divのclass名をつける taskへ
    task_el.classList.add('task');

    //divタグを追加
    const task_content_el = document.createElement('div');
    //上記divにクラス:contentを追加
    task_content_el.classList.add('content');
    //task_elの子要素にtask_content_elを追加する
    task_el.appendChild(task_content_el);


    //inputボックスを追加する　input要素を追加
    const task_input_el = document.createElement('input');
    //inputのクラスを追加　textへ
    task_input_el.classList.add('text');
    //typeを指示　textへ
    task_input_el.type = 'text';
    //valueを追加 上記のinputしたtaskが入ってくる
    task_input_el.value = task;
    // task_input_el.setAttribute('readonly', 'readonly');
    //task_content_elにtask_input_elの要素を追加する
    task_content_el.appendChild(task_input_el);

    //更にdiv要素を追加
    const task_actions_el = document.createElement('div');
    //上記divにクラス "actions"を追加
    task_actions_el.classList.add('actions');

    //button要素を追加
    const task_edit_el = document.createElement('button');
    //上記にクラス "edit"を追加する
    task_edit_el.classList.add('edit');
    //上記button要素にeditという文字をいれる
    task_edit_el.innerText = 'Edit';

    //button要素を追加
    const task_delete_el = document.createElement('button');
    //上記にクラス "delete"を追加する
    task_delete_el.classList.add('delete');
    //button要素に"Delete"の文字を追加する
    task_delete_el.innerText = 'Delete';

    //task_actions_elのdivにeditとdeleteの2つのボタンを子要素にする
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    //task_elのdivの要素にtask_actions_elを子要素に入れる
    //文字入れて入ってきたものと同レベルの子
    task_el.appendChild(task_actions_el);

    //大元のlist_elのdivにtask_elを追加する
    list_el.appendChild(task_el);

    //これはいらない気がする・・・。一度入れたvalueを初期化している？
    input.value = '';

    //edit編集にclickのイベントリスナーを追加する
    task_edit_el.addEventListener('click', function() {
        //toLowerCase()は呼び出す文字列の値を小文字に変換して返す
        if (task_edit_el.innerText === "EDIT") {
            task_edit_el.innerText = "SAVE";
            //編集できないようにする
            task_input_el.removeAttribute("readonly");
            //テキストフィールドに再度フォーカス　これがないと編集できない
            task_input_el.focus();
            //それ以外だったら。つまりSAVEで上に変更しているので、SAVEだったらどうするか
        } else {
            task_edit_el.innerText = "EDIT";
            task_input_el.setAttribute("readonly", "readonly");
        }
    });

    task_delete_el.addEventListener('click', function(){
    //73行目のtask_elを消去　これで子要素も含めて消去できる 
        list_el.removeChild(task_el);
    });
});
