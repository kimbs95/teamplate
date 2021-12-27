//===================함수 전역,변수 정의부 ==========================
const friends =[
    {
        name:'홍길동1',
        number:010-1234-5678
    },

    {
        name:'홍길동2',
        number:010-1234-5678
    }
];


// 수정하는부분 input 으로 변경  부분

function $modify(target){

    // 이모티콘 변경
    target.classList.replace('lnr-undo','lnr-checkmark-circle');

    // 텍스트 복사
    const $modifys = document.querySelector('.modify');
    const $textspan = target.parentElement.parentElement.previousElementSibling.firstElementChild;
    const $change = $textspan.parentElement;

    console.log($textspan);
    // input 생성
    const $input = document.createElement('input');
    $input.setAttribute('type','text');
    $input.setAttribute('value', $textspan.textContent);
    // $input.value=$textspan.textContent;
    
    $change.replaceChild($input,$textspan);
    // console.log($change);

}

// 수정 완료 하면서 데이터 저장
function $check(target){

    // 이모티콘 변경
    target.classList.replace('lnr-checkmark-circle','lnr-undo');

    // 검색란 취득
    const $input = target.parentElement.parentElement.previousElementSibling.firstElementChild;

    //span 연결 
    const $textspan= document.createElement('span');
    $textspan.classList.add('.text');
    $textspan.textContent=$input.value;
    console.log($textspan.textContent);

    const $change = $input.parentElement;
    $change.replaceChild($textspan,$input);
    // console.log($change);

    //데이터 변경
    const $datas = $textspan.parentElement.parentElement.dataset.id
    const $indexnumber =index(+$datas);
    friends[$indexnumber].text =$textspan.textContent;
}

// 렌더링 삭제 데이터 삭제
function $dele(target){
    const listLi =target.parentElement.parentElement.parentElement; 
    const listUl =document.querySelector('.list');
    listUl.removeChild(listLi);

    // 데이터 삭제
    const bye = index(+listLi.dataset.id);
    friends.splice(bye,1)

}


function index(number){
    for(let i=0; i<friends.length; i ++){
        if(number===friends[i].id){
            return i ;
        }else {
            return 1 ;
        }
    }
}









// ==========================메인 실행부================================
(function(){

const $ulList = document.querySelector('.list');
$ulList.addEventListener('click',function(e){
    if(e.target.matches('div.modify .lnr-undo')){
        $modify(e.target);
    }else if (e.target.matches('div.modify .lnr-checkmark-circle')){
        $check(e.target);
        // console.log($check);
    }else if (e.target.matches('div.remove .lnr-cross-circle')){
        $dele(e.target);
    }
})





})();