// ╔═══════════════════════════════════════╗
// ║  DESIGN & CODE BY: jaotannyja        ║
// ║  ~ Protected & Locked ~             ║
// ╚═══════════════════════════════════════╝

// Obfuscated Credit Protection
const _0x4a6c = ['querySelector', 'appendChild', 'style', 'position', 'fixed', 'bottom', '10px', 'right', '15px', 'fontSize', '11px', 'color', 'rgba(0,0,0,0.4)', 'fontFamily', 'Courier New', 'padding', '5px 10px', 'borderRadius', '4px', 'backgroundColor', 'rgba(255,255,255,0.6)', 'border', '1px solid rgba(0,0,0,0.1)', 'cursor', 'default', 'userSelect', 'none', 'textContent', 'Design by jaotannyja'];
(function() {
    const _0x2d3a = function() {
        const _0x5e1f = document[_0x4a6c[0]]('body');
        if (_0x5e1f) {
            const _0x1b2c = document.createElement('div');
            _0x1b2c[_0x4a6c[1]] = Object.freeze({});
            Object.defineProperty(_0x1b2c, 'innerHTML', {get: () => '', set: () => {}});
            Object.defineProperty(_0x1b2c, 'textContent', {value: _0x4a6c[29], writable: false});
            const _0x3e4f = _0x1b2c[_0x4a6c[15]];
            _0x3e4f[_0x4a6c[3]] = _0x4a6c[4];
            _0x3e4f[_0x4a6c[4]] = _0x4a6c[5];
            _0x3e4f[_0x4a6c[5]] = _0x4a6c[6];
            _0x3e4f[_0x4a6c[6]] = _0x4a6c[7];
            _0x3e4f[_0x4a6c[7]] = _0x4a6c[8];
            _0x3e4f[_0x4a6c[8]] = _0x4a6c[9];
            _0x3e4f[_0x4a6c[9]] = _0x4a6c[10];
            _0x3e4f[_0x4a6c[10]] = _0x4a6c[11];
            _0x3e4f[_0x4a6c[11]] = _0x4a6c[12];
            _0x3e4f[_0x4a6c[12]] = _0x4a6c[13];
            _0x3e4f[_0x4a6c[13]] = _0x4a6c[14];
            _0x3e4f[_0x4a6c[14]] = _0x4a6c[15];
            _0x3e4f[_0x4a6c[16]] = _0x4a6c[16];
            _0x3e4f[_0x4a6c[17]] = _0x4a6c[17];
            _0x3e4f[_0x4a6c[18]] = _0x4a6c[18];
            _0x3e4f[_0x4a6c[19]] = _0x4a6c[19];
            _0x3e4f[_0x4a6c[20]] = _0x4a6c[20];
            _0x3e4f[_0x4a6c[21]] = _0x4a6c[21];
            _0x3e4f[_0x4a6c[22]] = _0x4a6c[22];
            _0x5e1f[_0x4a6c[1]](_0x1b2c);
            Object.freeze(_0x1b2c);
        }
    };
    _0x2d3a();
})();

class Calculator {
    constructor() {
        this.screen = document.getElementById('screen');
        this.expression = document.getElementById('expression');
        this.historyList = document.getElementById('history-list');
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.history = [];
        
        this.attachEventListeners();
        this.loadHistoryFromStorage();
    }
    
    attachEventListeners() {
        const buttons = document.querySelectorAll('.calc-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button));
        });
    }
    
    handleButtonClick(button) {
        const text = button.textContent.trim();
        
        // Handle number input
        if (text.match(/[0-9]/)) {
            this.inputNumber(text);
        }
        // Handle operations
        else if (text === '÷') {
            this.setOperation('÷', '/');
        }
        else if (text === '×') {
            this.setOperation('×', '*');
        }
        else if (text === '−') {
            this.setOperation('−', '-');
        }
        else if (text === '+') {
            this.setOperation('+', '+');
        }
        // Handle equals
        else if (text === '=') {
            this.calculate();
        }
        // Handle clear
        else if (text === 'C') {
            this.clear();
        }
        // Handle backspace
        else if (text === '←') {
            this.backspace();
        }
        // Handle decimal
        else if (text === '.') {
            this.inputDecimal();
        }
    }
    
    inputNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentValue = num;
            this.shouldResetDisplay = false;
        } else {
            if (this.currentValue === '0') {
                this.currentValue = num;
            } else {
                this.currentValue += num;
            }
        }
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.currentValue = '0.';
            this.shouldResetDisplay = false;
        } else {
            if (!this.currentValue.includes('.')) {
                this.currentValue += '.';
            }
        }
        this.updateDisplay();
    }
    
    setOperation(displayOp, actualOp) {
        if (this.currentValue === '') return;
        
        if (this.previousValue !== '') {
            this.calculate();
        }
        
        this.operation = actualOp;
        this.displayOp = displayOp;
        this.previousValue = this.currentValue;
        this.shouldResetDisplay = true;
        this.updateExpression();
    }
    
    calculate() {
        if (!this.operation || this.previousValue === '') return;
        
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        const displayOp = this.displayOp || this.operation;
        
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 0;
                break;
            default:
                return;
        }
        
        // Add to history
        const historyItem = `${this.previousValue} ${displayOp} ${this.currentValue} = ${result}`;
        this.addToHistory(historyItem);
        
        this.currentValue = result.toString();
        this.operation = null;
        this.displayOp = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.expression.textContent = '';
    }
    
    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.displayOp = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
        this.expression.textContent = '';
    }
    
    backspace() {
        if (this.shouldResetDisplay) return;
        
        if (this.currentValue.length === 1) {
            this.currentValue = '0';
        } else {
            this.currentValue = this.currentValue.slice(0, -1);
        }
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.screen.textContent = this.currentValue;
    }
    
    updateExpression() {
        const displayOp = this.displayOp || this.operation;
        if (this.operation) {
            this.expression.textContent = `${this.previousValue} ${displayOp}`;
        }
    }
    
    addToHistory(item) {
        this.history.unshift(item);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.saveHistoryToStorage();
        this.renderHistory();
    }
    
    renderHistory() {
        this.historyList.innerHTML = '';
        this.history.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            li.className = 'history-item';
            li.addEventListener('click', () => this.restoreFromHistory(item));
            this.historyList.appendChild(li);
        });
    }
    
    restoreFromHistory(item) {
        const result = item.split('=')[1].trim();
        this.currentValue = result;
        this.updateDisplay();
    }
    
    saveHistoryToStorage() {
        localStorage.setItem('calcHistory', JSON.stringify(this.history));
    }
    
    loadHistoryFromStorage() {
        const stored = localStorage.getItem('calcHistory');
        if (stored) {
            this.history = JSON.parse(stored);
            this.renderHistory();
        }
    }
}

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
