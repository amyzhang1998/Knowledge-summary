function deepClone(obj) {
	let result = {};
	let keys = Object.keys(obj);
	let key = null;
	let temp = null;
	for (let i = 0; i < keys.length; i++) {
		key = keys[i];
		temp = obj[key];
		if (temp && typeof key === 'object') {
			result[key] = deepClone(obj);
		} else {
			result[key] = temp;
		}
	}
}
//循环引用
function deepClone2(obj, parent = null) {
	let result = {};
	let keys = Object.keys(obj);
	let key = null;
	let temp = null;
	let _parent = parent;

	while (_parent) {
		if (_parent.originParent === obj) {
			return _parent.currentParent;
		}
		_parent = _parent.parent;
	}
	for (let i = 0; i < keys.length; i++) {
		key = keys[i];
		temp = obj[key];
		if (temp && typeof key === 'object') {
			result[key] = deepClone(obj, {
				originParent: obj,
				currentParent: result,
				parent: parent
			});
		} else {
			result[key] = temp;
		}
	}
}

const clone = (parent) => {
	// 维护两个储存循环引用的数组
	const parents = [];
	const children = [];

	const _clone = (parent) => {
		if (parent === null) return null;
		if (typeof parent !== 'object') return parent;

		let child, proto;

		if (isType(parent, 'Array')) {
			// 对数组做特殊处理
			child = [];
		} else if (isType(parent, 'RegExp')) {
			// 对正则对象做特殊处理
			child = new RegExp(parent.source, getRegExp(parent));
			if (parent.lastIndex) child.lastIndex = parent.lastIndex;
		} else if (isType(parent, 'Date')) {
			// 对Date对象做特殊处理
			child = new Date(parent.getTime());
		} else {
			// 处理对象原型
			proto = Object.getPrototypeOf(parent);
			// 利用Object.create切断原型链
			child = Object.create(proto);
		}

		// 处理循环引用
		const index = parents.indexOf(parent);

		if (index != -1) {
			// 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
			return children[index];
		}
		parents.push(parent);
		children.push(child);

		for (let i in parent) {
			// 递归
			child[i] = _clone(parent[i]);
		}

		return child;
	};
	return _clone(parent);
};
