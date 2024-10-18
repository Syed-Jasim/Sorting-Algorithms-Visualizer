const visualizer = document.getElementById('visualizer');
const conditionDisplay = document.getElementById('condition');
const nextBtn = document.getElementById('nextBtn');

let dataArray = [];
let steps = [];
let stepIndex = 0;

document.getElementById('generateBtn').addEventListener('click', () => {
    const input = document.getElementById('dataInput').value;
    const algorithm = document.getElementById('algorithmSelect').value;

    if (!algorithm) {
        alert('Please select a sorting algorithm!');
        return;
    }

    dataArray = input.split(',').map(Number);
    steps = [];
    stepIndex = 0;

    visualizeData(dataArray);

    switch (algorithm) {
        case 'bubble':
            bubbleSort([...dataArray]);
            break;
        case 'insertion':
            insertionSort([...dataArray]);
            break;
        case 'selection':
            selectionSort([...dataArray]);
            break;
        default:
            alert('Invalid algorithm selection!');
    }

    conditionDisplay.innerText = 'Click "Next" to proceed with sorting';
    nextBtn.disabled = false;
});

nextBtn.addEventListener('click', () => {
    if (stepIndex < steps.length) {
        visualizeData(steps[stepIndex].array, steps[stepIndex].highlight);
        conditionDisplay.innerText = steps[stepIndex].condition;
        stepIndex++;
    } else {
        conditionDisplay.innerText = 'Sorting complete!';
        nextBtn.disabled = true;
    }
});

// Function to visualize data
function visualizeData(array, highlight = []) {
    visualizer.innerHTML = ''; 
    array.forEach((value, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerText = value;
        if (highlight.includes(index)) {
            box.classList.add('highlight');
        }
        visualizer.appendChild(box);
    });
}

// Bubble Sort Function
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let condition = `Comparing ${arr[j]} and ${arr[j + 1]}`;
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
                condition += ` → Swapping ${arr[j]} and ${arr[j + 1]}`;
            }
            steps.push({ array: [...arr], highlight: [j, j + 1], condition });
        }
    }
}

// Insertion Sort Function
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        let condition = `Inserting ${key}`;
        
        // Highlight the key being inserted
        steps.push({ array: [...arr], highlight: [i], condition });
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            steps.push({ array: [...arr], highlight: [j + 1, j], condition: `Moving ${arr[j]} to position ${j + 1}` });
            j = j - 1;
        }
        arr[j + 1] = key;
        steps.push({ array: [...arr], highlight: [j + 1], condition: `Inserted ${key} at position ${j + 1}` });
    }
}

// Selection Sort Function
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            let condition = `Finding minimum from ${arr.slice(i).join(', ')}`;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
            steps.push({ array: [...arr], highlight: [i, minIdx], condition });
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap
            let condition = `Swapping ${arr[i]} and ${arr[minIdx]}`;
            steps.push({ array: [...arr], highlight: [i, minIdx], condition });
        }
    }
}
