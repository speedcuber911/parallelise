(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Parallelise an array of tasks, when each one of them is complete, doSomething();

const spawnWorker = Fx => {
  const workE = new Worker("./worker.js");
  workE.postMessage({ funcStr: Fx.toString() });
  return new Promise(resolve => {
    workE.onmessage = ({ data }) => {
      resolve(data);
      workE.terminate();
    };
  });
};

const performParallelWork = () => {
  console.time("parallel");
  const workStatuses = [...new Array(5)]
    .map(createSpecificWork)
    .map(spawnWorker);
  Promise.all(workStatuses).then(workStatus => {
    console.log(workStatus);
    console.timeEnd("parallel");
  });
};

const performSequentialWork = () => {
  console.time("sequential");
  const workStatuses = [...new Array(5)]
    .map(createSpecificWork)
    .map(Fx => Fx());
  console.log(workStatuses);
  console.timeEnd("sequential");
};

const createSpecificWork = _ =>
  function() {
    return [...new Array(10 ** 6)]
      .map((el, i) => i)
      .reduce((acc, el) => acc + el);
  };

document
  .getElementById("Perform")
  .addEventListener("click", performSequentialWork);

document
  .getElementById("Perform2")
  .addEventListener("click", performParallelWork);

// document.getElementById("Perform").addEventListener("click", () => {
//   const parallel$ = of([...new Array(5)].map(createRandomWork)).pipe(
//     mergeMap(x => ajax(x))
//   );
//   parallel$.subscribe(x => console.console.log(x));
//   // arrP.map(observable$ => observable$.subscribe(x => console.log(x)));
// });
//
// const makeid = () => {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//   return characters.charAt(Math.floor(Math.random() * characters.length));
// };
//
// const createRandomWork = () =>
//   `https://api.github.com/search/users?q=${makeid(2)}`;

},{}]},{},[1]);
