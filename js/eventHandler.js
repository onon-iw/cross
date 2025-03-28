import { checkComplete } from "./config.js";

let interval = null;
let timeout = null;
const inputs = document.querySelectorAll('input');

export function handleClick() {
    inputs.forEach((el, index) => {
        el.style.zIndex = index * 10;
    });

    let siblings = document.querySelectorAll(`input[name="${this.name}"]`);
    
    if (interval) {
        clearInterval(interval);
        interval = null;
    }

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    inputs.forEach(el => {
        el.style.border = '1px solid #ccc';
        el.style.boxShadow = "none";
    });

    siblings.forEach(el => {
        el.style.zIndex = '999';
        if (el.classList.contains('finish')) {
            el.className = 'focus finish';
        } else {
            el.className = 'focus';
            el.removeAttribute('readonly');    
        }
        el.style.transition = 'border 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease';
    });

    // 깜빡임 효과 적용
    let isBorder = false;
    interval = setInterval(() => {
        siblings.forEach(el => {
            if (isBorder) {
                el.style.border = '2px solid #ff69b4';
                el.style.boxShadow = "0 0 8px 3px rgba(255, 105, 180, 0.8)";
            } else {
                el.style.border = '1px solid #ccc';
                el.style.boxShadow = "none";
            }
        });
        isBorder = !isBorder;
    }, 400);

    // 3초 후에 효과 제거
    timeout = setTimeout(() => {
        clearInterval(interval);
        siblings.forEach(el => {
            el.style.border = '1px solid #ccc';
            el.style.boxShadow = "none";
        }); 
    }, 4000);
}

export function resetQuiz() {
    Object.keys(checkComplete).forEach(key => {
        checkComplete[key] = false;
        inputs.forEach(item => {
            item.classList.remove('finish');
            item.value = '';
            item.style.color = '#000';
        })
    })
}