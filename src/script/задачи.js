// Напишите функцию, которая выводит "Привет!" в консоль через 1 секунду с использованием setTimeout.

// setTimeout(()=>{
//   console.log(('Hello'));

// }, 2000)

// Напишите функцию, которая выводит числа от 1 до 10 в консоль каждую секунду с использованием setInterval.

// let count = 0;
// const counter = setInterval(()=> {
//   count++
//   console.log('счетчик', count);
//   if(count === 10){
//     clearInterval(counter);
//     console.log('End');
//   }
//   }, 1000)

// Напишите функцию, которая меняет цвет заданного элемента через 2 секунды с использованием setTimeout.

// const headerTextNode = document.querySelector(".header__text")

// setTimeout(()=> {
//   headerTextNode.style.color = 'green'
// }, 2000)

// Напишите функцию, которая каждую секунду убирает последний элемент из массива с использованием setInterval.

// let arr = [1, 2, 3]

// const counter = setInterval(() => {
// let newArr = arr.pop()
// console.log(newArr);
//   if(arr.length === 0){
//       clearInterval(counter)
//     }
//   }, 2000);

// 5.Напишите функцию, которая каждую секунду уменьшает значение переменной на 1 и выводит его в консоль с использованием setInterval. Функция должна остановиться, когда значение переменной достигнет 0.

// let count = 10;
// const counter = setInterval(() => {
//   count--;
//   console.log(count);
//   if (count === 0) {
//     clearInterval(counter);
//   }
//   }, 1000);

// Напишите функцию, которая каждые 2 секунды добавляет случайное число в конец массива с использованием setInterval и случайной генерации числа.

// let count = 0;
// const counter = setInterval(() => {
//   count++;
//   console.log(Math.random(), count);
//   if (count === 5) {
//     clearInterval(counter);
//   }
// }, 2000);