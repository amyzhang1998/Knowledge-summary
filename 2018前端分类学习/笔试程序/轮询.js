function f() {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, 6000);
	});
}

function onClick() {
	var err = false;
	var fnNum = 0;
	var errTimer = setTimeout(() => {
		err = true;
		alert('失败');
	}, 5000);
	var fn = () => {
		const fTime = Date.now();
		f()
			.then(() => {
				if (!err) {
					clearTimeout(errTimer);
					alert('成功');
				}
			})
			.catch(() => {
				if (err) {
					return;
				}
				fnNum++;
				if (fnNum >= 10) {
					clearTimeout(errTimer);
					alert('失败');
					return;
				}
				let waitTime = 300 - (Date.now() - fTime);
				if (waitTime < 0) {
					waitTime = 0;
				}
				setTimeout(fn, waitTime);
			});
	};
	fn();
}
