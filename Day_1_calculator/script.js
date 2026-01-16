// clear the input field (C)
function Clear() {
   var inp = document.getElementById('res');
   inp.value = '';
}

// delete functionality (backspace)
function Back() {
   var ev = document.getElementById('res');
   ev.value = ev.value.slice(0, -1); // remove last character from string 
}


// it will add the btn value to main res
function Solve(val) {
   var v = document.getElementById('res');
   v.value += val;
}

// final output 
function Result() {
   var num1 = document.getElementById('res').value;
   try {
        // eval (eval() executes a string as JavaScript code.)
      var num2 = eval(num1.replace('x', '*'));
      document.getElementById('res').value = num2;``
   } catch {
      document.getElementById('res').value = 'Error';
   }
}


// Keyboard input support
document.addEventListener('keydown', function (event) {

   event.preventDefault(); 
   
   console.log("event----->", event)
   const key = event.key;
   console.log("key ----> ",key); 
   const validKeys = '0123456789+-*/.%';
   if (validKeys.includes(key)) {
      Solve(key === '*' ? 'x' : key);
   } else if (key === 'Enter') {
      Result();
   } else if (key === 'Backspace') {
      Back();
   } else if (key.toLowerCase() === 'c') {
      Clear();
   }
});