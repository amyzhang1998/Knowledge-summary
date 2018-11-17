async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
async function async2() {
	console.log('async2');
}
console.log('script start');
setTimeout(function() {
	console.log('settimeout');
}, 0);

async1();
new Promise(function(resolve) {
	console.log('promise1');
	resolve();
}).then(function() {
	console.log('promise2');
});
console.log('script end');

// script start

// async1 start

// async2

// promise1

// script end

// promise2
// async1 end

// settimeout



// 原理代码

async function fn(args) {
    // ...
    }
    // 等同于
    function fn(args) {
    return spawn(function* () {
    // ...
    });
    
function spawn(genF) {
    return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
    let next;
    try {
    next = nextF();
    } catch(e) {
    return reject(e);
    }
    if(next.done) {
    return resolve(next.value);
    }
    Promise.resolve(next.value).then(function(v) {
    step(function() { return gen.next(v); });
    }, function(e) {
    step(function() { return gen.throw(e); });
    });
    }
    step(function() { return gen.next(undefined); });
    });
    }
