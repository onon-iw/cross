export function syncInputs(input1Name, input1Index, input2Name, input2Index) {
    const input1 = document.querySelectorAll(`input[name=${input1Name}]`)[input1Index];
    const input2 = document.querySelectorAll(`input[name=${input2Name}]`)[input2Index];

    input1.addEventListener("input", function () {
        input2.value = input1.value;
    });

    input2.addEventListener("input", function () {
        input1.value = input2.value;
    });
}
