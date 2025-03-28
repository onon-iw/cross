import { syncInputs } from "./sync.js";
import { answer, checkComplete, sync } from './config.js';
import { handleClick } from './eventHandler.js';

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll('input');
   
    sync.forEach(item => {
        syncInputs(item.input1, item.index1, item.input2, item.index2);
    });


    // 모든 input 요소에 클릭 이벤트 추가
    inputs.forEach(input => {
        // 클릭 이벤트
        input.addEventListener('click', handleClick);
        // 글자수 제한 이벤트
        input.addEventListener('input', () => {
            if(input.value.length > 1) {
                input.value = input.value.slice(0,1);
            }
        })
        // 백스페이스 이벤트
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 1) {
                input.value = "";
                e.preventDefault();
            } else if (e.key === 'Enter') {
                const quiz = document.querySelectorAll(`input[name=${input.name}]`);
                const confirm = [...quiz].map(input => input.value).join('');
        
                if (answer[input.name.replace('quiz', '')] === confirm) {
                    checkComplete[input.name.replace('quiz', '')] = true;
                    quiz.forEach(item => {
                        item.readOnly = true
                        item.style.color = '#1c4cd1';
                        item.className = 'finish';
                    });
        
                    sync.forEach(item => {
                        let syncInput;
                        if (item.input1 === input.name) {
                            syncInput = document.querySelectorAll(`input[name=${item.input2}]`)[item.index2];
                        } else if (item.input2 === input.name) {
                            syncInput = document.querySelectorAll(`input[name=${item.input1}]`)[item.index1];
                        }
        
                        if (syncInput) {
                            syncInput.className = 'finish';
                            syncInput.style.color = '#1c4cd1';
                            syncInput.readOnly = true;
                            if (syncInput.value.length > 1) {
                                syncInput.value = syncInput.value.slice(0, 1);
                            }
                        }
                    });
                    if(Object.values(checkComplete).every(value => value === true)) {
                        document.querySelector('.mask').style.display = 'block';
                    }
                } else {
                    const quiz = document.querySelectorAll(`input[name=${input.name}]`);
                    
                    quiz.forEach(item => {
                        item.style.color = '#f00';
                    });

                    setTimeout(() => {
                        quiz.forEach(item => {
                            if(!item.classList.contains('finish')){
                                item.style.color = '#000';
                                item.value = '';
                            } else {
                                item.style.color = '#1c4cd1';
                            }
                        })
                    },300)
                }
            }
        });
        
    });
    
    // 완료
    const complete = document.querySelector('.confirm');
    const reset = document.querySelector('.reset');
    complete.addEventListener('click', function() {
        document.querySelector('.mask').style.display = 'none';
    })
    reset.addEventListener('click', function() {
        resetQuiz();
        document.querySelector('.mask').style.display = 'none';
    })
    // scale.js
    if (typeof viewScaler !== "undefined" && viewScaler.setScale) {
        viewScaler.setScale();
       window.addEventListener("resize", viewScaler.setScale); 
    }

    function resetQuiz() {
        Object.keys(checkComplete).forEach(key => {
            checkComplete[key] = false;
            inputs.forEach(item => {
                item.classList.remove('finish');
                item.value = '';
                item.style.color = '#000';
            })
        })
    }
});
