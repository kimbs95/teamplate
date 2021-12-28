//=========== 함수 선언부 ===========//
const friends = [
    {   
        id: 1,
        name: '홍길동1',
        number: '010-1234-5678'
    },

    {
        id: 2,
        name: '김철수',
        number: '010-1234-5678'
    }
];

// 플러스버튼 클릭 이벤트(친구정보 추가)
function addList(span) {
    const $newLi = document.createElement('li');
    $newLi.classList.add('clearfix');
    const $name = document.querySelector('.name input');
    const $phoneNumber = document.querySelector('.phone-number input');
    
    if ($name.value.trim() === '' || $phoneNumber.value.trim() === '') {
        $name.placeholder = '필수 입력사항입니다!';
        $phoneNumber.placeholder = '필수 입력사항입니다!';
    } else {
        $newLi.innerHTML = `
            <div class="list-info">
            <span class="text">${$name.value}</span><span class="number">${$phoneNumber.value}</span>
            </div>
            <div class="mod">
                <div class="remove"><span class="lnr lnr-cross-circle"></span></div>
                <div class="modify"><span class="lnr lnr-undo"></span></div>
            </div>
        `;
        const $ul = document.querySelector('.list');
        $ul.appendChild($newLi);
        
        // 데이터 처리
        const newFriend = {
            id: makeNewId(),
            name: $name.value,
            number: $phoneNumber.value
        }
        friends.push(newFriend);
        // input창 초기화
        $name.value = '';
        $name.placeholder = '이름을 입력하세요.';
        $phoneNumber.value = '';
        $phoneNumber.placeholder = '전화번호를 입력하세요(-포함)';
    }

}

function makeNewId() {
    if (friends.length >= 1) {
        // 기존의 맨 마지막데이터 할일의 id값 +1
        const newId = friends[friends.length - 1].id + 1;
        return newId;
    } else {                // 리스트가 1개도 없을때
        return 1;
    }
}

// 수정하는부분 input 으로 변경  부분

function $modify(target) {

    // 이모티콘 변경
    target.classList.replace('lnr-undo','lnr-checkmark-circle');

    // 텍스트 복사
    const $modifys = document.querySelector('.modify');
    const $textspan = target.parentElement.parentElement.previousElementSibling.firstElementChild;
    const $change = $textspan.parentElement;
    const $number = target.parentElement.parentElement.previousElementSibling.lastElementChild

    // console.log($textspan);
    // input 생성
    const $input = document.createElement('input');
    $input.setAttribute('type','text');
    $input.setAttribute('value', $textspan.textContent);
    // $input.value=$textspan.textContent;
    
    // 전화번호 복사
    const $phone = document.createElement('input');
    $phone.setAttribute('type','text');
    // console.log('ddd',$number);
    $phone.setAttribute('value',$number.textContent);
    // console.log($phone);
    $change.replaceChild($phone,$number);
    $change.replaceChild($input,$textspan);
    // console.log($change);

}

// 수정 완료 하면서 데이터 저장
function $check(target) {

    // 이모티콘 변경
    target.classList.replace('lnr-checkmark-circle','lnr-undo');

    // 검색란 취득
    const $input = target.parentElement.parentElement.previousElementSibling.firstElementChild;
    const $number = target.parentElement.parentElement.previousElementSibling.lastElementChild

    //span text 연결 
    const $textspan = document.createElement('span');
    $textspan.classList.add('text');
    $textspan.textContent = $input.value;
    console.log($textspan.textContent);

    //span phone 연결
    const $phone = document.createElement('span');
    $phone.classList.add('number');
    $phone.textContent = $number.value;

    const $change = $input.parentElement;
    $change.replaceChild($textspan, $input);
    $change.replaceChild($phone, $number);
    // console.log($change);

    //데이터 변경
    const $datas = $textspan.parentElement.parentElement.dataset.id
    const $indexnumber = index(+$datas);
    friends[$indexnumber].name = $textspan.textContent;
    friends[$indexnumber].number = $phone.textContent;

}

// 렌더링 삭제 데이터 삭제
function $dele(target) {
    const listLi = target.parentElement.parentElement.parentElement; 
    const listUl = document.querySelector('.list');
    listUl.removeChild(listLi);

    // 데이터 삭제
    const bye = index(+listLi.dataset.id);
    friends.splice(bye,1)
}

function index(number) {
    for(let i = 0 ; i < friends.length; i++) {
        if(number === friends[i].id){
            return i ;
        }else {
            return 1 ;
        }
    }
}


//============= 함수 호출부 ============//
(function () {
    
    // 플러스버튼 클릭 이벤트
    const $add = document.getElementById('add');
    $add.addEventListener('click', e => {
        addList(e.target);
        // console.log(e.target);
    });

    const $ulList = document.querySelector('.list');
    $ulList.addEventListener('click', e => {
        if(e.target.matches('div.modify .lnr-undo')){
            $modify(e.target);
        }else if (e.target.matches('div.modify .lnr-checkmark-circle')){
            $check(e.target);
            // console.log($check);
        }else if (e.target.matches('div.remove .lnr-cross-circle')){
            $dele(e.target);
        }
    });

    

})();