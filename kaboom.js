var Pn = Object.defineProperty;
var fi = (s, t, c) =>
	t in s
		? Pn(s, t, { enumerable: !0, configurable: !0, writable: !0, value: c })
		: (s[t] = c);
var o = (s, t) => Pn(s, "name", { value: t, configurable: !0 });
var mi = (s, t) => {
	for (var c in t) Pn(s, c, { get: t[c], enumerable: !0 });
};
var Ee = (s, t, c) => (fi(s, typeof t != "symbol" ? t + "" : t, c), c);
var pi = (() => {
	for (var s = new Uint8Array(128), t = 0; t < 64; t++)
		s[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
	return (c) => {
		for (
			var g = c.length,
				E = new Uint8Array(
					(((g - (c[g - 1] == "=") - (c[g - 2] == "=")) * 3) / 4) | 0
				),
				M = 0,
				z = 0;
			M < g;

		) {
			var I = s[c.charCodeAt(M++)],
				k = s[c.charCodeAt(M++)],
				Z = s[c.charCodeAt(M++)],
				ce = s[c.charCodeAt(M++)];
			(E[z++] = (I << 2) | (k >> 4)),
				(E[z++] = (k << 4) | (Z >> 2)),
				(E[z++] = (Z << 6) | ce);
		}
		return E;
	};
})();
function Re(s) {
	return (s * Math.PI) / 180;
}
o(Re, "deg2rad");
function st(s) {
	return (s * 180) / Math.PI;
}
o(st, "rad2deg");
function Ne(s, t, c) {
	return t > c ? Ne(s, c, t) : Math.min(Math.max(s, t), c);
}
o(Ne, "clamp");
function Me(s, t, c) {
	if (typeof s == "number" && typeof t == "number") return s + (t - s) * c;
	if (s instanceof v && t instanceof v) return s.lerp(t, c);
	if (s instanceof L && t instanceof L) return s.lerp(t, c);
	throw new Error(
		`Bad value for lerp(): ${s}, ${t}. Only number, Vec2 and Color is supported.`
	);
}
o(Me, "lerp");
function $t(s, t, c, g, E) {
	return g + ((s - t) / (c - t)) * (E - g);
}
o($t, "map");
function fr(s, t, c, g, E) {
	return Ne($t(s, t, c, g, E), g, E);
}
o(fr, "mapc");
var be = class {
		x = 0;
		y = 0;
		constructor(t = 0, c = t) {
			(this.x = t), (this.y = c);
		}
		static fromAngle(t) {
			let c = Re(t);
			return new be(Math.cos(c), Math.sin(c));
		}
		clone() {
			return new be(this.x, this.y);
		}
		add(...t) {
			let c = S(...t);
			return new be(this.x + c.x, this.y + c.y);
		}
		sub(...t) {
			let c = S(...t);
			return new be(this.x - c.x, this.y - c.y);
		}
		scale(...t) {
			let c = S(...t);
			return new be(this.x * c.x, this.y * c.y);
		}
		dist(...t) {
			let c = S(...t);
			return this.sub(c).len();
		}
		sdist(...t) {
			let c = S(...t);
			return this.sub(c).slen();
		}
		len() {
			return Math.sqrt(this.dot(this));
		}
		slen() {
			return this.dot(this);
		}
		unit() {
			let t = this.len();
			return t === 0 ? new be(0) : this.scale(1 / t);
		}
		normal() {
			return new be(this.y, -this.x);
		}
		reflect(t) {
			return this.sub(t.scale(2 * this.dot(t)));
		}
		project(t) {
			return t.scale(t.dot(this) / t.len());
		}
		reject(t) {
			return this.sub(this.project(t));
		}
		dot(t) {
			return this.x * t.x + this.y * t.y;
		}
		cross(t) {
			return this.x * t.y - this.y * t.x;
		}
		angle(...t) {
			let c = S(...t);
			return st(Math.atan2(this.y - c.y, this.x - c.x));
		}
		angleBetween(...t) {
			let c = S(...t);
			return st(Math.atan2(this.cross(c), this.dot(c)));
		}
		lerp(t, c) {
			return new be(Me(this.x, t.x, c), Me(this.y, t.y, c));
		}
		slerp(t, c) {
			let g = this.dot(t),
				E = this.cross(t),
				M = Math.atan2(E, g);
			return this.scale(Math.sin((1 - c) * M))
				.add(t.scale(Math.sin(c * M)))
				.scale(1 / E);
		}
		isZero() {
			return this.x === 0 && this.y === 0;
		}
		toFixed(t) {
			return new be(Number(this.x.toFixed(t)), Number(this.y.toFixed(t)));
		}
		transform(t) {
			return t.multVec2(this);
		}
		eq(t) {
			return this.x === t.x && this.y === t.y;
		}
		bbox() {
			return new ne(this, 0, 0);
		}
		toString() {
			return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
		}
	},
	v = be;
o(v, "Vec2"),
	Ee(v, "LEFT", new be(-1, 0)),
	Ee(v, "RIGHT", new be(1, 0)),
	Ee(v, "UP", new be(0, -1)),
	Ee(v, "DOWN", new be(0, 1));
function S(...s) {
	if (s.length === 1) {
		if (s[0] instanceof v) return new v(s[0].x, s[0].y);
		if (Array.isArray(s[0]) && s[0].length === 2) return new v(...s[0]);
	}
	return new v(...s);
}
o(S, "vec2");
var ae = class {
		r = 255;
		g = 255;
		b = 255;
		constructor(t, c, g) {
			(this.r = Ne(t, 0, 255)),
				(this.g = Ne(c, 0, 255)),
				(this.b = Ne(g, 0, 255));
		}
		static fromArray(t) {
			return new ae(t[0], t[1], t[2]);
		}
		static fromHex(t) {
			if (typeof t == "number")
				return new ae((t >> 16) & 255, (t >> 8) & 255, (t >> 0) & 255);
			if (typeof t == "string") {
				let c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
				return new ae(
					parseInt(c[1], 16),
					parseInt(c[2], 16),
					parseInt(c[3], 16)
				);
			} else throw new Error("Invalid hex color format");
		}
		static fromHSL(t, c, g) {
			if (c == 0) return new ae(255 * g, 255 * g, 255 * g);
			let E = o(
					(ce, U, X) => (
						X < 0 && (X += 1),
						X > 1 && (X -= 1),
						X < 1 / 6
							? ce + (U - ce) * 6 * X
							: X < 1 / 2
							? U
							: X < 2 / 3
							? ce + (U - ce) * (2 / 3 - X) * 6
							: ce
					),
					"hue2rgb"
				),
				M = g < 0.5 ? g * (1 + c) : g + c - g * c,
				z = 2 * g - M,
				I = E(z, M, t + 1 / 3),
				k = E(z, M, t),
				Z = E(z, M, t - 1 / 3);
			return new ae(
				Math.round(I * 255),
				Math.round(k * 255),
				Math.round(Z * 255)
			);
		}
		clone() {
			return new ae(this.r, this.g, this.b);
		}
		lighten(t) {
			return new ae(this.r + t, this.g + t, this.b + t);
		}
		darken(t) {
			return this.lighten(-t);
		}
		invert() {
			return new ae(255 - this.r, 255 - this.g, 255 - this.b);
		}
		mult(t) {
			return new ae(
				(this.r * t.r) / 255,
				(this.g * t.g) / 255,
				(this.b * t.b) / 255
			);
		}
		lerp(t, c) {
			return new ae(
				Me(this.r, t.r, c),
				Me(this.g, t.g, c),
				Me(this.b, t.b, c)
			);
		}
		eq(t) {
			return this.r === t.r && this.g === t.g && this.b === t.b;
		}
		toString() {
			return `rgb(${this.r}, ${this.g}, ${this.b})`;
		}
		toHex() {
			return (
				"#" +
				((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
					.toString(16)
					.slice(1)
			);
		}
	},
	L = ae;
o(L, "Color"),
	Ee(L, "RED", new ae(255, 0, 0)),
	Ee(L, "GREEN", new ae(0, 255, 0)),
	Ee(L, "BLUE", new ae(0, 0, 255)),
	Ee(L, "YELLOW", new ae(255, 255, 0)),
	Ee(L, "MAGENTA", new ae(255, 0, 255)),
	Ee(L, "CYAN", new ae(0, 255, 255)),
	Ee(L, "WHITE", new ae(255, 255, 255)),
	Ee(L, "BLACK", new ae(0, 0, 0));
function W(...s) {
	if (s.length === 0) return new L(255, 255, 255);
	if (s.length === 1) {
		if (s[0] instanceof L) return s[0].clone();
		if (typeof s[0] == "string") return L.fromHex(s[0]);
		if (Array.isArray(s[0]) && s[0].length === 3) return L.fromArray(s[0]);
	}
	return new L(...s);
}
o(W, "rgb");
var mr = o((s, t, c) => L.fromHSL(s, t, c), "hsl2rgb"),
	Q = class {
		x = 0;
		y = 0;
		w = 1;
		h = 1;
		constructor(t, c, g, E) {
			(this.x = t), (this.y = c), (this.w = g), (this.h = E);
		}
		scale(t) {
			return new Q(
				this.x + this.w * t.x,
				this.y + this.h * t.y,
				this.w * t.w,
				this.h * t.h
			);
		}
		pos() {
			return new v(this.x, this.y);
		}
		clone() {
			return new Q(this.x, this.y, this.w, this.h);
		}
		eq(t) {
			return (
				this.x === t.x &&
				this.y === t.y &&
				this.w === t.w &&
				this.h === t.h
			);
		}
		toString() {
			return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
		}
	};
o(Q, "Quad");
function ue(s, t, c, g) {
	return new Q(s, t, c, g);
}
o(ue, "quad");
var J = class {
	m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	constructor(t) {
		t && (this.m = t);
	}
	static translate(t) {
		return new J([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, 0, 1]);
	}
	static scale(t) {
		return new J([t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	}
	static rotateX(t) {
		t = Re(-t);
		let c = Math.cos(t),
			g = Math.sin(t);
		return new J([1, 0, 0, 0, 0, c, -g, 0, 0, g, c, 0, 0, 0, 0, 1]);
	}
	static rotateY(t) {
		t = Re(-t);
		let c = Math.cos(t),
			g = Math.sin(t);
		return new J([c, 0, g, 0, 0, 1, 0, 0, -g, 0, c, 0, 0, 0, 0, 1]);
	}
	static rotateZ(t) {
		t = Re(-t);
		let c = Math.cos(t),
			g = Math.sin(t);
		return new J([c, -g, 0, 0, g, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	}
	translate(t) {
		return (
			(this.m[12] += this.m[0] * t.x + this.m[4] * t.y),
			(this.m[13] += this.m[1] * t.x + this.m[5] * t.y),
			(this.m[14] += this.m[2] * t.x + this.m[6] * t.y),
			(this.m[15] += this.m[3] * t.x + this.m[7] * t.y),
			this
		);
	}
	scale(t) {
		return (
			(this.m[0] *= t.x),
			(this.m[4] *= t.y),
			(this.m[1] *= t.x),
			(this.m[5] *= t.y),
			(this.m[2] *= t.x),
			(this.m[6] *= t.y),
			(this.m[3] *= t.x),
			(this.m[7] *= t.y),
			this
		);
	}
	rotate(t) {
		t = Re(-t);
		let c = Math.cos(t),
			g = Math.sin(t),
			E = this.m[0],
			M = this.m[1],
			z = this.m[4],
			I = this.m[5];
		return (
			(this.m[0] = E * c + M * g),
			(this.m[1] = -E * g + M * c),
			(this.m[4] = z * c + I * g),
			(this.m[5] = -z * g + I * c),
			this
		);
	}
	mult(t) {
		let c = [];
		for (let g = 0; g < 4; g++)
			for (let E = 0; E < 4; E++)
				c[g * 4 + E] =
					this.m[0 * 4 + E] * t.m[g * 4 + 0] +
					this.m[1 * 4 + E] * t.m[g * 4 + 1] +
					this.m[2 * 4 + E] * t.m[g * 4 + 2] +
					this.m[3 * 4 + E] * t.m[g * 4 + 3];
		return new J(c);
	}
	multVec2(t) {
		return new v(
			t.x * this.m[0] + t.y * this.m[4] + this.m[12],
			t.x * this.m[1] + t.y * this.m[5] + this.m[13]
		);
	}
	getTranslation() {
		return new v(this.m[12], this.m[13]);
	}
	getScale() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
				c = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
			return new v(c, t / c);
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			let t = this.m[0] * this.m[5] - this.m[1] * this.m[4],
				c = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
			return new v(t / c, c);
		} else return new v(0, 0);
	}
	getRotation() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
			return st(
				this.m[1] > 0
					? Math.acos(this.m[0] / t)
					: -Math.acos(this.m[0] / t)
			);
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
			return st(
				Math.PI / 2 -
					(this.m[5] > 0
						? Math.acos(-this.m[4] / t)
						: -Math.acos(this.m[4] / t))
			);
		} else return 0;
	}
	getSkew() {
		if (this.m[0] != 0 || this.m[1] != 0) {
			let t = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
			return new v(
				Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) /
					(t * t),
				0
			);
		} else if (this.m[4] != 0 || this.m[5] != 0) {
			let t = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
			return new v(
				0,
				Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) /
					(t * t)
			);
		} else return new v(0, 0);
	}
	invert() {
		let t = [],
			c = this.m[10] * this.m[15] - this.m[14] * this.m[11],
			g = this.m[9] * this.m[15] - this.m[13] * this.m[11],
			E = this.m[9] * this.m[14] - this.m[13] * this.m[10],
			M = this.m[8] * this.m[15] - this.m[12] * this.m[11],
			z = this.m[8] * this.m[14] - this.m[12] * this.m[10],
			I = this.m[8] * this.m[13] - this.m[12] * this.m[9],
			k = this.m[6] * this.m[15] - this.m[14] * this.m[7],
			Z = this.m[5] * this.m[15] - this.m[13] * this.m[7],
			ce = this.m[5] * this.m[14] - this.m[13] * this.m[6],
			U = this.m[4] * this.m[15] - this.m[12] * this.m[7],
			X = this.m[4] * this.m[14] - this.m[12] * this.m[6],
			h = this.m[5] * this.m[15] - this.m[13] * this.m[7],
			K = this.m[4] * this.m[13] - this.m[12] * this.m[5],
			pe = this.m[6] * this.m[11] - this.m[10] * this.m[7],
			Ge = this.m[5] * this.m[11] - this.m[9] * this.m[7],
			w = this.m[5] * this.m[10] - this.m[9] * this.m[6],
			le = this.m[4] * this.m[11] - this.m[8] * this.m[7],
			ge = this.m[4] * this.m[10] - this.m[8] * this.m[6],
			he = this.m[4] * this.m[9] - this.m[8] * this.m[5];
		(t[0] = this.m[5] * c - this.m[6] * g + this.m[7] * E),
			(t[4] = -(this.m[4] * c - this.m[6] * M + this.m[7] * z)),
			(t[8] = this.m[4] * g - this.m[5] * M + this.m[7] * I),
			(t[12] = -(this.m[4] * E - this.m[5] * z + this.m[6] * I)),
			(t[1] = -(this.m[1] * c - this.m[2] * g + this.m[3] * E)),
			(t[5] = this.m[0] * c - this.m[2] * M + this.m[3] * z),
			(t[9] = -(this.m[0] * g - this.m[1] * M + this.m[3] * I)),
			(t[13] = this.m[0] * E - this.m[1] * z + this.m[2] * I),
			(t[2] = this.m[1] * k - this.m[2] * Z + this.m[3] * ce),
			(t[6] = -(this.m[0] * k - this.m[2] * U + this.m[3] * X)),
			(t[10] = this.m[0] * h - this.m[1] * U + this.m[3] * K),
			(t[14] = -(this.m[0] * ce - this.m[1] * X + this.m[2] * K)),
			(t[3] = -(this.m[1] * pe - this.m[2] * Ge + this.m[3] * w)),
			(t[7] = this.m[0] * pe - this.m[2] * le + this.m[3] * ge),
			(t[11] = -(this.m[0] * Ge - this.m[1] * le + this.m[3] * he)),
			(t[15] = this.m[0] * w - this.m[1] * ge + this.m[2] * he);
		let ie =
			this.m[0] * t[0] +
			this.m[1] * t[4] +
			this.m[2] * t[8] +
			this.m[3] * t[12];
		for (let xe = 0; xe < 4; xe++)
			for (let B = 0; B < 4; B++) t[xe * 4 + B] *= 1 / ie;
		return new J(t);
	}
	clone() {
		return new J([...this.m]);
	}
	toString() {
		return this.m.toString();
	}
};
o(J, "Mat4");
function Mn(s, t, c, g = Math.sin) {
	return s + ((g(c) + 1) / 2) * (t - s);
}
o(Mn, "wave");
var gi = 1103515245,
	wi = 12345,
	dr = 2147483648,
	rt = class {
		seed;
		constructor(t) {
			this.seed = t;
		}
		gen() {
			return (this.seed = (gi * this.seed + wi) % dr), this.seed / dr;
		}
		genNumber(t, c) {
			return t + this.gen() * (c - t);
		}
		genVec2(t, c) {
			return new v(this.genNumber(t.x, c.x), this.genNumber(t.y, c.y));
		}
		genColor(t, c) {
			return new L(
				this.genNumber(t.r, c.r),
				this.genNumber(t.g, c.g),
				this.genNumber(t.b, c.b)
			);
		}
		genAny(...t) {
			if (t.length === 0) return this.gen();
			if (t.length === 1) {
				if (typeof t[0] == "number") return this.genNumber(0, t[0]);
				if (t[0] instanceof v) return this.genVec2(S(0, 0), t[0]);
				if (t[0] instanceof L) return this.genColor(W(0, 0, 0), t[0]);
			} else if (t.length === 2) {
				if (typeof t[0] == "number" && typeof t[1] == "number")
					return this.genNumber(t[0], t[1]);
				if (t[0] instanceof v && t[1] instanceof v)
					return this.genVec2(t[0], t[1]);
				if (t[0] instanceof L && t[1] instanceof L)
					return this.genColor(t[0], t[1]);
			}
		}
	};
o(rt, "RNG");
var Rn = new rt(Date.now());
function pr(s) {
	return s != null && (Rn.seed = s), Rn.seed;
}
o(pr, "randSeed");
function xt(...s) {
	return Rn.genAny(...s);
}
o(xt, "rand");
function Dn(...s) {
	return Math.floor(xt(...s));
}
o(Dn, "randi");
function gr(s) {
	return xt() <= s;
}
o(gr, "chance");
function wr(s) {
	return s[Dn(s.length)];
}
o(wr, "choose");
function br(s, t) {
	return (
		s.pos.x + s.width > t.pos.x &&
		s.pos.x < t.pos.x + t.width &&
		s.pos.y + s.height > t.pos.y &&
		s.pos.y < t.pos.y + t.height
	);
}
o(br, "testRectRect");
function bi(s, t) {
	if (
		(s.p1.x === s.p2.x && s.p1.y === s.p2.y) ||
		(t.p1.x === t.p2.x && t.p1.y === t.p2.y)
	)
		return null;
	let c =
		(t.p2.y - t.p1.y) * (s.p2.x - s.p1.x) -
		(t.p2.x - t.p1.x) * (s.p2.y - s.p1.y);
	if (c === 0) return null;
	let g =
			((t.p2.x - t.p1.x) * (s.p1.y - t.p1.y) -
				(t.p2.y - t.p1.y) * (s.p1.x - t.p1.x)) /
			c,
		E =
			((s.p2.x - s.p1.x) * (s.p1.y - t.p1.y) -
				(s.p2.y - s.p1.y) * (s.p1.x - t.p1.x)) /
			c;
	return g < 0 || g > 1 || E < 0 || E > 1 ? null : g;
}
o(bi, "testLineLineT");
function nt(s, t) {
	let c = bi(s, t);
	return c
		? S(s.p1.x + c * (s.p2.x - s.p1.x), s.p1.y + c * (s.p2.y - s.p1.y))
		: null;
}
o(nt, "testLineLine");
function vr(s, t) {
	if (yt(s, t.p1) || yt(s, t.p2)) return !0;
	let c = s.points();
	return (
		!!nt(t, new Se(c[0], c[1])) ||
		!!nt(t, new Se(c[1], c[2])) ||
		!!nt(t, new Se(c[2], c[3])) ||
		!!nt(t, new Se(c[3], c[0]))
	);
}
o(vr, "testRectLine");
function yt(s, t) {
	return (
		t.x > s.pos.x &&
		t.x < s.pos.x + s.width &&
		t.y > s.pos.y &&
		t.y < s.pos.y + s.height
	);
}
o(yt, "testRectPoint");
function yr(s, t) {
	let c = t.sub(s.p1),
		g = s.p2.sub(s.p1);
	if (Math.abs(c.cross(g)) > Number.EPSILON) return !1;
	let E = c.dot(g) / g.dot(g);
	return E >= 0 && E <= 1;
}
o(yr, "testLinePoint");
function Gn(s, t) {
	let c = s.p2.sub(s.p1),
		g = c.dot(c),
		E = s.p1.sub(t.center),
		M = 2 * c.dot(E),
		z = E.dot(E) - t.radius * t.radius,
		I = M * M - 4 * g * z;
	if (g <= Number.EPSILON || I < 0) return !1;
	if (I == 0) {
		let k = -M / (2 * g);
		if (k >= 0 && k <= 1) return !0;
	} else {
		let k = (-M + Math.sqrt(I)) / (2 * g),
			Z = (-M - Math.sqrt(I)) / (2 * g);
		if ((k >= 0 && k <= 1) || (Z >= 0 && Z <= 1)) return !0;
	}
	return xr(t, s.p1);
}
o(Gn, "testLineCircle");
function xr(s, t) {
	return s.center.sdist(t) < s.radius * s.radius;
}
o(xr, "testCirclePoint");
function Ur(s, t) {
	let c = t.pts[t.pts.length - 1];
	for (let g of t.pts) {
		if (Gn(new Se(c, g), s)) return !0;
		c = g;
	}
	return xr(s, t.pts[0]) ? !0 : Fn(t, s.center);
}
o(Ur, "testCirclePolygon");
function Fn(s, t) {
	let c = !1,
		g = s.pts;
	for (let E = 0, M = g.length - 1; E < g.length; M = E++)
		g[E].y > t.y != g[M].y > t.y &&
			t.x <
				((g[M].x - g[E].x) * (t.y - g[E].y)) / (g[M].y - g[E].y) +
					g[E].x &&
			(c = !c);
	return c;
}
o(Fn, "testPolygonPoint");
var Se = class {
	p1;
	p2;
	constructor(t, c) {
		(this.p1 = t.clone()), (this.p2 = c.clone());
	}
	transform(t) {
		return new Se(t.multVec2(this.p1), t.multVec2(this.p2));
	}
	bbox() {
		return ne.fromPoints(this.p1, this.p2);
	}
	area() {
		return this.p1.dist(this.p2);
	}
	clone() {
		return new Se(this.p1, this.p2);
	}
};
o(Se, "Line");
var ne = class {
	pos;
	width;
	height;
	constructor(t, c, g) {
		(this.pos = t.clone()), (this.width = c), (this.height = g);
	}
	static fromPoints(t, c) {
		return new ne(t.clone(), c.x - t.x, c.y - t.y);
	}
	center() {
		return new v(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
	}
	points() {
		return [
			this.pos,
			this.pos.add(this.width, 0),
			this.pos.add(this.width, this.height),
			this.pos.add(0, this.height),
		];
	}
	transform(t) {
		return new Pe(this.points().map((c) => t.multVec2(c)));
	}
	bbox() {
		return this.clone();
	}
	area() {
		return this.width * this.height;
	}
	clone() {
		return new ne(this.pos.clone(), this.width, this.height);
	}
	distToPoint(t) {
		return Math.sqrt(this.sdistToPoint(t));
	}
	sdistToPoint(t) {
		let c = this.pos,
			g = this.pos.add(this.width, this.height),
			E = Math.max(c.x - t.x, 0, t.x - g.x),
			M = Math.max(c.y - t.y, 0, t.y - g.y);
		return E * E + M * M;
	}
};
o(ne, "Rect");
var ke = class {
	center;
	radius;
	constructor(t, c) {
		(this.center = t.clone()), (this.radius = c);
	}
	transform(t) {
		return new Ye(this.center, this.radius, this.radius).transform(t);
	}
	bbox() {
		return ne.fromPoints(
			this.center.sub(S(this.radius)),
			this.center.add(S(this.radius))
		);
	}
	area() {
		return this.radius * this.radius * Math.PI;
	}
	clone() {
		return new ke(this.center, this.radius);
	}
};
o(ke, "Circle");
var Ye = class {
	center;
	radiusX;
	radiusY;
	constructor(t, c, g) {
		(this.center = t.clone()), (this.radiusX = c), (this.radiusY = g);
	}
	transform(t) {
		return new Ye(
			t.multVec2(this.center),
			t.m[0] * this.radiusX,
			t.m[5] * this.radiusY
		);
	}
	bbox() {
		return ne.fromPoints(
			this.center.sub(S(this.radiusX, this.radiusY)),
			this.center.add(S(this.radiusX, this.radiusY))
		);
	}
	area() {
		return this.radiusX * this.radiusY * Math.PI;
	}
	clone() {
		return new Ye(this.center, this.radiusX, this.radiusY);
	}
};
o(Ye, "Ellipse");
var Pe = class {
	pts;
	constructor(t) {
		if (t.length < 3)
			throw new Error("Polygons should have at least 3 vertices");
		this.pts = t;
	}
	transform(t) {
		return new Pe(this.pts.map((c) => t.multVec2(c)));
	}
	bbox() {
		let t = S(Number.MAX_VALUE),
			c = S(-Number.MAX_VALUE);
		for (let g of this.pts)
			(t.x = Math.min(t.x, g.x)),
				(c.x = Math.max(c.x, g.x)),
				(t.y = Math.min(t.y, g.y)),
				(c.y = Math.max(c.y, g.y));
		return ne.fromPoints(t, c);
	}
	area() {
		let t = 0,
			c = this.pts.length;
		for (let g = 0; g < c; g++) {
			let E = this.pts[g],
				M = this.pts[(g + 1) % c];
			(t += E.x * M.y * 0.5), (t -= M.x * E.y * 0.5);
		}
		return Math.abs(t);
	}
	clone() {
		return new Pe(this.pts.map((t) => t.clone()));
	}
};
o(Pe, "Polygon");
function Er(s, t) {
	let c = Number.MAX_VALUE,
		g = S(0);
	for (let E of [s, t])
		for (let M = 0; M < E.pts.length; M++) {
			let z = E.pts[M],
				k = E.pts[(M + 1) % E.pts.length].sub(z).normal().unit(),
				Z = Number.MAX_VALUE,
				ce = -Number.MAX_VALUE;
			for (let K = 0; K < s.pts.length; K++) {
				let pe = s.pts[K].dot(k);
				(Z = Math.min(Z, pe)), (ce = Math.max(ce, pe));
			}
			let U = Number.MAX_VALUE,
				X = -Number.MAX_VALUE;
			for (let K = 0; K < t.pts.length; K++) {
				let pe = t.pts[K].dot(k);
				(U = Math.min(U, pe)), (X = Math.max(X, pe));
			}
			let h = Math.min(ce, X) - Math.max(Z, U);
			if (h < 0) return null;
			if (h < Math.abs(c)) {
				let K = X - Z,
					pe = U - ce;
				(c = Math.abs(K) < Math.abs(pe) ? K : pe), (g = k.scale(c));
			}
		}
	return g;
}
o(Er, "sat");
var it = class extends Map {
	lastID;
	constructor(...t) {
		super(...t), (this.lastID = 0);
	}
	push(t) {
		let c = this.lastID;
		return this.set(c, t), this.lastID++, c;
	}
	pushd(t) {
		let c = this.push(t);
		return () => this.delete(c);
	}
};
o(it, "IDList");
var Ae = class {
	paused = !1;
	cancel;
	constructor(t) {
		this.cancel = t;
	}
	static join(t) {
		let c = new Ae(() => t.forEach((g) => g.cancel()));
		return (
			Object.defineProperty(c, "paused", {
				get: () => t[0].paused,
				set: (g) => t.forEach((E) => (E.paused = g)),
			}),
			(c.paused = !1),
			c
		);
	}
};
o(Ae, "EventController");
var ve = class {
	handlers = new it();
	add(t) {
		let c = this.handlers.pushd((...E) => {
				g.paused || t(...E);
			}),
			g = new Ae(c);
		return g;
	}
	addOnce(t) {
		let c = this.add((...g) => {
			c.cancel(), t(...g);
		});
		return c;
	}
	next() {
		return new Promise((t) => this.addOnce(t));
	}
	trigger(...t) {
		this.handlers.forEach((c) => c(...t));
	}
	numListeners() {
		return this.handlers.size;
	}
};
o(ve, "Event");
var De = class {
	handlers = {};
	on(t, c) {
		return (
			this.handlers[t] || (this.handlers[t] = new ve()),
			this.handlers[t].add(c)
		);
	}
	onOnce(t, c) {
		let g = this.on(t, (...E) => {
			g.cancel(), c(...E);
		});
		return g;
	}
	next(t) {
		return new Promise((c) => {
			this.onOnce(t, (...g) => c(g[0]));
		});
	}
	trigger(t, ...c) {
		this.handlers[t] && this.handlers[t].trigger(...c);
	}
	remove(t) {
		delete this.handlers[t];
	}
	clear() {
		this.handlers = {};
	}
	numListeners(t) {
		return this.handlers[t]?.numListeners() ?? 0;
	}
};
o(De, "EventHandler");
function Bn(s, t) {
	let c = typeof s,
		g = typeof t;
	if (c !== g) return !1;
	if (c === "object" && g === "object" && s !== null && t !== null) {
		let E = Object.keys(s),
			M = Object.keys(t);
		if (E.length !== M.length) return !1;
		for (let z of E) {
			let I = s[z],
				k = t[z];
			if (
				!(typeof I == "function" && typeof k == "function") &&
				!Bn(I, k)
			)
				return !1;
		}
		return !0;
	}
	return s === t;
}
o(Bn, "deepEq");
function vi(s) {
	let t = window.atob(s),
		c = t.length,
		g = new Uint8Array(c);
	for (let E = 0; E < c; E++) g[E] = t.charCodeAt(E);
	return g.buffer;
}
o(vi, "base64ToArrayBuffer");
function Sr(s) {
	return vi(s.split(",")[1]);
}
o(Sr, "dataURLToArrayBuffer");
function zt(s, t) {
	let c = document.createElement("a");
	(c.href = t), (c.download = s), c.click();
}
o(zt, "download");
function Ln(s, t) {
	zt(s, "data:text/plain;charset=utf-8," + t);
}
o(Ln, "downloadText");
function Cr(s, t) {
	Ln(s, JSON.stringify(t));
}
o(Cr, "downloadJSON");
function In(s, t) {
	let c = URL.createObjectURL(t);
	zt(s, c), URL.revokeObjectURL(c);
}
o(In, "downloadBlob");
var Vn = o((s) => s.match(/^data:\w+\/\w+;base64,.+/), "isDataURL"),
	Tr = o((s) => s.split(".").pop(), "getExt"),
	Ar = (() => {
		let s = 0;
		return () => s++;
	})();
var Ut = class {
	_items;
	_compareFn;
	constructor(t = (c, g) => c < g) {
		(this._compareFn = t), (this._items = []);
	}
	insert(t) {
		this._items.push(t), this.moveUp(this._items.length - 1);
	}
	remove() {
		if (this._items.length === 0) return null;
		let t = this._items[0],
			c = this._items.pop();
		return (
			this._items.length !== 0 &&
				((this._items[0] = c), this.moveDown(0)),
			t
		);
	}
	clear() {
		this._items.splice(0, this._items.length);
	}
	moveUp(t) {
		for (; t > 0; ) {
			let c = Math.floor((t - 1) / 2);
			if (
				!this._compareFn(this._items[t], this._items[c]) &&
				this._items[t] >= this._items[c]
			)
				break;
			this.swap(t, c), (t = c);
		}
	}
	moveDown(t) {
		for (; t < Math.floor(this._items.length / 2); ) {
			let c = 2 * t + 1;
			if (
				(c < this._items.length - 1 &&
					!this._compareFn(this._items[c], this._items[c + 1]) &&
					++c,
				this._compareFn(this._items[t], this._items[c]))
			)
				break;
			this.swap(t, c), (t = c);
		}
	}
	swap(t, c) {
		[this._items[t], this._items[c]] = [this._items[c], this._items[t]];
	}
	get length() {
		return this._items.length;
	}
};
o(Ut, "BinaryHeap");
var jn = {
	"Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
		buttons: {
			0: "south",
			1: "east",
			2: "west",
			3: "north",
			4: "lshoulder",
			5: "rshoulder",
			6: "ltrigger",
			7: "rtrigger",
			8: "select",
			9: "start",
			10: "lstick",
			11: "rstick",
			12: "dpad-up",
			13: "dpad-down",
			14: "dpad-left",
			15: "dpad-right",
			16: "home",
			17: "capture",
		},
		sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
	},
	"Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
		buttons: {
			0: "south",
			1: "east",
			2: "west",
			3: "north",
			4: "lshoulder",
			5: "rshoulder",
			9: "select",
			10: "lstick",
			16: "start",
		},
		sticks: { left: { x: 0, y: 1 } },
	},
	"Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
		buttons: {
			0: "south",
			1: "east",
			2: "west",
			3: "north",
			4: "lshoulder",
			5: "rshoulder",
			9: "start",
			10: "lstick",
			16: "select",
		},
		sticks: { left: { x: 0, y: 1 } },
	},
	"Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
		buttons: {
			0: "south",
			1: "east",
			2: "west",
			3: "north",
			4: "lshoulder",
			5: "rshoulder",
			6: "ltrigger",
			7: "rtrigger",
			8: "select",
			9: "start",
			10: "lstick",
			11: "rstick",
			12: "dpad-up",
			13: "dpad-down",
			14: "dpad-left",
			15: "dpad-right",
			16: "home",
			17: "capture",
		},
		sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
	},
	default: {
		buttons: {
			0: "south",
			1: "east",
			2: "west",
			3: "north",
			4: "lshoulder",
			5: "rshoulder",
			6: "ltrigger",
			7: "rtrigger",
			8: "select",
			9: "start",
			10: "lstick",
			11: "rstick",
			12: "dpad-up",
			13: "dpad-down",
			14: "dpad-left",
			15: "dpad-right",
			16: "home",
		},
		sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
	},
};
var Xe = class {
	pressed = new Set([]);
	pressedRepeat = new Set([]);
	released = new Set([]);
	down = new Set([]);
	update() {
		this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
	}
	press(t) {
		this.pressed.add(t), this.pressedRepeat.add(t), this.down.add(t);
	}
	pressRepeat(t) {
		this.pressedRepeat.add(t);
	}
	release(t) {
		this.down.delete(t), this.pressed.delete(t), this.released.add(t);
	}
};
o(Xe, "ButtonState");
var Kt = class {
	buttonState = new Xe();
	stickState = new Map();
};
o(Kt, "GamepadState");
var Yt = class {
	dts = [];
	timer = 0;
	fps = 0;
	tick(t) {
		this.dts.push(t),
			(this.timer += t),
			this.timer >= 1 &&
				((this.timer = 0),
				(this.fps = Math.round(
					1 / (this.dts.reduce((c, g) => c + g) / this.dts.length)
				)),
				(this.dts = []));
	}
};
o(Yt, "FPSCounter");
var Or = o((s) => {
	if (!s.canvas) throw new Error("Please provide a canvas");
	let t = {
		canvas: s.canvas,
		loopID: null,
		stopped: !1,
		dt: 0,
		time: 0,
		realTime: 0,
		fpsCounter: new Yt(),
		timeScale: 1,
		skipTime: !1,
		numFrames: 0,
		paused: !1,
		mousePos: new v(0),
		mouseDeltaPos: new v(0),
		keyState: new Xe(),
		mouseState: new Xe(),
		mergedGamepadState: new Kt(),
		gamepadStates: new Map(),
		gamepads: [],
		charInputted: [],
		isMouseMoved: !1,
		lastWidth: s.canvas.offsetWidth,
		lastHeight: s.canvas.offsetHeight,
		events: new De(),
	};
	function c() {
		return t.canvas;
	}
	o(c, "canvas");
	function g() {
		return t.dt * t.timeScale;
	}
	o(g, "dt");
	function E() {
		return t.time;
	}
	o(E, "time");
	function M() {
		return t.fpsCounter.fps;
	}
	o(M, "fps");
	function z() {
		return t.numFrames;
	}
	o(z, "numFrames");
	function I() {
		return t.canvas.toDataURL();
	}
	o(I, "screenshot");
	function k(d) {
		t.canvas.style.cursor = d;
	}
	o(k, "setCursor");
	function Z() {
		return t.canvas.style.cursor;
	}
	o(Z, "getCursor");
	function ce(d) {
		if (d)
			try {
				let b = t.canvas.requestPointerLock();
				b.catch && b.catch((C) => console.error(C));
			} catch (b) {
				console.error(b);
			}
		else document.exitPointerLock();
	}
	o(ce, "setCursorLocked");
	function U() {
		return !!document.pointerLockElement;
	}
	o(U, "isCursorLocked");
	function X(d) {
		d.requestFullscreen
			? d.requestFullscreen()
			: d.webkitRequestFullscreen && d.webkitRequestFullscreen();
	}
	o(X, "enterFullscreen");
	function h() {
		document.exitFullscreen
			? document.exitFullscreen()
			: document.webkitExitFullScreen && document.webkitExitFullScreen();
	}
	o(h, "exitFullscreen");
	function K() {
		return document.fullscreenElement || document.webkitFullscreenElement;
	}
	o(K, "getFullscreenElement");
	function pe(d = !0) {
		d ? X(t.canvas) : h();
	}
	o(pe, "setFullscreen");
	function Ge() {
		return !!K();
	}
	o(Ge, "isFullscreen");
	function w() {
		t.stopped = !0;
		for (let d in de) t.canvas.removeEventListener(d, de[d]);
		for (let d in Be) document.removeEventListener(d, Be[d]);
		for (let d in fe) window.removeEventListener(d, fe[d]);
		Lt.disconnect();
	}
	o(w, "quit");
	function le(d) {
		t.loopID !== null && cancelAnimationFrame(t.loopID);
		let b = 0,
			C = o((ee) => {
				if (t.stopped) return;
				if (t.paused || document.visibilityState !== "visible") {
					t.loopID = requestAnimationFrame(C);
					return;
				}
				let re = ee / 1e3,
					V = re - t.realTime,
					Oe = s.maxFPS ? 1 / s.maxFPS : 0;
				(t.realTime = re),
					(b += V),
					b > Oe &&
						(t.skipTime ||
							((t.dt = b),
							(t.time += g()),
							t.fpsCounter.tick(t.dt)),
						(b = 0),
						(t.skipTime = !1),
						t.numFrames++,
						Dt(),
						d(),
						pn()),
					(t.loopID = requestAnimationFrame(C));
			}, "frame");
		C(0);
	}
	o(le, "run");
	function ge() {
		return "ontouchstart" in window || navigator.maxTouchPoints > 0;
	}
	o(ge, "isTouchScreen");
	function he() {
		return t.mousePos.clone();
	}
	o(he, "mousePos");
	function ie() {
		return t.mouseDeltaPos.clone();
	}
	o(ie, "mouseDeltaPos");
	function xe(d = "left") {
		return t.mouseState.pressed.has(d);
	}
	o(xe, "isMousePressed");
	function B(d = "left") {
		return t.mouseState.down.has(d);
	}
	o(B, "isMouseDown");
	function T(d = "left") {
		return t.mouseState.released.has(d);
	}
	o(T, "isMouseReleased");
	function ct() {
		return t.isMouseMoved;
	}
	o(ct, "isMouseMoved");
	function Fe(d) {
		return d === void 0
			? t.keyState.pressed.size > 0
			: t.keyState.pressed.has(d);
	}
	o(Fe, "isKeyPressed");
	function en(d) {
		return d === void 0
			? t.keyState.pressedRepeat.size > 0
			: t.keyState.pressedRepeat.has(d);
	}
	o(en, "isKeyPressedRepeat");
	function lt(d) {
		return d === void 0 ? t.keyState.down.size > 0 : t.keyState.down.has(d);
	}
	o(lt, "isKeyDown");
	function We(d) {
		return d === void 0
			? t.keyState.released.size > 0
			: t.keyState.released.has(d);
	}
	o(We, "isKeyReleased");
	function tn(d) {
		return d === void 0
			? t.mergedGamepadState.buttonState.pressed.size > 0
			: t.mergedGamepadState.buttonState.pressed.has(d);
	}
	o(tn, "isGamepadButtonPressed");
	function nn(d) {
		return d === void 0
			? t.mergedGamepadState.buttonState.down.size > 0
			: t.mergedGamepadState.buttonState.down.has(d);
	}
	o(nn, "isGamepadButtonDown");
	function Je(d) {
		return d === void 0
			? t.mergedGamepadState.buttonState.released.size > 0
			: t.mergedGamepadState.buttonState.released.has(d);
	}
	o(Je, "isGamepadButtonReleased");
	function rn(d) {
		return t.events.on("resize", d);
	}
	o(rn, "onResize");
	let _e = o((d, b) => {
			if (typeof d == "function") return t.events.on("keyDown", d);
			if (typeof d == "string" && typeof b == "function")
				return t.events.on("keyDown", (C) => C === d && b(d));
		}, "onKeyDown"),
		sn = o((d, b) => {
			if (typeof d == "function") return t.events.on("keyPress", d);
			if (typeof d == "string" && typeof b == "function")
				return t.events.on("keyPress", (C) => C === d && b(d));
		}, "onKeyPress"),
		on = o((d, b) => {
			if (typeof d == "function") return t.events.on("keyPressRepeat", d);
			if (typeof d == "string" && typeof b == "function")
				return t.events.on("keyPressRepeat", (C) => C === d && b(d));
		}, "onKeyPressRepeat"),
		Et = o((d, b) => {
			if (typeof d == "function") return t.events.on("keyRelease", d);
			if (typeof d == "string" && typeof b == "function")
				return t.events.on("keyRelease", (C) => C === d && b(d));
		}, "onKeyRelease");
	function St(d, b) {
		return typeof d == "function"
			? t.events.on("mouseDown", (C) => d(C))
			: t.events.on("mouseDown", (C) => C === d && b(C));
	}
	o(St, "onMouseDown");
	function Ct(d, b) {
		return typeof d == "function"
			? t.events.on("mousePress", (C) => d(C))
			: t.events.on("mousePress", (C) => C === d && b(C));
	}
	o(Ct, "onMousePress");
	function He(d, b) {
		return typeof d == "function"
			? t.events.on("mouseRelease", (C) => d(C))
			: t.events.on("mouseRelease", (C) => C === d && b(C));
	}
	o(He, "onMouseRelease");
	function an(d) {
		return t.events.on("mouseMove", () => d(he(), ie()));
	}
	o(an, "onMouseMove");
	function un(d) {
		return t.events.on("charInput", d);
	}
	o(un, "onCharInput");
	function cn(d) {
		return t.events.on("touchStart", d);
	}
	o(cn, "onTouchStart");
	function ln(d) {
		return t.events.on("touchMove", d);
	}
	o(ln, "onTouchMove");
	function hn(d) {
		return t.events.on("touchEnd", d);
	}
	o(hn, "onTouchEnd");
	function dn(d) {
		return t.events.on("scroll", d);
	}
	o(dn, "onScroll");
	function Tt(d, b) {
		if (typeof d == "function") return t.events.on("gamepadButtonDown", d);
		if (typeof d == "string" && typeof b == "function")
			return t.events.on("gamepadButtonDown", (C) => C === d && b(d));
	}
	o(Tt, "onGamepadButtonDown");
	function At(d, b) {
		if (typeof d == "function") return t.events.on("gamepadButtonPress", d);
		if (typeof d == "string" && typeof b == "function")
			return t.events.on("gamepadButtonPress", (C) => C === d && b(d));
	}
	o(At, "onGamepadButtonPress");
	function Ot(d, b) {
		if (typeof d == "function")
			return t.events.on("gamepadButtonRelease", d);
		if (typeof d == "string" && typeof b == "function")
			return t.events.on("gamepadButtonRelease", (C) => C === d && b(d));
	}
	o(Ot, "onGamepadButtonRelease");
	function Pt(d, b) {
		return t.events.on("gamepadStick", (C, ee) => C === d && b(ee));
	}
	o(Pt, "onGamepadStick");
	function Rt(d) {
		t.events.on("gamepadConnect", d);
	}
	o(Rt, "onGamepadConnect");
	function fn(d) {
		t.events.on("gamepadDisconnect", d);
	}
	o(fn, "onGamepadDisconnect");
	function ht(d) {
		return t.mergedGamepadState.stickState.get(d) || new v(0);
	}
	o(ht, "getGamepadStick");
	function mn() {
		return [...t.charInputted];
	}
	o(mn, "charInputted");
	function Mt() {
		return [...t.gamepads];
	}
	o(Mt, "getGamepads");
	function Dt() {
		t.events.trigger("input"),
			t.keyState.down.forEach((d) => t.events.trigger("keyDown", d)),
			t.mouseState.down.forEach((d) => t.events.trigger("mouseDown", d)),
			ft();
	}
	o(Dt, "processInput");
	function pn() {
		t.keyState.update(),
			t.mouseState.update(),
			t.mergedGamepadState.buttonState.update(),
			t.mergedGamepadState.stickState.forEach((d, b) => {
				t.mergedGamepadState.stickState.set(b, new v(0));
			}),
			(t.charInputted = []),
			(t.isMouseMoved = !1),
			t.gamepadStates.forEach((d) => {
				d.buttonState.update(),
					d.stickState.forEach((b, C) => {
						d.stickState.set(C, new v(0));
					});
			});
	}
	o(pn, "resetInput");
	function dt(d) {
		let b = {
			index: d.index,
			isPressed: (C) =>
				t.gamepadStates.get(d.index).buttonState.pressed.has(C),
			isDown: (C) => t.gamepadStates.get(d.index).buttonState.down.has(C),
			isReleased: (C) =>
				t.gamepadStates.get(d.index).buttonState.released.has(C),
			getStick: (C) => t.gamepadStates.get(d.index).stickState.get(C),
		};
		return (
			t.gamepads.push(b),
			t.gamepadStates.set(d.index, {
				buttonState: new Xe(),
				stickState: new Map([
					["left", new v(0)],
					["right", new v(0)],
				]),
			}),
			b
		);
	}
	o(dt, "registerGamepad");
	function Gt(d) {
		(t.gamepads = t.gamepads.filter((b) => b.index !== d.index)),
			t.gamepadStates.delete(d.index);
	}
	o(Gt, "removeGamepad");
	function ft() {
		for (let d of navigator.getGamepads())
			d && !t.gamepadStates.has(d.index) && dt(d);
		for (let d of t.gamepads) {
			let b = navigator.getGamepads()[d.index],
				ee = (s.gamepads ?? {})[b.id] ?? jn[b.id] ?? jn.default,
				re = t.gamepadStates.get(d.index);
			for (let V = 0; V < b.buttons.length; V++)
				b.buttons[V].pressed
					? (re.buttonState.down.has(ee.buttons[V]) ||
							(t.mergedGamepadState.buttonState.press(
								ee.buttons[V]
							),
							re.buttonState.press(ee.buttons[V]),
							t.events.trigger(
								"gamepadButtonPress",
								ee.buttons[V]
							)),
					  t.events.trigger("gamepadButtonDown", ee.buttons[V]))
					: re.buttonState.down.has(ee.buttons[V]) &&
					  (t.mergedGamepadState.buttonState.release(ee.buttons[V]),
					  re.buttonState.release(ee.buttons[V]),
					  t.events.trigger("gamepadButtonRelease", ee.buttons[V]));
			for (let V in ee.sticks) {
				let Oe = ee.sticks[V],
					Ie = new v(b.axes[Oe.x], b.axes[Oe.y]);
				re.stickState.set(V, Ie),
					t.mergedGamepadState.stickState.set(V, Ie),
					t.events.trigger("gamepadStick", V, Ie);
			}
		}
	}
	o(ft, "processGamepad");
	let de = {},
		Be = {},
		fe = {};
	de.mousemove = (d) => {
		let b = new v(d.offsetX, d.offsetY),
			C = new v(d.movementX, d.movementY);
		t.events.onOnce("input", () => {
			(t.isMouseMoved = !0),
				(t.mousePos = b),
				(t.mouseDeltaPos = C),
				t.events.trigger("mouseMove");
		});
	};
	let Ft = ["left", "middle", "right", "back", "forward"];
	(de.mousedown = (d) => {
		t.events.onOnce("input", () => {
			let b = Ft[d.button];
			b && (t.mouseState.press(b), t.events.trigger("mousePress", b));
		});
	}),
		(de.mouseup = (d) => {
			t.events.onOnce("input", () => {
				let b = Ft[d.button];
				b &&
					(t.mouseState.release(b),
					t.events.trigger("mouseRelease", b));
			});
		});
	let gn = new Set([
			" ",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
			"Tab",
		]),
		Bt = {
			ArrowLeft: "left",
			ArrowRight: "right",
			ArrowUp: "up",
			ArrowDown: "down",
			" ": "space",
		};
	(de.keydown = (d) => {
		gn.has(d.key) && d.preventDefault(),
			t.events.onOnce("input", () => {
				let b = Bt[d.key] || d.key.toLowerCase();
				b.length === 1
					? (t.events.trigger("charInput", b), t.charInputted.push(b))
					: b === "space" &&
					  (t.events.trigger("charInput", " "),
					  t.charInputted.push(" ")),
					d.repeat
						? (t.keyState.pressRepeat(b),
						  t.events.trigger("keyPressRepeat", b))
						: (t.keyState.press(b),
						  t.events.trigger("keyPressRepeat", b),
						  t.events.trigger("keyPress", b));
			});
	}),
		(de.keyup = (d) => {
			t.events.onOnce("input", () => {
				let b = Bt[d.key] || d.key.toLowerCase();
				t.keyState.release(b), t.events.trigger("keyRelease", b);
			});
		}),
		(de.touchstart = (d) => {
			d.preventDefault(),
				t.events.onOnce("input", () => {
					let b = [...d.changedTouches];
					b.forEach((C) => {
						t.events.trigger(
							"touchStart",
							new v(C.clientX, C.clientY),
							C
						);
					}),
						s.touchToMouse !== !1 &&
							((t.mousePos = new v(b[0].clientX, b[0].clientY)),
							t.mouseState.press("left"),
							t.events.trigger("mousePress", "left"));
				});
		}),
		(de.touchmove = (d) => {
			d.preventDefault(),
				t.events.onOnce("input", () => {
					let b = [...d.changedTouches];
					b.forEach((C) => {
						t.events.trigger(
							"touchMove",
							new v(C.clientX, C.clientY),
							C
						);
					}),
						s.touchToMouse !== !1 &&
							((t.mousePos = new v(b[0].clientX, b[0].clientY)),
							t.events.trigger("mouseMove"));
				});
		}),
		(de.touchend = (d) => {
			t.events.onOnce("input", () => {
				let b = [...d.changedTouches];
				b.forEach((C) => {
					t.events.trigger(
						"touchEnd",
						new v(C.clientX, C.clientY),
						C
					);
				}),
					s.touchToMouse !== !1 &&
						((t.mousePos = new v(b[0].clientX, b[0].clientY)),
						t.mouseState.release("left"),
						t.events.trigger("mouseRelease", "left"));
			});
		}),
		(de.touchcancel = (d) => {
			t.events.onOnce("input", () => {
				let b = [...d.changedTouches];
				b.forEach((C) => {
					t.events.trigger(
						"touchEnd",
						new v(C.clientX, C.clientY),
						C
					);
				}),
					s.touchToMouse !== !1 &&
						((t.mousePos = new v(b[0].clientX, b[0].clientY)),
						t.mouseState.release("left"),
						t.events.trigger("mouseRelease", "left"));
			});
		}),
		(de.wheel = (d) => {
			d.preventDefault(),
				t.events.onOnce("input", () => {
					t.events.trigger("scroll", new v(d.deltaX, d.deltaY));
				});
		}),
		(de.contextmenu = (d) => d.preventDefault()),
		(Be.visibilitychange = () => {
			document.visibilityState === "visible" && (t.skipTime = !0);
		}),
		(fe.gamepadconnected = (d) => {
			let b = dt(d.gamepad);
			t.events.onOnce("input", () => {
				t.events.trigger("gamepadConnect", b);
			});
		}),
		(fe.gamepaddisconnected = (d) => {
			let b = Mt().filter((C) => C.index === d.gamepad.index)[0];
			Gt(d.gamepad),
				t.events.onOnce("input", () => {
					t.events.trigger("gamepadDisconnect", b);
				});
		});
	for (let d in de) t.canvas.addEventListener(d, de[d]);
	for (let d in Be) document.addEventListener(d, Be[d]);
	for (let d in fe) window.addEventListener(d, fe[d]);
	let Lt = new ResizeObserver((d) => {
		for (let b of d)
			if (b.target === t.canvas) {
				if (
					t.lastWidth === t.canvas.offsetWidth &&
					t.lastHeight === t.canvas.offsetHeight
				)
					return;
				(t.lastWidth = t.canvas.offsetWidth),
					(t.lastHeight = t.canvas.offsetHeight),
					t.events.onOnce("input", () => {
						t.events.trigger("resize");
					});
			}
	});
	return (
		Lt.observe(t.canvas),
		{
			dt: g,
			time: E,
			run: le,
			canvas: c,
			fps: M,
			numFrames: z,
			quit: w,
			setFullscreen: pe,
			isFullscreen: Ge,
			setCursor: k,
			screenshot: I,
			getGamepads: Mt,
			getCursor: Z,
			setCursorLocked: ce,
			isCursorLocked: U,
			isTouchScreen: ge,
			mousePos: he,
			mouseDeltaPos: ie,
			isKeyDown: lt,
			isKeyPressed: Fe,
			isKeyPressedRepeat: en,
			isKeyReleased: We,
			isMouseDown: B,
			isMousePressed: xe,
			isMouseReleased: T,
			isMouseMoved: ct,
			isGamepadButtonPressed: tn,
			isGamepadButtonDown: nn,
			isGamepadButtonReleased: Je,
			getGamepadStick: ht,
			charInputted: mn,
			onResize: rn,
			onKeyDown: _e,
			onKeyPress: sn,
			onKeyPressRepeat: on,
			onKeyRelease: Et,
			onMouseDown: St,
			onMousePress: Ct,
			onMouseRelease: He,
			onMouseMove: an,
			onCharInput: un,
			onTouchStart: cn,
			onTouchMove: ln,
			onTouchEnd: hn,
			onScroll: dn,
			onGamepadButtonDown: Tt,
			onGamepadButtonPress: At,
			onGamepadButtonRelease: Ot,
			onGamepadStick: Pt,
			onGamepadConnect: Rt,
			onGamepadDisconnect: fn,
			events: t.events,
			get paused() {
				return t.paused;
			},
			set paused(d) {
				t.paused = d;
			},
		}
	);
}, "default");
var Xt = 2.5949095,
	Pr = 1.70158 + 1,
	Rr = (2 * Math.PI) / 3,
	Mr = (2 * Math.PI) / 4.5,
	Wt = {
		linear: (s) => s,
		easeInSine: (s) => 1 - Math.cos((s * Math.PI) / 2),
		easeOutSine: (s) => Math.sin((s * Math.PI) / 2),
		easeInOutSine: (s) => -(Math.cos(Math.PI * s) - 1) / 2,
		easeInQuad: (s) => s * s,
		easeOutQuad: (s) => 1 - (1 - s) * (1 - s),
		easeInOutQuad: (s) =>
			s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2,
		easeInCubic: (s) => s * s * s,
		easeOutCubic: (s) => 1 - Math.pow(1 - s, 3),
		easeInOutCubic: (s) =>
			s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2,
		easeInQuart: (s) => s * s * s * s,
		easeOutQuart: (s) => 1 - Math.pow(1 - s, 4),
		easeInOutQuart: (s) =>
			s < 0.5 ? 8 * s * s * s * s : 1 - Math.pow(-2 * s + 2, 4) / 2,
		easeInQuint: (s) => s * s * s * s * s,
		easeOutQuint: (s) => 1 - Math.pow(1 - s, 5),
		easeInOutQuint: (s) =>
			s < 0.5 ? 16 * s * s * s * s * s : 1 - Math.pow(-2 * s + 2, 5) / 2,
		easeInExpo: (s) => (s === 0 ? 0 : Math.pow(2, 10 * s - 10)),
		easeOutExpo: (s) => (s === 1 ? 1 : 1 - Math.pow(2, -10 * s)),
		easeInOutExpo: (s) =>
			s === 0
				? 0
				: s === 1
				? 1
				: s < 0.5
				? Math.pow(2, 20 * s - 10) / 2
				: (2 - Math.pow(2, -20 * s + 10)) / 2,
		easeInCirc: (s) => 1 - Math.sqrt(1 - Math.pow(s, 2)),
		easeOutCirc: (s) => Math.sqrt(1 - Math.pow(s - 1, 2)),
		easeInOutCirc: (s) =>
			s < 0.5
				? (1 - Math.sqrt(1 - Math.pow(2 * s, 2))) / 2
				: (Math.sqrt(1 - Math.pow(-2 * s + 2, 2)) + 1) / 2,
		easeInBack: (s) => Pr * s * s * s - 1.70158 * s * s,
		easeOutBack: (s) =>
			1 + Pr * Math.pow(s - 1, 3) + 1.70158 * Math.pow(s - 1, 2),
		easeInOutBack: (s) =>
			s < 0.5
				? (Math.pow(2 * s, 2) * ((Xt + 1) * 2 * s - Xt)) / 2
				: (Math.pow(2 * s - 2, 2) * ((Xt + 1) * (s * 2 - 2) + Xt) + 2) /
				  2,
		easeInElastic: (s) =>
			s === 0
				? 0
				: s === 1
				? 1
				: -Math.pow(2, 10 * s - 10) * Math.sin((s * 10 - 10.75) * Rr),
		easeOutElastic: (s) =>
			s === 0
				? 0
				: s === 1
				? 1
				: Math.pow(2, -10 * s) * Math.sin((s * 10 - 0.75) * Rr) + 1,
		easeInOutElastic: (s) =>
			s === 0
				? 0
				: s === 1
				? 1
				: s < 0.5
				? -(
						Math.pow(2, 20 * s - 10) *
						Math.sin((20 * s - 11.125) * Mr)
				  ) / 2
				: (Math.pow(2, -20 * s + 10) *
						Math.sin((20 * s - 11.125) * Mr)) /
						2 +
				  1,
		easeInBounce: (s) => 1 - Wt.easeOutBounce(1 - s),
		easeOutBounce: (s) =>
			s < 1 / 2.75
				? 7.5625 * s * s
				: s < 2 / 2.75
				? 7.5625 * (s -= 1.5 / 2.75) * s + 0.75
				: s < 2.5 / 2.75
				? 7.5625 * (s -= 2.25 / 2.75) * s + 0.9375
				: 7.5625 * (s -= 2.625 / 2.75) * s + 0.984375,
		easeInOutBounce: (s) =>
			s < 0.5
				? (1 - Wt.easeOutBounce(1 - 2 * s)) / 2
				: (1 + Wt.easeOutBounce(2 * s - 1)) / 2,
	},
	ot = Wt;
var at = class {
	time;
	action;
	finished = !1;
	paused = !1;
	constructor(t, c) {
		(this.time = t), (this.action = c);
	}
	tick(t) {
		return this.finished || this.paused
			? !1
			: ((this.time -= t),
			  this.time <= 0
					? (this.action(), (this.finished = !0), (this.time = 0), !0)
					: !1);
	}
	reset(t) {
		(this.time = t), (this.finished = !1);
	}
};
o(at, "Timer");
var Dr =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
var Ui = {};
mi(Ui, { default: () => Nn });
var Nn = pi(
	"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L5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
);
var Gr =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABdRJREFUeJzt3d3N3TYMgGG16ADdoAhyl7UyV9bqXRB0g2zQXgRGDcOWSIoUaX3vAwQBknMk/4gWLcnHrQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDEb9kb8FH99eeXf6Wf/efn35ynDyj1pEsb6G6NUxOYZ7sdB/QtPdnWRnn29gbKMYDUspPs0SgPb22cHANo/JG9AZF6wWBp3JLgeir36bvff3x9LOvzp2/dbSFA97bk5I4a9VMD7TXOUcP0uJ+d6emu5d6V1QvMs5nj8FZPx37X/b2TFpzShtnafeP0DipJMFnLnN3/w1OQ7tZgP+pA4VVKcHo0TG36KNULKGt5XsHZmi1APS5WM2Vqg0i7vbsG6YcIznN9vRTxXHavgdxtv6Tc3vc1pAHqdaG6ipwKYprpf1sFp6aH0gRTrxxLubPB2avHu+c/l3mICvqnsr//+Cq+qGrK1Xw/wzbBaRkNvSv3yew9cq+cu89L6nu6F/cMzCgzF1ftANlbe+Otp1IkDVxyVfbo6Z481f3507dhvXfbrk3HpdtjKTNqKuio8678c7mzF6ns6arfMyrVNoA75wMfNU2hKSeCx3Fq7dc+SPfDc39H9Vqn2CT//4bsYeT1PecOJyGSJdh6PZOlbElPZz2PHtlD1cUeS4LT4z5IOihwfNaD5ERm9qxH/dZ7Vmt9M999CtCZbdLUP/p3r2zFQ0paG8lr4Eb6+ZWBcSeq/qhyK6bXUfXOSgtO7/tOb9eT1NveqKttpYbiyXu/euV51JV16/T6e86zyF5TUp731V5Sp+Z7M71h9QvFNWWuvr0Sy4LzLfNvrel6zRX1e+hN2VzrnNlfaYD0xhCs++851lDh3vNV95xe6YvHgb8bwbNcuc+f09wbaUj2dzYgjz93//5kh94t0quCM8OKK6glKKuM0EYHfhUZWd8WwenZa0rLsp6s2YY66o0k9WUvS4NManBaGuo1eDIHgUZ1ePdkntsfFaCz5VZJdStsxyt7ziMNXHEAK5yk1mqmhrMPf1fcp57Vqe3SqZTMEduZhqAZyaywFne0DVHngHTZ11bznE88l/1lBZ9meP8851plWkBCO7drmQvWnL/sY/fKtFaqN3iy6iofsQxNktJnTMgfPXJUz3w3VaP5vOQ7Iyszvy2DczSi+aYFET2jINUEqFcAS4+rV480WlwRWXe07dLa0YGvfl9kmbTvPZJ1TXGvn4t4yuRp+2aMgk27wkm63DIztU3vOVfueC8wK4zKWtK0M+nvJXmOdlt65MgFFCva06qsKz044SvjIiN5TjLaaHxhtNyyouXBGZ1WSn66Ivt+M7pRZAWoZsDq+t2emeM1am/WtHxFG9runrO1/n1CxLK7CilxJM/H4bwuTJJBvWtgvm0gcNu01uvpd8la1soLE7xkpYDea4Ot6W3GOSzRc3o/qHw2M9qmXWA+uw+jbd0hyO9Yz0+vJ9QGcO/8ZV2YUqYVPN8dImXp3aJ/w1XTGGYfKZN+P7IXiXqO1uINLzFOm/Pz+BV4C03PNEqpZl//ELXP1ro8nhLyKLPHMyAiXyvh4cMFZ2uyAJXc62gzgJl1nhrSLMEzcLx+5qQnIhgqv6qhTHC2Zmus1tUuowCVDkRU6j0jgiJqhLPSSq2q7wMtMSBkdbcQWjNCq2nMlRrTnajAPP/t+c5Sj3K8VNueQ+pGzaa2MyOb2sZseW2dpL6ZnjMzfeQFt/Fe3XP2WIfGvRY6a569jCJ9TaIlcCS9KQE5p1TP2VrMbwLNDlZEvpE5AkGxh9f2nLO/QOetytIwAnMf6SfS2ns+jaZ6B4i2sWvSvF0HWOAj/aRGNFAaPXbw2rS2Rzr0T/ChshKNM3qd4135BCaqK9VAKy+lAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4DBC0k0jFtF9wAAAAASUVORK5CYII=";
var Fr =
	"data:image/png;base64,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";
var Ti = "3000.0.1",
	Br =
		" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
	Jt = "topleft",
	Lr = 64,
	Ai = "monospace",
	Qt = "monospace",
	Oi = 36,
	Ir = 64,
	Vr = 256,
	jr = 2048,
	Nr = 2048,
	kr = 2048,
	_r = 2048,
	Hr = 0.1,
	Pi = 64,
	qr = "nearest",
	Ri = 1,
	Kr = [
		{ name: "a_pos", size: 2 },
		{ name: "a_uv", size: 2 },
		{ name: "a_color", size: 4 },
	],
	Zt = Kr.reduce((s, t) => s + t.size, 0),
	Yr = 2048,
	$r = Yr * 4 * Zt,
	zr = Yr * 6,
	Mi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
	Di = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
	kn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
	_n = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
	Gi = new Set(["id", "require"]),
	Fi = new Set([
		"add",
		"update",
		"draw",
		"destroy",
		"inspect",
		"drawInspect",
	]);
function ut(s) {
	switch (s) {
		case "topleft":
			return new v(-1, -1);
		case "top":
			return new v(0, -1);
		case "topright":
			return new v(1, -1);
		case "left":
			return new v(-1, 0);
		case "center":
			return new v(0, 0);
		case "right":
			return new v(1, 0);
		case "botleft":
			return new v(-1, 1);
		case "bot":
			return new v(0, 1);
		case "botright":
			return new v(1, 1);
		default:
			return s;
	}
}
o(ut, "anchorPt");
function Bi(s) {
	switch (s) {
		case "left":
			return 0;
		case "center":
			return 0.5;
		case "right":
			return 1;
		default:
			return 0;
	}
}
o(Bi, "alignPt");
function Li(s) {
	return s.createBuffer(1, 1, 44100);
}
o(Li, "createEmptyAudioBuffer");
var mo = o((s = {}) => {
	let t = s.root ?? document.body;
	t === document.body &&
		((document.body.style.width = "100%"),
		(document.body.style.height = "100%"),
		(document.body.style.margin = "0px"),
		(document.documentElement.style.width = "100%"),
		(document.documentElement.style.height = "100%"));
	let c =
			s.canvas ??
			(() => {
				let e = document.createElement("canvas");
				return t.appendChild(e), e;
			})(),
		g = s.scale ?? 1,
		E = s.width && s.height && !s.stretch && !s.letterbox;
	E
		? ((c.width = s.width * g), (c.height = s.height * g))
		: ((c.width = c.parentElement.offsetWidth),
		  (c.height = c.parentElement.offsetHeight));
	let M = c.width,
		z = c.height,
		I = s.pixelDensity || window.devicePixelRatio;
	(c.width *= I), (c.height *= I);
	let k = ["outline: none", "cursor: default"];
	E
		? (k.push(`width: ${M}px`), k.push(`height: ${z}px`))
		: (k.push("width: 100%"), k.push("height: 100%")),
		s.crisp &&
			(k.push("image-rendering: pixelated"),
			k.push("image-rendering: crisp-edges")),
		(c.style.cssText = k.join(";")),
		(c.tabIndex = 0);
	let Z = document.createElement("canvas");
	(Z.width = Vr), (Z.height = Vr);
	let ce = Z.getContext("2d", { willReadFrequently: !0 }),
		U = Or({
			canvas: c,
			touchToMouse: s.touchToMouse,
			gamepads: s.gamepads,
			pixelDensity: s.pixelDensity,
			maxFPS: s.maxFPS,
		}),
		X = [],
		h = U.canvas().getContext("webgl", {
			antialias: !0,
			depth: !0,
			stencil: !0,
			alpha: !0,
			preserveDrawingBuffer: !0,
		});
	class K {
		src = null;
		glTex;
		width;
		height;
		constructor(n, r, i = {}) {
			(this.glTex = h.createTexture()),
				X.push(() => this.free()),
				this.bind(),
				n &&
					r &&
					h.texImage2D(
						h.TEXTURE_2D,
						0,
						h.RGBA,
						n,
						r,
						0,
						h.RGBA,
						h.UNSIGNED_BYTE,
						null
					),
				(this.width = n),
				(this.height = r);
			let u = (() => {
					switch (i.filter ?? s.texFilter) {
						case "linear":
							return h.LINEAR;
						case "nearest":
							return h.NEAREST;
						default:
							return h.NEAREST;
					}
				})(),
				l = (() => {
					switch (i.wrap) {
						case "repeat":
							return h.REPEAT;
						case "clampToEdge":
							return h.CLAMP_TO_EDGE;
						default:
							return h.CLAMP_TO_EDGE;
					}
				})();
			h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, u),
				h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, u),
				h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, l),
				h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, l),
				this.unbind();
		}
		static fromImage(n, r = {}) {
			let i = new K(0, 0, r);
			return (
				i.bind(),
				h.texImage2D(
					h.TEXTURE_2D,
					0,
					h.RGBA,
					h.RGBA,
					h.UNSIGNED_BYTE,
					n
				),
				(i.width = n.width),
				(i.height = n.height),
				i.unbind(),
				(i.src = n),
				i
			);
		}
		update(n, r = 0, i = 0) {
			this.bind(),
				h.texSubImage2D(
					h.TEXTURE_2D,
					0,
					r,
					i,
					h.RGBA,
					h.UNSIGNED_BYTE,
					n
				),
				this.unbind();
		}
		bind() {
			h.bindTexture(h.TEXTURE_2D, this.glTex);
		}
		unbind() {
			h.bindTexture(h.TEXTURE_2D, null);
		}
		free() {
			h.deleteTexture(this.glTex);
		}
	}
	o(K, "Texture");
	class pe {
		tex;
		canvas;
		ctx;
		x = 0;
		y = 0;
		curHeight = 0;
		constructor(n, r) {
			(this.canvas = document.createElement("canvas")),
				(this.canvas.width = n),
				(this.canvas.height = r),
				(this.tex = K.fromImage(this.canvas)),
				(this.ctx = this.canvas.getContext("2d"));
		}
		add(n) {
			if (n.width > this.canvas.width || n.height > this.canvas.height)
				throw new Error(
					`Texture size (${n.width} x ${n.height}) exceeds limit (${this.canvas.width} x ${this.canvas.height})`
				);
			this.x + n.width > this.canvas.width &&
				((this.x = 0),
				(this.y += this.curHeight),
				(this.curHeight = 0)),
				this.y + n.height > this.canvas.height &&
					(this.ctx.clearRect(
						0,
						0,
						this.canvas.width,
						this.canvas.height
					),
					(this.tex = K.fromImage(this.canvas)),
					(this.x = 0),
					(this.y = 0),
					(this.curHeight = 0));
			let r = new v(this.x, this.y);
			return (
				(this.x += n.width),
				n.height > this.curHeight && (this.curHeight = n.height),
				n instanceof ImageData
					? this.ctx.putImageData(n, r.x, r.y)
					: this.ctx.drawImage(n, r.x, r.y),
				this.tex.update(this.canvas),
				[
					this.tex,
					new Q(
						r.x / this.canvas.width,
						r.y / this.canvas.height,
						n.width / this.canvas.width,
						n.height / this.canvas.height
					),
				]
			);
		}
	}
	o(pe, "TexPacker");
	class Ge {
		tex;
		glFrameBuffer;
		glRenderBuffer;
		constructor(n, r, i = {}) {
			(this.tex = new K(n, r, i)),
				(this.glFrameBuffer = h.createFramebuffer()),
				(this.glRenderBuffer = h.createRenderbuffer()),
				X.push(() => this.free()),
				this.bind(),
				h.renderbufferStorage(h.RENDERBUFFER, h.DEPTH_STENCIL, n, r),
				h.framebufferTexture2D(
					h.FRAMEBUFFER,
					h.COLOR_ATTACHMENT0,
					h.TEXTURE_2D,
					this.tex.glTex,
					0
				),
				h.framebufferRenderbuffer(
					h.FRAMEBUFFER,
					h.DEPTH_STENCIL_ATTACHMENT,
					h.RENDERBUFFER,
					this.glRenderBuffer
				),
				this.unbind();
		}
		get width() {
			return this.tex.width;
		}
		get height() {
			return this.tex.height;
		}
		bind() {
			h.bindFramebuffer(h.FRAMEBUFFER, this.glFrameBuffer),
				h.bindRenderbuffer(h.RENDERBUFFER, this.glRenderBuffer);
		}
		unbind() {
			h.bindFramebuffer(h.FRAMEBUFFER, null),
				h.bindRenderbuffer(h.RENDERBUFFER, null);
		}
		free() {
			h.deleteFramebuffer(this.glFrameBuffer),
				h.deleteRenderbuffer(this.glRenderBuffer),
				this.tex.free();
		}
	}
	o(Ge, "FrameBuffer");
	let w = (() => {
		let e = ft(kn, _n),
			n = K.fromImage(
				new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
			),
			r =
				s.width && s.height
					? new Ge(s.width * I, s.height * I)
					: new Ge(
							h.drawingBufferWidth / g,
							h.drawingBufferHeight / g
					  ),
			i = null,
			u = 1;
		s.background &&
			((i = L.fromArray(s.background)),
			(u = s.background[3] ?? 1),
			h.clearColor(i.r / 255, i.g / 255, i.b / 255, u)),
			h.enable(h.BLEND),
			h.enable(h.SCISSOR_TEST),
			h.blendFuncSeparate(
				h.SRC_ALPHA,
				h.ONE_MINUS_SRC_ALPHA,
				h.ONE,
				h.ONE_MINUS_SRC_ALPHA
			);
		let l = h.createBuffer();
		h.bindBuffer(h.ARRAY_BUFFER, l),
			h.bufferData(h.ARRAY_BUFFER, $r * 4, h.DYNAMIC_DRAW),
			Kr.reduce(
				(f, p, x) => (
					h.vertexAttribPointer(x, p.size, h.FLOAT, !1, Zt * 4, f),
					h.enableVertexAttribArray(x),
					f + p.size * 4
				),
				0
			),
			h.bindBuffer(h.ARRAY_BUFFER, null);
		let a = h.createBuffer();
		h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, a),
			h.bufferData(h.ELEMENT_ARRAY_BUFFER, zr * 4, h.DYNAMIC_DRAW),
			h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null);
		let m = K.fromImage(
			new ImageData(
				new Uint8ClampedArray([
					128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255,
					128, 128, 128, 255,
				]),
				2,
				2
			),
			{ wrap: "repeat", filter: "nearest" }
		);
		return {
			drawCalls: 0,
			lastDrawCalls: 0,
			defShader: e,
			curShader: e,
			frameBuffer: r,
			postShader: null,
			postShaderUniform: null,
			defTex: n,
			curTex: n,
			curUniform: {},
			vbuf: l,
			ibuf: a,
			vqueue: [],
			iqueue: [],
			transform: new J(),
			transformStack: [],
			bgTex: m,
			bgColor: i,
			bgAlpha: u,
			width: s.width ?? h.drawingBufferWidth / I / g,
			height: s.height ?? h.drawingBufferHeight / I / g,
			viewport: {
				x: 0,
				y: 0,
				width: h.drawingBufferWidth,
				height: h.drawingBufferHeight,
			},
		};
	})();
	class le {
		tex;
		frames = [new Q(0, 0, 1, 1)];
		anims = {};
		slice9 = null;
		constructor(n, r, i = {}, u = null) {
			(this.tex = n),
				r && (this.frames = r),
				(this.anims = i),
				(this.slice9 = u);
		}
		static from(n, r = {}) {
			return typeof n == "string"
				? le.fromURL(n, r)
				: Promise.resolve(le.fromImage(n, r));
		}
		static fromImage(n, r = {}) {
			let [i, u] = B.packer.add(n),
				l = r.frames
					? r.frames.map(
							(a) =>
								new Q(
									u.x + a.x * u.w,
									u.y + a.y * u.h,
									a.w * u.w,
									a.h * u.h
								)
					  )
					: Et(r.sliceX || 1, r.sliceY || 1, u.x, u.y, u.w, u.h);
			return new le(i, l, r.anims, r.slice9);
		}
		static fromURL(n, r = {}) {
			return Je(n).then((i) => le.fromImage(i, r));
		}
	}
	o(le, "SpriteData");
	class ge {
		buf;
		constructor(n) {
			this.buf = n;
		}
		static fromArrayBuffer(n) {
			return new Promise((r, i) => he.ctx.decodeAudioData(n, r, i)).then(
				(r) => new ge(r)
			);
		}
		static fromURL(n) {
			return Vn(n)
				? ge.fromArrayBuffer(Sr(n))
				: nn(n).then((r) => ge.fromArrayBuffer(r));
		}
	}
	o(ge, "SoundData");
	let he = (() => {
		let e = new (window.AudioContext || window.webkitAudioContext)(),
			n = e.createGain();
		n.connect(e.destination);
		let r = new ge(Li(e));
		return (
			e
				.decodeAudioData(Nn.buffer.slice(0))
				.then((i) => {
					r.buf = i;
				})
				.catch((i) => {
					console.error("Failed to load burp: ", i);
				}),
			{ ctx: e, masterNode: n, burpSnd: r }
		);
	})();
	class ie {
		loaded = !1;
		data = null;
		error = null;
		onLoadEvents = new ve();
		onErrorEvents = new ve();
		onFinishEvents = new ve();
		constructor(n) {
			n.then((r) => {
				(this.data = r), this.onLoadEvents.trigger(r);
			})
				.catch((r) => {
					if (
						((this.error = r),
						this.onErrorEvents.numListeners() > 0)
					)
						this.onErrorEvents.trigger(r);
					else throw r;
				})
				.finally(() => {
					this.onFinishEvents.trigger(), (this.loaded = !0);
				});
		}
		static loaded(n) {
			let r = new ie(Promise.resolve(n));
			return (r.data = n), (r.loaded = !0), r;
		}
		onLoad(n) {
			return (
				this.loaded && this.data
					? n(this.data)
					: this.onLoadEvents.add(n),
				this
			);
		}
		onError(n) {
			return (
				this.loaded && this.error
					? n(this.error)
					: this.onErrorEvents.add(n),
				this
			);
		}
		onFinish(n) {
			return this.loaded ? n() : this.onFinishEvents.add(n), this;
		}
		then(n) {
			return this.onLoad(n);
		}
		catch(n) {
			return this.onError(n);
		}
		finally(n) {
			return this.onFinish(n);
		}
	}
	o(ie, "Asset");
	class xe {
		assets = new Map();
		lastUID = 0;
		add(n, r) {
			let i = n ?? this.lastUID++ + "",
				u = new ie(r);
			return this.assets.set(i, u), u;
		}
		addLoaded(n, r) {
			let i = n ?? this.lastUID++ + "",
				u = ie.loaded(r);
			return this.assets.set(i, u), u;
		}
		get(n) {
			return this.assets.get(n);
		}
		progress() {
			if (this.assets.size === 0) return 1;
			let n = 0;
			return (
				this.assets.forEach((r) => {
					r.loaded && n++;
				}),
				n / this.assets.size
			);
		}
	}
	o(xe, "AssetBucket");
	let B = {
			urlPrefix: "",
			sprites: new xe(),
			fonts: new xe(),
			bitmapFonts: new xe(),
			sounds: new xe(),
			shaders: new xe(),
			custom: new xe(),
			packer: new pe(kr, _r),
			loaded: !1,
		},
		T = {
			events: new De(),
			objEvents: new De(),
			root: Qn([]),
			gravity: 0,
			scenes: {},
			logs: [],
			cam: {
				pos: null,
				scale: new v(1),
				angle: 0,
				shake: 0,
				transform: new J(),
			},
		};
	function ct(e) {
		return B.custom.add(null, e);
	}
	o(ct, "load");
	function Fe() {
		let e = [
			B.sprites,
			B.sounds,
			B.shaders,
			B.fonts,
			B.bitmapFonts,
			B.custom,
		];
		return e.reduce((n, r) => n + r.progress(), 0) / e.length;
	}
	o(Fe, "loadProgress");
	function en(e) {
		return e !== void 0 && (B.urlPrefix = e), B.urlPrefix;
	}
	o(en, "loadRoot");
	function lt(e) {
		let n = B.urlPrefix + e;
		return fetch(n).then((r) => {
			if (!r.ok) throw new Error(`Failed to fetch ${n}`);
			return r;
		});
	}
	o(lt, "fetchURL");
	function We(e) {
		return lt(e).then((n) => n.json());
	}
	o(We, "fetchJSON");
	function tn(e) {
		return lt(e).then((n) => n.text());
	}
	o(tn, "fetchText");
	function nn(e) {
		return lt(e).then((n) => n.arrayBuffer());
	}
	o(nn, "fetchArrayBuffer");
	function Je(e) {
		let n = new Image();
		return (
			(n.crossOrigin = "anonymous"),
			(n.src = Vn(e) ? e : B.urlPrefix + e),
			new Promise((r, i) => {
				(n.onload = () => r(n)),
					(n.onerror = () =>
						i(new Error(`Failed to load image from "${e}"`)));
			})
		);
	}
	o(Je, "loadImg");
	function rn(e, n) {
		return B.custom.add(e, We(n));
	}
	o(rn, "loadJSON");
	class _e {
		fontface;
		outline;
		filter;
		constructor(n, r = {}) {
			(this.fontface = n),
				(this.outline = r.outline ?? 0),
				(this.filter = r.filter ?? qr);
		}
	}
	o(_e, "FontData");
	function sn(e, n, r = {}) {
		let i = new FontFace(e, typeof n == "string" ? `url(${n})` : n);
		return (
			document.fonts.add(i),
			B.fonts.add(
				e,
				i
					.load()
					.catch((u) => {
						throw new Error(
							`Failed to load font from "${n}": ${u}`
						);
					})
					.then((u) => new _e(u, r))
			)
		);
	}
	o(sn, "loadFont");
	function on(e, n, r, i, u = {}) {
		return B.bitmapFonts.add(
			e,
			Je(n).then((l) => de(K.fromImage(l, u), r, i, u.chars ?? Br))
		);
	}
	o(on, "loadBitmapFont");
	function Et(e = 1, n = 1, r = 0, i = 0, u = 1, l = 1) {
		let a = [],
			m = u / e,
			f = l / n;
		for (let p = 0; p < n; p++)
			for (let x = 0; x < e; x++)
				a.push(new Q(r + x * m, i + p * f, m, f));
		return a;
	}
	o(Et, "slice");
	function St(e, n) {
		return ct(
			typeof n == "string"
				? new Promise((r, i) => {
						We(n).then((u) => {
							St(e, u).then(r).catch(i);
						});
				  })
				: le.from(e).then((r) => {
						let i = {};
						for (let u in n) {
							let l = n[u],
								a = r.frames[0],
								m = kr * a.w,
								f = _r * a.h,
								p = l.frames
									? l.frames.map(
											(D) =>
												new Q(
													a.x +
														((l.x + D.x) / m) * a.w,
													a.y +
														((l.y + D.y) / f) * a.h,
													(D.w / m) * a.w,
													(D.h / f) * a.h
												)
									  )
									: Et(
											l.sliceX || 1,
											l.sliceY || 1,
											a.x + (l.x / m) * a.w,
											a.y + (l.y / f) * a.h,
											(l.width / m) * a.w,
											(l.height / f) * a.h
									  ),
								x = new le(r.tex, p, l.anims);
							B.sprites.addLoaded(u, x), (i[u] = x);
						}
						return i;
				  })
		);
	}
	o(St, "loadSpriteAtlas");
	function Ct(e, n = {}) {
		let r = document.createElement("canvas"),
			i = e[0].width,
			u = e[0].height;
		(r.width = i * e.length), (r.height = u);
		let l = r.getContext("2d");
		e.forEach((m, f) => {
			m instanceof ImageData
				? l.putImageData(m, f * i, 0)
				: l.drawImage(m, f * i, 0);
		});
		let a = l.getImageData(0, 0, e.length * i, u);
		return le.fromImage(a, { ...n, sliceX: e.length, sliceY: 1 });
	}
	o(Ct, "createSpriteSheet");
	function He(e, n, r = { sliceX: 1, sliceY: 1, anims: {} }) {
		return Array.isArray(n)
			? n.some((i) => typeof i == "string")
				? B.sprites.add(
						e,
						Promise.all(
							n.map((i) =>
								typeof i == "string"
									? Je(i)
									: Promise.resolve(i)
							)
						).then((i) => Ct(i, r))
				  )
				: B.sprites.addLoaded(e, Ct(n, r))
			: typeof n == "string"
			? B.sprites.add(e, le.from(n, r))
			: B.sprites.addLoaded(e, le.fromImage(n, r));
	}
	o(He, "loadSprite");
	function an(e, n) {
		return B.sprites.add(
			e,
			new Promise(async (r) => {
				let i = typeof n == "string" ? await We(n) : n,
					u = await Promise.all(i.frames.map(Je)),
					l = document.createElement("canvas");
				(l.width = i.width), (l.height = i.height * i.frames.length);
				let a = l.getContext("2d");
				u.forEach((f, p) => {
					a.drawImage(f, 0, p * i.height);
				});
				let m = await He(null, l, {
					sliceY: i.frames.length,
					anims: i.anims,
				});
				r(m);
			})
		);
	}
	o(an, "loadPedit");
	function un(e, n, r) {
		typeof n == "string" &&
			!r &&
			(r = n.replace(new RegExp(`${Tr(n)}$`), "json"));
		let i = typeof r == "string" ? We(r) : Promise.resolve(r);
		return B.sprites.add(
			e,
			i.then((u) => {
				let l = u.meta.size,
					a = u.frames.map(
						(f) =>
							new Q(
								f.frame.x / l.w,
								f.frame.y / l.h,
								f.frame.w / l.w,
								f.frame.h / l.h
							)
					),
					m = {};
				for (let f of u.meta.frameTags)
					f.from === f.to
						? (m[f.name] = f.from)
						: (m[f.name] = {
								from: f.from,
								to: f.to,
								speed: 10,
								loop: !0,
								pingpong: f.direction === "pingpong",
						  });
				return le.from(n, { frames: a, anims: m });
			})
		);
	}
	o(un, "loadAseprite");
	function cn(e, n, r) {
		return B.shaders.addLoaded(e, ft(n, r));
	}
	o(cn, "loadShader");
	function ln(e, n, r) {
		let i = o((l) => (l ? tn(l) : Promise.resolve(null)), "resolveUrl"),
			u = Promise.all([i(n), i(r)]).then(([l, a]) => ft(l, a));
		return B.shaders.add(e, u);
	}
	o(ln, "loadShaderURL");
	function hn(e, n, r = {}) {
		return B.sounds.add(
			e,
			typeof n == "string" ? ge.fromURL(n) : ge.fromArrayBuffer(n)
		);
	}
	o(hn, "loadSound");
	function dn(e = "bean") {
		return He(e, Dr);
	}
	o(dn, "loadBean");
	function Tt(e) {
		return B.sprites.get(e);
	}
	o(Tt, "getSprite");
	function At(e) {
		return B.sounds.get(e);
	}
	o(At, "getSound");
	function Ot(e) {
		return B.fonts.get(e);
	}
	o(Ot, "getFont");
	function Pt(e) {
		return B.bitmapFonts.get(e);
	}
	o(Pt, "getBitmapFont");
	function Rt(e) {
		return B.shaders.get(e);
	}
	o(Rt, "getShader");
	function fn(e) {
		return B.custom.get(e);
	}
	o(fn, "getAsset");
	function ht(e) {
		if (typeof e == "string") {
			let n = Tt(e);
			if (n) return n;
			if (Fe() < 1) return null;
			throw new Error(`Sprite not found: ${e}`);
		} else {
			if (e instanceof le) return ie.loaded(e);
			if (e instanceof ie) return e;
			throw new Error(`Invalid sprite: ${e}`);
		}
	}
	o(ht, "resolveSprite");
	function mn(e) {
		if (typeof e == "string") {
			let n = At(e);
			if (n) return n;
			if (Fe() < 1) return null;
			throw new Error(`Sound not found: ${e}`);
		} else {
			if (e instanceof ge) return ie.loaded(e);
			if (e instanceof ie) return e;
			throw new Error(`Invalid sound: ${e}`);
		}
	}
	o(mn, "resolveSound");
	function Mt(e) {
		if (!e) return w.defShader;
		if (typeof e == "string") {
			let n = Rt(e);
			if (n) return n.data ?? n;
			if (Fe() < 1) return null;
			throw new Error(`Shader not found: ${e}`);
		} else if (e instanceof ie) return e.data ? e.data : e;
		return e;
	}
	o(Mt, "resolveShader");
	function Dt(e) {
		if (!e) return Dt(s.font ?? Ai);
		if (typeof e == "string") {
			let n = Pt(e),
				r = Ot(e);
			if (n) return n.data ?? n;
			if (r) return r.data ?? r;
			if (document.fonts.check(`${Ir}px ${e}`)) return e;
			if (Fe() < 1) return null;
			throw new Error(`Font not found: ${e}`);
		} else if (e instanceof ie) return e.data ? e.data : e;
		return e;
	}
	o(Dt, "resolveFont");
	function pn(e) {
		return (
			e !== void 0 && (he.masterNode.gain.value = e),
			he.masterNode.gain.value
		);
	}
	o(pn, "volume");
	function dt(e, n = {}) {
		let r = he.ctx,
			i = n.paused ?? !1,
			u = r.createBufferSource(),
			l = new ve(),
			a = r.createGain(),
			m = n.seek ?? 0,
			f = 0,
			p = 0,
			x = !1;
		(u.loop = !!n.loop),
			(u.detune.value = n.detune ?? 0),
			(u.playbackRate.value = n.speed ?? 1),
			u.connect(a),
			(u.onended = () => {
				j() >= u.buffer?.duration && l.trigger();
			}),
			a.connect(he.masterNode),
			(a.gain.value = n.volume ?? 1);
		let D = o((O) => {
				(u.buffer = O.buf),
					i || ((f = r.currentTime), u.start(0, m), (x = !0));
			}, "start"),
			q = mn(e);
		q instanceof ie && q.onLoad(D);
		let j = o(() => {
				if (!u.buffer) return 0;
				let O = i ? p - f : r.currentTime - f,
					A = u.buffer.duration;
				return u.loop ? O % A : Math.min(O, A);
			}, "getTime"),
			$ = o((O) => {
				let A = r.createBufferSource();
				return (
					(A.buffer = O.buffer),
					(A.loop = O.loop),
					(A.playbackRate.value = O.playbackRate.value),
					(A.detune.value = O.detune.value),
					(A.onended = O.onended),
					A.connect(a),
					A
				);
			}, "cloneNode");
		return {
			set paused(O) {
				if (i !== O)
					if (((i = O), O))
						x && (u.stop(), (x = !1)), (p = r.currentTime);
					else {
						u = $(u);
						let A = p - f;
						u.start(0, A),
							(x = !0),
							(f = r.currentTime - A),
							(p = 0);
					}
			},
			get paused() {
				return i;
			},
			play(O = 0) {
				this.seek(O), (this.paused = !1);
			},
			seek(O) {
				u.buffer?.duration &&
					(O > u.buffer.duration ||
						(i
							? ((u = $(u)), (f = p - O))
							: (u.stop(),
							  (u = $(u)),
							  (f = r.currentTime - O),
							  u.start(0, O),
							  (x = !0),
							  (p = 0))));
			},
			set speed(O) {
				u.playbackRate.value = O;
			},
			get speed() {
				return u.playbackRate.value;
			},
			set detune(O) {
				u.detune.value = O;
			},
			get detune() {
				return u.detune.value;
			},
			set volume(O) {
				a.gain.value = Math.max(O, 0);
			},
			get volume() {
				return a.gain.value;
			},
			set loop(O) {
				u.loop = O;
			},
			get loop() {
				return u.loop;
			},
			duration() {
				return u.buffer?.duration ?? 0;
			},
			time() {
				return j() % this.duration();
			},
			onEnd(O) {
				return l.add(O);
			},
			then(O) {
				return this.onEnd(O);
			},
		};
	}
	o(dt, "play");
	function Gt(e) {
		return dt(he.burpSnd, e);
	}
	o(Gt, "burp");
	function ft(e = kn, n = _n) {
		let r = Mi.replace("{{user}}", e ?? kn),
			i = Di.replace("{{user}}", n ?? _n),
			u = h.createShader(h.VERTEX_SHADER),
			l = h.createShader(h.FRAGMENT_SHADER);
		h.shaderSource(u, r),
			h.shaderSource(l, i),
			h.compileShader(u),
			h.compileShader(l);
		let a = h.createProgram();
		if (
			(X.push(() => h.deleteProgram(a)),
			h.attachShader(a, u),
			h.attachShader(a, l),
			h.bindAttribLocation(a, 0, "a_pos"),
			h.bindAttribLocation(a, 1, "a_uv"),
			h.bindAttribLocation(a, 2, "a_color"),
			h.linkProgram(a),
			!h.getProgramParameter(a, h.LINK_STATUS))
		) {
			let m = o((D) => {
					let q = /^ERROR:\s0:(?<line>\d+):\s(?<msg>.+)/,
						j = D.match(q);
					return {
						line: Number(j.groups.line),
						msg: j.groups.msg.replace(/\n\0$/, ""),
					};
				}, "formatShaderError"),
				f = h.getShaderInfoLog(u),
				p = h.getShaderInfoLog(l),
				x = "";
			if (f) {
				let D = m(f);
				x += `Vertex shader line ${D.line - 14}: ${D.msg}`;
			}
			if (p) {
				let D = m(p);
				x += `Fragment shader line ${D.line - 14}: ${D.msg}`;
			}
			throw new Error(x);
		}
		return (
			h.deleteShader(u),
			h.deleteShader(l),
			{
				bind() {
					h.useProgram(a);
				},
				unbind() {
					h.useProgram(null);
				},
				free() {
					h.deleteProgram(a);
				},
				send(m) {
					for (let f in m) {
						let p = m[f],
							x = h.getUniformLocation(a, f);
						typeof p == "number"
							? h.uniform1f(x, p)
							: p instanceof J
							? h.uniformMatrix4fv(x, !1, new Float32Array(p.m))
							: p instanceof L
							? h.uniform3f(x, p.r, p.g, p.b)
							: p instanceof v && h.uniform2f(x, p.x, p.y);
					}
				},
			}
		);
	}
	o(ft, "makeShader");
	function de(e, n, r, i) {
		let u = e.width / n,
			l = {},
			a = i.split("").entries();
		for (let [m, f] of a)
			l[f] = new Q((m % u) * n, Math.floor(m / u) * r, n, r);
		return { tex: e, map: l, size: r };
	}
	o(de, "makeFont");
	function Be(e, n, r, i = w.defTex, u = w.defShader, l = {}) {
		let a = Mt(u);
		if (!a || a instanceof ie) return;
		(i !== w.curTex ||
			a !== w.curShader ||
			!Bn(w.curUniform, l) ||
			w.vqueue.length + e.length * Zt > $r ||
			w.iqueue.length + n.length > zr) &&
			fe();
		let m = r ? w.transform : T.cam.transform.mult(w.transform);
		for (let f of e) {
			let p = Lt(m.multVec2(f.pos));
			w.vqueue.push(
				p.x,
				p.y,
				f.uv.x,
				f.uv.y,
				f.color.r / 255,
				f.color.g / 255,
				f.color.b / 255,
				f.opacity
			);
		}
		for (let f of n) w.iqueue.push(f + w.vqueue.length / Zt - e.length);
		(w.curTex = i), (w.curShader = a), (w.curUniform = l);
	}
	o(Be, "drawRaw");
	function fe() {
		!w.curTex ||
			!w.curShader ||
			w.vqueue.length === 0 ||
			w.iqueue.length === 0 ||
			(h.bindBuffer(h.ARRAY_BUFFER, w.vbuf),
			h.bufferSubData(h.ARRAY_BUFFER, 0, new Float32Array(w.vqueue)),
			h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, w.ibuf),
			h.bufferSubData(
				h.ELEMENT_ARRAY_BUFFER,
				0,
				new Uint16Array(w.iqueue)
			),
			w.curShader.bind(),
			w.curShader.send(w.curUniform),
			w.curTex.bind(),
			h.drawElements(h.TRIANGLES, w.iqueue.length, h.UNSIGNED_SHORT, 0),
			w.curTex.unbind(),
			w.curShader.unbind(),
			h.bindBuffer(h.ARRAY_BUFFER, null),
			h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null),
			(w.vqueue.length = 0),
			(w.iqueue.length = 0),
			w.drawCalls++);
	}
	o(fe, "flush");
	function Ft() {
		h.clear(h.COLOR_BUFFER_BIT),
			w.frameBuffer.bind(),
			h.viewport(0, 0, w.frameBuffer.width, w.frameBuffer.height),
			h.clear(h.COLOR_BUFFER_BIT),
			w.bgColor ||
				Ve(() => {
					Oe({
						width: we(),
						height: ye(),
						quad: new Q(0, 0, we() / Lr, ye() / Lr),
						tex: w.bgTex,
						fixed: !0,
					});
				}),
			(w.drawCalls = 0),
			(w.transformStack.length = 0),
			(w.transform = new J());
	}
	o(Ft, "frameStart");
	function gn(e, n) {
		(w.postShader = e), (w.postShaderUniform = n ?? null);
	}
	o(gn, "usePostEffect");
	function Bt() {
		fe(),
			w.frameBuffer.unbind(),
			h.viewport(0, 0, h.drawingBufferWidth, h.drawingBufferHeight),
			fe();
		let e = w.width,
			n = w.height;
		(w.width = h.drawingBufferWidth / I),
			(w.height = h.drawingBufferHeight / I),
			Ie({
				flipY: !0,
				tex: w.frameBuffer.tex,
				pos: new v(w.viewport.x, w.viewport.y),
				width: w.viewport.width,
				height: w.viewport.height,
				shader: w.postShader,
				uniform:
					typeof w.postShaderUniform == "function"
						? w.postShaderUniform()
						: w.postShaderUniform,
				fixed: !0,
			}),
			fe(),
			(w.width = e),
			(w.height = n),
			(w.lastDrawCalls = w.drawCalls);
	}
	o(Bt, "frameEnd");
	function Lt(e) {
		return new v((e.x / we()) * 2 - 1, (-e.y / ye()) * 2 + 1);
	}
	o(Lt, "screen2ndc");
	function d(e) {
		w.transform = e.clone();
	}
	o(d, "pushMatrix");
	function b(...e) {
		if (e[0] === void 0) return;
		let n = S(...e);
		(n.x === 0 && n.y === 0) || w.transform.translate(n);
	}
	o(b, "pushTranslate");
	function C(...e) {
		if (e[0] === void 0) return;
		let n = S(...e);
		(n.x === 1 && n.y === 1) || w.transform.scale(n);
	}
	o(C, "pushScale");
	function ee(e) {
		e && w.transform.rotate(e);
	}
	o(ee, "pushRotate");
	function re() {
		w.transformStack.push(w.transform.clone());
	}
	o(re, "pushTransform");
	function V() {
		w.transformStack.length > 0 && (w.transform = w.transformStack.pop());
	}
	o(V, "popTransform");
	function Oe(e) {
		if (e.width === void 0 || e.height === void 0)
			throw new Error(
				'drawUVQuad() requires property "width" and "height".'
			);
		if (e.width <= 0 || e.height <= 0) return;
		let n = e.width,
			r = e.height,
			u = ut(e.anchor || Jt).scale(new v(n, r).scale(-0.5)),
			l = e.quad || new Q(0, 0, 1, 1),
			a = e.color || W(255, 255, 255),
			m = e.opacity ?? 1,
			f = e.tex ? Hr / e.tex.width : 0,
			p = e.tex ? Hr / e.tex.height : 0,
			x = l.x + f,
			D = l.y + p,
			q = l.w - f * 2,
			j = l.h - p * 2;
		re(),
			b(e.pos),
			ee(e.angle),
			C(e.scale),
			b(u),
			Be(
				[
					{
						pos: new v(-n / 2, r / 2),
						uv: new v(e.flipX ? x + q : x, e.flipY ? D : D + j),
						color: a,
						opacity: m,
					},
					{
						pos: new v(-n / 2, -r / 2),
						uv: new v(e.flipX ? x + q : x, e.flipY ? D + j : D),
						color: a,
						opacity: m,
					},
					{
						pos: new v(n / 2, -r / 2),
						uv: new v(e.flipX ? x : x + q, e.flipY ? D + j : D),
						color: a,
						opacity: m,
					},
					{
						pos: new v(n / 2, r / 2),
						uv: new v(e.flipX ? x : x + q, e.flipY ? D : D + j),
						color: a,
						opacity: m,
					},
				],
				[0, 1, 3, 1, 2, 3],
				e.fixed,
				e.tex,
				e.shader,
				e.uniform
			),
			V();
	}
	o(Oe, "drawUVQuad");
	function Ie(e) {
		if (!e.tex) throw new Error('drawTexture() requires property "tex".');
		let n = e.quad ?? new Q(0, 0, 1, 1),
			r = e.tex.width * n.w,
			i = e.tex.height * n.h,
			u = new v(1);
		if (e.tiled) {
			let l = Math.ceil((e.width || r) / r),
				a = Math.ceil((e.height || i) / i),
				f = ut(e.anchor || Jt)
					.add(new v(1, 1))
					.scale(0.5)
					.scale(l * r, a * i);
			for (let p = 0; p < l; p++)
				for (let x = 0; x < a; x++)
					Oe(
						Object.assign({}, e, {
							pos: (e.pos || new v(0))
								.add(new v(r * p, i * x))
								.sub(f),
							scale: u.scale(e.scale || new v(1)),
							tex: e.tex,
							quad: n,
							width: r,
							height: i,
							anchor: "topleft",
						})
					);
		} else
			e.width && e.height
				? ((u.x = e.width / r), (u.y = e.height / i))
				: e.width
				? ((u.x = e.width / r), (u.y = u.x))
				: e.height && ((u.y = e.height / i), (u.x = u.y)),
				Oe(
					Object.assign({}, e, {
						scale: u.scale(e.scale || new v(1)),
						tex: e.tex,
						quad: n,
						width: r,
						height: i,
					})
				);
	}
	o(Ie, "drawTexture");
	function Xr(e) {
		if (!e.sprite)
			throw new Error('drawSprite() requires property "sprite"');
		let n = ht(e.sprite);
		if (!n || !n.data) return;
		let r = n.data.frames[e.frame ?? 0];
		if (!r) throw new Error(`Frame not found: ${e.frame ?? 0}`);
		Ie(
			Object.assign({}, e, {
				tex: n.data.tex,
				quad: r.scale(e.quad ?? new Q(0, 0, 1, 1)),
			})
		);
	}
	o(Xr, "drawSprite");
	function mt(e, n, r, i, u, l = 1) {
		(i = Re(i % 360)), (u = Re(u % 360)), u <= i && (u += Math.PI * 2);
		let a = [],
			m = Math.ceil(((u - i) / Re(8)) * l),
			f = (u - i) / m;
		for (let p = i; p < u; p += f)
			a.push(e.add(n * Math.cos(p), r * Math.sin(p)));
		return a.push(e.add(n * Math.cos(u), r * Math.sin(u))), a;
	}
	o(mt, "getArcPts");
	function Ce(e) {
		if (e.width === void 0 || e.height === void 0)
			throw new Error(
				'drawRect() requires property "width" and "height".'
			);
		if (e.width <= 0 || e.height <= 0) return;
		let n = e.width,
			r = e.height,
			u = ut(e.anchor || Jt)
				.add(1, 1)
				.scale(new v(n, r).scale(-0.5)),
			l = [new v(0, 0), new v(n, 0), new v(n, r), new v(0, r)];
		if (e.radius) {
			let a = Math.min(Math.min(n, r) / 2, e.radius);
			l = [
				new v(a, 0),
				new v(n - a, 0),
				...mt(new v(n - a, a), a, a, 270, 360),
				new v(n, a),
				new v(n, r - a),
				...mt(new v(n - a, r - a), a, a, 0, 90),
				new v(n - a, r),
				new v(a, r),
				...mt(new v(a, r - a), a, a, 90, 180),
				new v(0, r - a),
				new v(0, a),
				...mt(new v(a, a), a, a, 180, 270),
			];
		}
		qe(
			Object.assign({}, e, {
				offset: u,
				pts: l,
				...(e.gradient
					? {
							colors: e.horizontal
								? [
										e.gradient[0],
										e.gradient[1],
										e.gradient[1],
										e.gradient[0],
								  ]
								: [
										e.gradient[0],
										e.gradient[0],
										e.gradient[1],
										e.gradient[1],
								  ],
					  }
					: {}),
			})
		);
	}
	o(Ce, "drawRect");
	function pt(e) {
		let { p1: n, p2: r } = e;
		if (!n || !r)
			throw new Error('drawLine() requires properties "p1" and "p2".');
		let i = e.width || 1,
			u = r
				.sub(n)
				.unit()
				.normal()
				.scale(i * 0.5),
			l = [n.sub(u), n.add(u), r.add(u), r.sub(u)].map((a) => ({
				pos: new v(a.x, a.y),
				uv: new v(0),
				color: e.color ?? L.WHITE,
				opacity: e.opacity ?? 1,
			}));
		Be(l, [0, 1, 3, 1, 2, 3], e.fixed, w.defTex, e.shader, e.uniform);
	}
	o(pt, "drawLine");
	function Hn(e) {
		let n = e.pts;
		if (!n) throw new Error('drawLines() requires property "pts".');
		if (!(n.length < 2))
			if (e.radius && n.length >= 3) {
				let r = n[0].sdist(n[1]);
				for (let u = 1; u < n.length - 1; u++)
					r = Math.min(n[u].sdist(n[u + 1]), r);
				let i = Math.min(e.radius, Math.sqrt(r) / 2);
				pt(Object.assign({}, e, { p1: n[0], p2: n[1] }));
				for (let u = 1; u < n.length - 2; u++) {
					let l = n[u],
						a = n[u + 1];
					pt(Object.assign({}, e, { p1: l, p2: a }));
				}
				pt(
					Object.assign({}, e, {
						p1: n[n.length - 2],
						p2: n[n.length - 1],
					})
				);
			} else
				for (let r = 0; r < n.length - 1; r++)
					pt(Object.assign({}, e, { p1: n[r], p2: n[r + 1] })),
						e.join !== "none" &&
							Qe(
								Object.assign({}, e, {
									pos: n[r],
									radius: e.width / 2,
								})
							);
	}
	o(Hn, "drawLines");
	function qn(e) {
		if (!e.p1 || !e.p2 || !e.p3)
			throw new Error(
				'drawPolygon() requires properties "p1", "p2" and "p3".'
			);
		return qe(Object.assign({}, e, { pts: [e.p1, e.p2, e.p3] }));
	}
	o(qn, "drawTriangle");
	function Qe(e) {
		if (!e.radius)
			throw new Error('drawCircle() requires property "radius".');
		e.radius !== 0 &&
			$n(
				Object.assign({}, e, {
					radiusX: e.radius,
					radiusY: e.radius,
					angle: 0,
				})
			);
	}
	o(Qe, "drawCircle");
	function $n(e) {
		if (e.radiusX === void 0 || e.radiusY === void 0)
			throw new Error(
				'drawEllipse() requires properties "radiusX" and "radiusY".'
			);
		if (e.radiusX === 0 || e.radiusY === 0) return;
		let n = e.start ?? 0,
			r = e.end ?? 360,
			i = ut(e.anchor ?? "center").scale(new v(-e.radiusX, -e.radiusY)),
			u = mt(i, e.radiusX, e.radiusY, n, r, e.resolution);
		u.unshift(i);
		let l = Object.assign({}, e, {
			pts: u,
			radius: 0,
			...(e.gradient
				? {
						colors: [
							e.gradient[0],
							...Array(u.length - 1).fill(e.gradient[1]),
						],
				  }
				: {}),
		});
		if (r - n >= 360 && e.outline) {
			e.fill !== !1 && qe(Object.assign(l, { outline: null })),
				qe(Object.assign(l, { pts: u.slice(1), fill: !1 }));
			return;
		}
		qe(l);
	}
	o($n, "drawEllipse");
	function qe(e) {
		if (!e.pts) throw new Error('drawPolygon() requires property "pts".');
		let n = e.pts.length;
		if (!(n < 3)) {
			if (
				(re(),
				b(e.pos),
				C(e.scale),
				ee(e.angle),
				b(e.offset),
				e.fill !== !1)
			) {
				let r = e.color ?? L.WHITE,
					i = e.pts.map((l, a) => ({
						pos: new v(l.x, l.y),
						uv: new v(0, 0),
						color: e.colors ? e.colors[a] ?? r : r,
						opacity: e.opacity ?? 1,
					})),
					u = [...Array(n - 2).keys()]
						.map((l) => [0, l + 1, l + 2])
						.flat();
				Be(i, e.indices ?? u, e.fixed, w.defTex, e.shader, e.uniform);
			}
			e.outline &&
				Hn({
					pts: [...e.pts, e.pts[0]],
					radius: e.radius,
					width: e.outline.width,
					color: e.outline.color,
					join: e.outline.join,
					uniform: e.uniform,
					fixed: e.fixed,
					opacity: e.opacity,
				}),
				V();
		}
	}
	o(qe, "drawPolygon");
	function zn(e, n, r) {
		fe(),
			h.clear(h.STENCIL_BUFFER_BIT),
			h.enable(h.STENCIL_TEST),
			h.stencilFunc(h.NEVER, 1, 255),
			h.stencilOp(h.REPLACE, h.REPLACE, h.REPLACE),
			n(),
			fe(),
			h.stencilFunc(r, 1, 255),
			h.stencilOp(h.KEEP, h.KEEP, h.KEEP),
			e(),
			fe(),
			h.disable(h.STENCIL_TEST);
	}
	o(zn, "drawStenciled");
	function Wr(e, n) {
		zn(e, n, h.EQUAL);
	}
	o(Wr, "drawMasked");
	function Jr(e, n) {
		zn(e, n, h.NOTEQUAL);
	}
	o(Jr, "drawSubtracted");
	function Kn() {
		return (w.viewport.width + w.viewport.height) / (w.width + w.height);
	}
	o(Kn, "getViewportScale");
	function Ve(e) {
		fe();
		let n = w.width,
			r = w.height;
		(w.width = w.viewport.width),
			(w.height = w.viewport.height),
			e(),
			fe(),
			(w.width = n),
			(w.height = r);
	}
	o(Ve, "drawUnscaled");
	function Yn(e, n) {
		n.pos && (e.pos = e.pos.add(n.pos)),
			n.scale && (e.scale = e.scale.scale(S(n.scale))),
			n.angle && (e.angle += n.angle),
			n.color && (e.color = e.color.mult(n.color)),
			n.opacity && (e.opacity *= n.opacity);
	}
	o(Yn, "applyCharTransform");
	let Xn = /\[(?<style>\w+)\](?<text>.*?)\[\/\k<style>\]/g;
	function Qr(e) {
		let n = {},
			r = e.replace(Xn, "$2"),
			i = 0;
		for (let u of e.matchAll(Xn)) {
			let l = u.index - i;
			for (let a = 0; a < u.groups.text.length; a++)
				n[a + l] = [u.groups.style];
			i += u[0].length - u.groups.text.length;
		}
		return { charStyleMap: n, text: r };
	}
	o(Qr, "compileStyledText");
	let wn = {};
	function $e(e) {
		if (e.text === void 0)
			throw new Error('formatText() requires property "text".');
		let n = Dt(e.font);
		if (e.text === "" || n instanceof ie || !n)
			return { width: 0, height: 0, chars: [], opt: e };
		let { charStyleMap: r, text: i } = Qr(e.text + ""),
			u = i.split("");
		if (n instanceof _e || typeof n == "string") {
			let _ = n instanceof _e ? n.fontface.family : n,
				H =
					n instanceof _e
						? { outline: n.outline, filter: n.filter }
						: { outline: 0, filter: qr },
				F = wn[_] ?? {
					font: {
						tex: new K(jr, Nr, { filter: H.filter }),
						map: {},
						size: Ir,
					},
					cursor: new v(0),
					outline: H.outline,
				};
			wn[_] || (wn[_] = F), (n = F.font);
			for (let Ue of u)
				if (!F.font.map[Ue]) {
					let y = ce;
					y.clearRect(0, 0, Z.width, Z.height),
						(y.font = `${n.size}px ${_}`),
						(y.textBaseline = "top"),
						(y.textAlign = "left"),
						(y.fillStyle = "#ffffff");
					let R = y.measureText(Ue),
						P = Math.ceil(R.width),
						G = n.size;
					F.outline &&
						((y.lineJoin = "round"),
						(y.lineWidth = F.outline * 2),
						(y.strokeStyle = "#000000"),
						y.strokeText(Ue, F.outline, F.outline),
						(P += F.outline * 2),
						(G += F.outline * 3)),
						y.fillText(Ue, F.outline, F.outline);
					let N = y.getImageData(0, 0, P, G);
					if (
						F.cursor.x + P > jr &&
						((F.cursor.x = 0), (F.cursor.y += G), F.cursor.y > Nr)
					)
						throw new Error("Font atlas exceeds character limit");
					n.tex.update(N, F.cursor.x, F.cursor.y),
						(n.map[Ue] = new Q(F.cursor.x, F.cursor.y, P, G)),
						(F.cursor.x += P);
				}
		}
		let l = e.size || n.size,
			a = S(e.scale ?? 1).scale(l / n.size),
			m = e.lineSpacing ?? 0,
			f = e.letterSpacing ?? 0,
			p = 0,
			x = 0,
			D = 0,
			q = [],
			j = [],
			$ = 0,
			O = null,
			A = null;
		for (; $ < u.length; ) {
			let _ = u[$];
			if (
				_ ===
				`
`
			)
				(D += l + m),
					q.push({ width: p - f, chars: j }),
					(O = null),
					(A = null),
					(p = 0),
					(j = []);
			else {
				let H = n.map[_];
				if (H) {
					let F = H.w * a.x;
					e.width &&
						p + F > e.width &&
						((D += l + m),
						O != null &&
							(($ -= j.length - O),
							(_ = u[$]),
							(H = n.map[_]),
							(F = H.w * a.x),
							(j = j.slice(0, O - 1)),
							(p = A)),
						(O = null),
						(A = null),
						q.push({ width: p - f, chars: j }),
						(p = 0),
						(j = [])),
						j.push({
							tex: n.tex,
							width: H.w,
							height: H.h,
							quad: new Q(
								H.x / n.tex.width,
								H.y / n.tex.height,
								H.w / n.tex.width,
								H.h / n.tex.height
							),
							ch: _,
							pos: new v(p, D),
							opacity: e.opacity ?? 1,
							color: e.color ?? L.WHITE,
							scale: S(a),
							angle: 0,
						}),
						_ === " " && ((O = j.length), (A = p)),
						(p += F),
						(x = Math.max(x, p)),
						(p += f);
				}
			}
			$++;
		}
		q.push({ width: p - f, chars: j }), (D += l), e.width && (x = e.width);
		let te = [];
		for (let _ of q) {
			let H = (x - _.width) * Bi(e.align ?? "left");
			for (let F of _.chars) {
				let Ue = n.map[F.ch],
					y = te.length;
				if (
					((F.pos = F.pos
						.add(H, 0)
						.add(Ue.w * a.x * 0.5, Ue.h * a.y * 0.5)),
					e.transform)
				) {
					let R =
						typeof e.transform == "function"
							? e.transform(y, F.ch)
							: e.transform;
					R && Yn(F, R);
				}
				if (r[y]) {
					let R = r[y];
					for (let P of R) {
						let G = e.styles[P],
							N = typeof G == "function" ? G(y, F.ch) : G;
						N && Yn(F, N);
					}
				}
				te.push(F);
			}
		}
		return { width: x, height: D, chars: te, opt: e };
	}
	o($e, "formatText");
	function Wn(e) {
		ze($e(e));
	}
	o(Wn, "drawText");
	function ze(e) {
		re(),
			b(e.opt.pos),
			ee(e.opt.angle),
			b(
				ut(e.opt.anchor ?? "topleft")
					.add(1, 1)
					.scale(e.width, e.height)
					.scale(-0.5)
			),
			e.chars.forEach((n) => {
				Oe({
					tex: n.tex,
					width: n.width,
					height: n.height,
					pos: n.pos,
					scale: n.scale,
					angle: n.angle,
					color: n.color,
					opacity: n.opacity,
					quad: n.quad,
					anchor: "center",
					uniform: e.opt.uniform,
					shader: e.opt.shader,
					fixed: e.opt.fixed,
				});
			}),
			V();
	}
	o(ze, "drawFormattedText");
	function we() {
		return w.width;
	}
	o(we, "width");
	function ye() {
		return w.height;
	}
	o(ye, "height");
	let Ze = {};
	function Zr(e) {
		return new v(
			((e.x - w.viewport.x) * we()) / w.viewport.width,
			((e.y - w.viewport.y) * ye()) / w.viewport.height
		);
	}
	o(Zr, "windowToContent");
	function es(e) {
		return new v(
			(e.x * w.viewport.width) / w.width,
			(e.y * w.viewport.height) / w.height
		);
	}
	o(es, "contentToView");
	function It() {
		return Zr(U.mousePos());
	}
	o(It, "mousePos"),
		(Ze.error = (e) => {
			e.error ? Sn(e.error) : Sn(new Error(e.message));
		}),
		(Ze.unhandledrejection = (e) => Sn(e.reason));
	for (let e in Ze) window.addEventListener(e, Ze[e]);
	let se = {
		inspect: !1,
		timeScale: 1,
		showLog: !0,
		fps: () => U.fps(),
		numFrames: () => U.numFrames(),
		stepFrame: cr,
		drawCalls: () => w.drawCalls,
		clearLog: () => (T.logs = []),
		log: (e) => {
			let n = s.logMax ?? Ri,
				r = e instanceof Error ? "error" : "info";
			T.logs.unshift(
				`${`[time]${U.time().toFixed(2)}[/time] `}[${r}]${
					e?.toString ? e.toString() : e
				}[/${r}]`
			),
				T.logs.length > n && (T.logs = T.logs.slice(0, n));
		},
		error: (e) => se.log(new Error(e.toString ? e.toString() : e)),
		curRecording: null,
		get paused() {
			return U.paused;
		},
		set paused(e) {
			(U.paused = e), e ? he.ctx.suspend() : he.ctx.resume();
		},
	};
	function Te() {
		return U.dt();
	}
	o(Te, "dt");
	function ts(...e) {
		return (
			e.length > 0 && (T.cam.pos = S(...e)),
			T.cam.pos ? T.cam.pos.clone() : _t()
		);
	}
	o(ts, "camPos");
	function ns(...e) {
		return e.length > 0 && (T.cam.scale = S(...e)), T.cam.scale.clone();
	}
	o(ns, "camScale");
	function rs(e) {
		return e !== void 0 && (T.cam.angle = e), T.cam.angle;
	}
	o(rs, "camRot");
	function ss(e = 12) {
		T.cam.shake = e;
	}
	o(ss, "shake");
	function bn(e) {
		return T.cam.transform.multVec2(e);
	}
	o(bn, "toScreen");
	function Jn(e) {
		return T.cam.transform.invert().multVec2(e);
	}
	o(Jn, "toWorld");
	function Vt(e) {
		let n = new J();
		return (
			e.pos && n.translate(e.pos),
			e.scale && n.scale(e.scale),
			e.angle && n.rotate(e.angle),
			e.parent ? n.mult(e.parent.transform) : n
		);
	}
	o(Vt, "calcTransform");
	function Qn(e) {
		let n = new Map(),
			r = {},
			i = new De(),
			u = null,
			l = {
				id: Ar(),
				hidden: !1,
				paused: !1,
				transform: new J(),
				children: [],
				parent: null,
				add(a) {
					let m = (() => {
						if (Array.isArray(a)) return Qn(a);
						if (a.parent)
							throw new Error(
								"Cannot add a game obj that already has a parent."
							);
						return a;
					})();
					return (
						(m.parent = this),
						(m.transform = Vt(m)),
						this.children.push(m),
						m.trigger("add", m),
						T.events.trigger("add", m),
						m
					);
				},
				readd(a) {
					let m = this.children.indexOf(a);
					return (
						m !== -1 &&
							(this.children.splice(m, 1), this.children.push(a)),
						a
					);
				},
				remove(a) {
					let m = this.children.indexOf(a);
					m !== -1 &&
						(a.trigger("destroy"),
						T.events.trigger("destroy", a),
						(a.parent = null),
						this.children.splice(m, 1));
				},
				removeAll(a) {
					this.get(a).forEach((m) => this.remove(m));
				},
				update() {
					this.paused ||
						(this.children
							.sort((a, m) => (a.z ?? 0) - (m.z ?? 0))
							.forEach((a) => a.update()),
						this.trigger("update"));
				},
				draw() {
					this.hidden ||
						(re(),
						b(this.pos),
						C(this.scale),
						ee(this.angle),
						this.trigger("draw"),
						this.children
							.sort((a, m) => (a.z ?? 0) - (m.z ?? 0))
							.forEach((a) => a.draw()),
						V());
				},
				drawInspect() {
					this.hidden ||
						(re(),
						b(this.pos),
						C(this.scale),
						ee(this.angle),
						this.children
							.sort((a, m) => (a.z ?? 0) - (m.z ?? 0))
							.forEach((a) => a.drawInspect()),
						this.trigger("drawInspect"),
						V());
				},
				use(a) {
					if (!a) return;
					if (typeof a == "string") return this.use({ id: a });
					let m = [];
					a.id &&
						(this.unuse(a.id),
						(r[a.id] = []),
						(m = r[a.id]),
						n.set(a.id, a));
					for (let p in a) {
						if (Gi.has(p)) continue;
						let x = Object.getOwnPropertyDescriptor(a, p);
						if (
							(typeof x.value == "function" &&
								(a[p] = a[p].bind(this)),
							x.set &&
								Object.defineProperty(a, p, {
									set: x.set.bind(this),
								}),
							x.get &&
								Object.defineProperty(a, p, {
									get: x.get.bind(this),
								}),
							Fi.has(p))
						) {
							let D =
								p === "add"
									? () => {
											(u = o(
												(q) => m.push(q),
												"onCurCompCleanup"
											)),
												a[p](),
												(u = null);
									  }
									: a[p];
							m.push(this.on(p, D).cancel);
						} else if (this[p] === void 0)
							Object.defineProperty(this, p, {
								get: () => a[p],
								set: (D) => (a[p] = D),
								configurable: !0,
								enumerable: !0,
							}),
								m.push(() => delete this[p]);
						else
							throw new Error(
								`Duplicate component property: "${p}"`
							);
					}
					let f = o(() => {
						if (a.require) {
							for (let p of a.require)
								if (!this.c(p))
									throw new Error(
										`Component "${a.id}" requires component "${p}"`
									);
						}
					}, "checkDeps");
					a.destroy && m.push(a.destroy.bind(this)),
						this.exists()
							? (f(),
							  a.add &&
									((u = o(
										(p) => m.push(p),
										"onCurCompCleanup"
									)),
									a.add.call(this),
									(u = null)))
							: a.require && m.push(this.on("add", f).cancel);
				},
				unuse(a) {
					r[a] && (r[a].forEach((m) => m()), delete r[a]),
						n.has(a) && n.delete(a);
				},
				c(a) {
					return n.get(a);
				},
				get(a, m = {}) {
					let f = m.recursive
						? this.children.flatMap((p) => [p, ...p.children])
						: this.children;
					if (
						((f = f.filter((p) => (a ? p.is(a) : !0))),
						m.liveUpdate)
					) {
						let p = o(
							(x) =>
								m.recursive
									? this.isAncestorOf(x)
									: x.parent === this,
							"isChild"
						);
						yn((x) => {
							p(x) && x.is(a) && f.push(x);
						}),
							Zn((x) => {
								if (p(x) && x.is(a)) {
									let D = f.findIndex((q) => q.id === x.id);
									D !== -1 && f.splice(D, 1);
								}
							});
					}
					return f;
				},
				isAncestorOf(a) {
					return a.parent
						? a.parent === this || this.isAncestorOf(a.parent)
						: !1;
				},
				exists() {
					return T.root.isAncestorOf(this);
				},
				is(a) {
					if (a === "*") return !0;
					if (Array.isArray(a)) {
						for (let m of a) if (!this.c(m)) return !1;
						return !0;
					} else return this.c(a) != null;
				},
				on(a, m) {
					let f = i.on(a, m.bind(this));
					return u && u(() => f.cancel()), f;
				},
				trigger(a, ...m) {
					i.trigger(a, ...m), T.objEvents.trigger(a, this, ...m);
				},
				destroy() {
					this.parent && this.parent.remove(this);
				},
				inspect() {
					let a = {};
					for (let [m, f] of n) a[m] = f.inspect ? f.inspect() : null;
					return a;
				},
				onAdd(a) {
					return this.on("add", a);
				},
				onUpdate(a) {
					return this.on("update", a);
				},
				onDraw(a) {
					return this.on("draw", a);
				},
				onDestroy(a) {
					return this.on("destroy", a);
				},
				clearEvents() {
					i.clear();
				},
			};
		for (let a of e) l.use(a);
		return l;
	}
	o(Qn, "make");
	function je(e, n, r) {
		return (
			T.objEvents[e] || (T.objEvents[e] = new it()),
			T.objEvents.on(e, (i, ...u) => {
				i.is(n) && r(i, ...u);
			})
		);
	}
	o(je, "on");
	let vn = o((e, n) => {
			if (typeof e == "function" && n === void 0) {
				let r = bt([{ update: e }]);
				return {
					get paused() {
						return r.paused;
					},
					set paused(i) {
						r.paused = i;
					},
					cancel: () => r.destroy(),
				};
			} else if (typeof e == "string") return je("update", e, n);
		}, "onUpdate"),
		is = o((e, n) => {
			if (typeof e == "function" && n === void 0) {
				let r = bt([{ draw: e }]);
				return {
					get paused() {
						return r.hidden;
					},
					set paused(i) {
						r.hidden = i;
					},
					cancel: () => r.destroy(),
				};
			} else if (typeof e == "string") return je("draw", e, n);
		}, "onDraw");
	function yn(e, n) {
		if (typeof e == "function" && n === void 0)
			return T.events.on("add", e);
		if (typeof e == "string") return je("add", e, n);
	}
	o(yn, "onAdd");
	function Zn(e, n) {
		if (typeof e == "function" && n === void 0)
			return T.events.on("destroy", e);
		if (typeof e == "string") return je("destroy", e, n);
	}
	o(Zn, "onDestroy");
	function os(e, n, r) {
		return je("collide", e, (i, u, l) => u.is(n) && r(i, u, l));
	}
	o(os, "onCollide");
	function as(e, n, r) {
		return je("collideUpdate", e, (i, u, l) => u.is(n) && r(i, u, l));
	}
	o(as, "onCollideUpdate");
	function us(e, n, r) {
		return je("collideEnd", e, (i, u, l) => u.is(n) && r(i, u, l));
	}
	o(us, "onCollideEnd");
	function jt(e, n) {
		ar(e, { recursive: !0 }).forEach(n), yn(e, n);
	}
	o(jt, "forAllCurrentAndFuture");
	function cs(e, n) {
		if (typeof e == "function") return U.onMousePress(e);
		{
			let r = [];
			return (
				jt(e, (i) => {
					if (!i.area)
						throw new Error(
							"onClick() requires the object to have area() component"
						);
					r.push(i.onClick(() => n(i)));
				}),
				Ae.join(r)
			);
		}
	}
	o(cs, "onClick");
	function ls(e, n) {
		let r = [];
		return (
			jt(e, (i) => {
				if (!i.area)
					throw new Error(
						"onHover() requires the object to have area() component"
					);
				r.push(i.onHover(() => n(i)));
			}),
			Ae.join(r)
		);
	}
	o(ls, "onHover");
	function hs(e, n) {
		let r = [];
		return (
			jt(e, (i) => {
				if (!i.area)
					throw new Error(
						"onHoverUpdate() requires the object to have area() component"
					);
				r.push(i.onHoverUpdate(() => n(i)));
			}),
			Ae.join(r)
		);
	}
	o(hs, "onHoverUpdate");
	function ds(e, n) {
		let r = [];
		return (
			jt(e, (i) => {
				if (!i.area)
					throw new Error(
						"onHoverEnd() requires the object to have area() component"
					);
				r.push(i.onHoverEnd(() => n(i)));
			}),
			Ae.join(r)
		);
	}
	o(ds, "onHoverEnd");
	function gt(e, n) {
		let r = 0,
			i = [];
		n && i.push(n);
		let u = vn(() => {
			(r += Te()), r >= e && (u.cancel(), i.forEach((l) => l()));
		});
		return {
			paused: u.paused,
			cancel: u.cancel,
			onEnd(l) {
				i.push(l);
			},
			then(l) {
				return this.onEnd(l), this;
			},
		};
	}
	o(gt, "wait");
	function fs(e, n) {
		let r = null,
			i = o(() => {
				(r = gt(e, i)), n();
			}, "newAction");
		return (
			(r = gt(0, i)),
			{
				get paused() {
					return r.paused;
				},
				set paused(u) {
					r.paused = u;
				},
				cancel: () => r.cancel(),
			}
		);
	}
	o(fs, "loop");
	function er() {
		U.onKeyPress("f1", () => {
			se.inspect = !se.inspect;
		}),
			U.onKeyPress("f2", () => {
				se.clearLog();
			}),
			U.onKeyPress("f8", () => {
				se.paused = !se.paused;
			}),
			U.onKeyPress("f7", () => {
				se.timeScale = wt(Ne(se.timeScale - 0.2, 0, 2), 1);
			}),
			U.onKeyPress("f9", () => {
				se.timeScale = wt(Ne(se.timeScale + 0.2, 0, 2), 1);
			}),
			U.onKeyPress("f10", () => {
				se.stepFrame();
			});
	}
	o(er, "enterDebugMode");
	function tr() {
		U.onKeyPress("b", () => Gt());
	}
	o(tr, "enterBurpMode");
	function ms(e) {
		T.gravity = e;
	}
	o(ms, "setGravity");
	function ps() {
		return T.gravity;
	}
	o(ps, "getGravity");
	function gs(...e) {
		e.length === 1 || e.length === 2
			? ((w.bgColor = W(e[0])), e[1] && (w.bgAlpha = e[1]))
			: (e.length === 3 || e.length === 4) &&
			  ((w.bgColor = W(e[0], e[1], e[2])), e[3] && (w.bgAlpha = e[3])),
			h.clearColor(
				w.bgColor.r / 255,
				w.bgColor.g / 255,
				w.bgColor.b / 255,
				w.bgAlpha
			);
	}
	o(gs, "setBackground");
	function ws() {
		return w.bgColor.clone();
	}
	o(ws, "getBackground");
	function Nt(...e) {
		return {
			id: "pos",
			pos: S(...e),
			moveBy(...n) {
				this.pos = this.pos.add(S(...n));
			},
			move(...n) {
				this.moveBy(S(...n).scale(Te()));
			},
			moveTo(...n) {
				if (typeof n[0] == "number" && typeof n[1] == "number")
					return this.moveTo(S(n[0], n[1]), n[2]);
				let r = n[0],
					i = n[1];
				if (i === void 0) {
					this.pos = S(r);
					return;
				}
				let u = r.sub(this.pos);
				if (u.len() <= i * Te()) {
					this.pos = S(r);
					return;
				}
				this.move(u.unit().scale(i));
			},
			worldPos() {
				return this.parent
					? this.parent.transform.multVec2(this.pos)
					: this.pos;
			},
			screenPos() {
				return this.fixed ? this.pos : bn(this.pos);
			},
			inspect() {
				return `(${Math.round(this.pos.x)}, ${Math.round(this.pos.y)})`;
			},
			drawInspect() {
				Qe({ color: W(255, 0, 0), radius: 4 / Kn() });
			},
		};
	}
	o(Nt, "pos");
	function kt(...e) {
		return e.length === 0
			? kt(1)
			: {
					id: "scale",
					scale: S(...e),
					scaleTo(...n) {
						this.scale = S(...n);
					},
					scaleBy(...n) {
						this.scale.scale(S(...n));
					},
					inspect() {
						return `(${wt(this.scale.x, 2)}, ${wt(
							this.scale.y,
							2
						)})`;
					},
			  };
	}
	o(kt, "scale");
	function bs(e) {
		return {
			id: "rotate",
			angle: e ?? 0,
			rotateBy(n) {
				this.angle += n;
			},
			rotateTo(n) {
				this.angle = n;
			},
			inspect() {
				return `${Math.round(this.angle)}`;
			},
		};
	}
	o(bs, "rotate");
	function vs(...e) {
		return {
			id: "color",
			color: W(...e),
			inspect() {
				return this.color.toString();
			},
		};
	}
	o(vs, "color");
	function wt(e, n) {
		return Number(e.toFixed(n));
	}
	o(wt, "toFixed");
	function ys(e) {
		return {
			id: "opacity",
			opacity: e ?? 1,
			inspect() {
				return `${wt(this.opacity, 1)}`;
			},
			fadeOut(n = 1, r = ot.linear) {
				return Cn(this.opacity, 0, n, (i) => (this.opacity = i), r);
			},
		};
	}
	o(ys, "opacity");
	function xn(e) {
		if (!e) throw new Error("Please define an anchor");
		return {
			id: "anchor",
			anchor: e,
			inspect() {
				return typeof this.anchor == "string"
					? this.anchor
					: this.anchor.toString();
			},
		};
	}
	o(xn, "anchor");
	function xs(e) {
		return {
			id: "z",
			z: e,
			inspect() {
				return `${this.z}`;
			},
		};
	}
	o(xs, "z");
	function Us(e, n) {
		return {
			id: "follow",
			require: ["pos"],
			follow: { obj: e, offset: n ?? S(0) },
			add() {
				e.exists() &&
					(this.pos = this.follow.obj.pos.add(this.follow.offset));
			},
			update() {
				e.exists() &&
					(this.pos = this.follow.obj.pos.add(this.follow.offset));
			},
		};
	}
	o(Us, "follow");
	function Es(e, n) {
		let r = typeof e == "number" ? v.fromAngle(e) : e.unit();
		return {
			id: "move",
			require: ["pos"],
			update() {
				this.move(r.scale(n));
			},
		};
	}
	o(Es, "move");
	let Ss = 200;
	function Cs(e = {}) {
		let n = e.distance ?? Ss,
			r = !1;
		return {
			id: "offscreen",
			require: ["pos"],
			isOffScreen() {
				let i = bn(this.pos),
					u = new ne(S(0), we(), ye());
				return !yt(u, i) && u.sdistToPoint(i) > n * n;
			},
			onExitScreen(i) {
				return this.on("exitView", i);
			},
			onEnterScreen(i) {
				return this.on("enterView", i);
			},
			update() {
				this.isOffScreen()
					? (r || (this.trigger("exitView"), (r = !0)),
					  e.hide && (this.hidden = !0),
					  e.pause && (this.paused = !0),
					  e.destroy && this.destroy())
					: (r && (this.trigger("enterView"), (r = !1)),
					  e.hide && (this.hidden = !1),
					  e.pause && (this.paused = !1));
			},
		};
	}
	o(Cs, "offscreen");
	function Ts(e = {}) {
		let n = {},
			r = new Set();
		return {
			id: "area",
			collisionIgnore: e.collisionIgnore ?? [],
			add() {
				this.area.cursor &&
					this.onHover(() => U.setCursor(this.area.cursor)),
					this.onCollideUpdate((i, u) => {
						n[i.id] || this.trigger("collide", i, u),
							(n[i.id] = u),
							r.add(i.id);
					});
			},
			update() {
				for (let i in n)
					r.has(Number(i)) ||
						(this.trigger("collideEnd", n[i].target), delete n[i]);
				r.clear();
			},
			drawInspect() {
				let i = this.localArea();
				re(), C(this.area.scale), b(this.area.offset);
				let u = {
					outline: { width: 4 / Kn(), color: W(0, 0, 255) },
					anchor: this.anchor,
					fill: !1,
					fixed: this.fixed,
				};
				i instanceof ne
					? Ce({ ...u, pos: i.pos, width: i.width, height: i.height })
					: i instanceof Pe
					? qe({ ...u, pts: i.pts })
					: i instanceof ke &&
					  Qe({ ...u, pos: i.center, radius: i.radius }),
					V();
			},
			area: {
				shape: e.shape ?? null,
				scale: e.scale ? S(e.scale) : S(1),
				offset: e.offset ?? S(0),
				cursor: e.cursor ?? null,
			},
			isClicked() {
				return U.isMousePressed() && this.isHovering();
			},
			isHovering() {
				let i = this.fixed ? It() : Jn(It());
				return this.hasPoint(i);
			},
			checkCollision(i) {
				return n[i.id] ?? null;
			},
			getCollisions() {
				return Object.values(n);
			},
			isColliding(i) {
				return !!n[i.id];
			},
			isOverlapping(i) {
				let u = n[i.id];
				return u && u.hasOverlap();
			},
			onClick(i) {
				let u = U.onMousePress("left", () => {
					this.isHovering() && i();
				});
				return this.onDestroy(() => u.cancel()), u;
			},
			onHover(i) {
				let u = !1;
				return this.onUpdate(() => {
					u
						? (u = this.isHovering())
						: this.isHovering() && ((u = !0), i());
				});
			},
			onHoverUpdate(i) {
				return this.onUpdate(() => {
					this.isHovering() && i();
				});
			},
			onHoverEnd(i) {
				let u = !1;
				return this.onUpdate(() => {
					u
						? this.isHovering() || ((u = !1), i())
						: (u = this.isHovering());
				});
			},
			onCollide(i, u) {
				if (typeof i == "function" && u === void 0)
					return this.on("collide", i);
				if (typeof i == "string")
					return this.onCollide((l, a) => {
						l.is(i) && u(l, a);
					});
			},
			onCollideUpdate(i, u) {
				if (typeof i == "function" && u === void 0)
					return this.on("collideUpdate", i);
				if (typeof i == "string")
					return this.on(
						"collideUpdate",
						(l, a) => l.is(i) && u(l, a)
					);
			},
			onCollideEnd(i, u) {
				if (typeof i == "function" && u === void 0)
					return this.on("collideEnd", i);
				if (typeof i == "string")
					return this.on("collideEnd", (l) => l.is(i) && u(l));
			},
			hasPoint(i) {
				return Fn(this.worldArea(), i);
			},
			resolveCollision(i) {
				let u = this.checkCollision(i);
				u &&
					!u.resolved &&
					((this.pos = this.pos.add(u.displacement)),
					(u.resolved = !0));
			},
			localArea() {
				return this.area.shape ? this.area.shape : this.renderArea();
			},
			worldArea() {
				let i = this.localArea();
				if (!(i instanceof Pe || i instanceof ne))
					throw new Error(
						"Only support polygon and rect shapes for now"
					);
				let u = this.transform
					.clone()
					.scale(S(this.area.scale ?? 1))
					.translate(this.area.offset);
				if (i instanceof ne) {
					let l = ut(this.anchor || Jt)
						.add(1, 1)
						.scale(-0.5)
						.scale(i.width, i.height);
					u.translate(l);
				}
				return i.transform(u);
			},
			screenArea() {
				let i = this.worldArea();
				return this.fixed ? i : i.transform(T.cam.transform);
			},
		};
	}
	o(Ts, "area");
	function et(e) {
		return {
			color: e.color,
			opacity: e.opacity,
			anchor: e.anchor,
			outline: e.outline,
			fixed: e.fixed,
			shader: e.shader,
			uniform: e.uniform,
		};
	}
	o(et, "getRenderProps");
	function Un(e, n = {}) {
		let r = null,
			i = null,
			u = new ve();
		if (!e)
			throw new Error(
				"Please pass the resource name or data to sprite()"
			);
		let l = o((a, m, f, p) => {
			let x = S(1, 1);
			return (
				f && p
					? ((x.x = f / (a.width * m.w)),
					  (x.y = p / (a.height * m.h)))
					: f
					? ((x.x = f / (a.width * m.w)), (x.y = x.x))
					: p && ((x.y = p / (a.height * m.h)), (x.x = x.y)),
				x
			);
		}, "calcTexScale");
		return {
			id: "sprite",
			width: 0,
			height: 0,
			frame: n.frame || 0,
			quad: n.quad || new Q(0, 0, 1, 1),
			animSpeed: n.animSpeed ?? 1,
			flipX: n.flipX ?? !1,
			flipY: n.flipY ?? !1,
			draw() {
				if (!r) return;
				let a = r.frames[this.frame ?? 0];
				if (!a) throw new Error(`Frame not found: ${this.frame ?? 0}`);
				if (r.slice9) {
					let { left: m, right: f, top: p, bottom: x } = r.slice9,
						D = r.tex.width * a.w,
						q = r.tex.height * a.h,
						j = this.width - m - f,
						$ = this.height - p - x,
						O = m / D,
						A = f / D,
						te = 1 - O - A,
						_ = p / q,
						H = x / q,
						F = 1 - _ - H,
						Ue = [
							ue(0, 0, O, _),
							ue(O, 0, te, _),
							ue(O + te, 0, A, _),
							ue(0, _, O, F),
							ue(O, _, te, F),
							ue(O + te, _, A, F),
							ue(0, _ + F, O, H),
							ue(O, _ + F, te, H),
							ue(O + te, _ + F, A, H),
							ue(0, 0, m, p),
							ue(m, 0, j, p),
							ue(m + j, 0, f, p),
							ue(0, p, m, $),
							ue(m, p, j, $),
							ue(m + j, p, f, $),
							ue(0, p + $, m, x),
							ue(m, p + $, j, x),
							ue(m + j, p + $, f, x),
						];
					for (let y = 0; y < 9; y++) {
						let R = Ue[y],
							P = Ue[y + 9];
						Ie(
							Object.assign(et(this), {
								pos: P.pos(),
								tex: r.tex,
								quad: a.scale(R),
								flipX: this.flipX,
								flipY: this.flipY,
								tiled: n.tiled,
								width: P.w,
								height: P.h,
							})
						);
					}
				} else
					Ie(
						Object.assign(et(this), {
							tex: r.tex,
							quad: a,
							flipX: this.flipX,
							flipY: this.flipY,
							tiled: n.tiled,
							width: this.width,
							height: this.height,
						})
					);
			},
			add() {
				let a = o((f) => {
						let p = f.frames[0].clone();
						n.quad && (p = p.scale(n.quad));
						let x = l(f.tex, p, n.width, n.height);
						(this.width = f.tex.width * p.w * x.x),
							(this.height = f.tex.height * p.h * x.y),
							n.anim && this.play(n.anim),
							(r = f),
							u.trigger(r);
					}, "setSpriteData"),
					m = ht(e);
				m ? m.onLoad(a) : En(() => a(ht(e).data));
			},
			update() {
				if (!i) return;
				let a = r.anims[i.name];
				if (typeof a == "number") {
					this.frame = a;
					return;
				}
				if (a.speed === 0)
					throw new Error("Sprite anim speed cannot be 0");
				(i.timer += Te() * this.animSpeed),
					i.timer >= 1 / i.speed &&
						((i.timer = 0),
						a.from > a.to
							? (this.frame--,
							  this.frame < a.to &&
									(i.loop
										? (this.frame = a.from)
										: (this.frame++,
										  i.onEnd(),
										  this.stop())))
							: (this.frame++,
							  this.frame > a.to &&
									(i.loop
										? (this.frame = a.from)
										: (this.frame--,
										  i.onEnd(),
										  this.stop()))));
			},
			play(a, m = {}) {
				if (!r) {
					u.add(() => this.play(a, m));
					return;
				}
				let f = r.anims[a];
				if (f === void 0) throw new Error(`Anim not found: ${a}`);
				i && this.stop(),
					(i =
						typeof f == "number"
							? {
									name: a,
									timer: 0,
									loop: !1,
									pingpong: !1,
									speed: 0,
									onEnd: () => {},
							  }
							: {
									name: a,
									timer: 0,
									loop: m.loop ?? f.loop ?? !1,
									pingpong: m.pingpong ?? f.pingpong ?? !1,
									speed: m.speed ?? f.speed ?? 10,
									onEnd: m.onEnd ?? (() => {}),
							  }),
					(this.frame = typeof f == "number" ? f : f.from),
					this.trigger("animStart", a);
			},
			stop() {
				if (!i) return;
				let a = i.name;
				(i = null), this.trigger("animEnd", a);
			},
			numFrames() {
				return r?.frames.length ?? 0;
			},
			curAnim() {
				return i?.name;
			},
			onAnimEnd(a) {
				return this.on("animEnd", a);
			},
			onAnimStart(a) {
				return this.on("animStart", a);
			},
			renderArea() {
				return new ne(S(0), this.width, this.height);
			},
			inspect() {
				if (typeof e == "string") return `"${e}"`;
			},
		};
	}
	o(Un, "sprite");
	function As(e, n = {}) {
		function r(i) {
			let u = $e(
				Object.assign(et(i), {
					text: i.text + "",
					size: i.textSize,
					font: i.font,
					width: n.width && i.width,
					align: i.align,
					letterSpacing: i.letterSpacing,
					lineSpacing: i.lineSpacing,
					transform: i.textTransform,
					styles: i.textStyles,
				})
			);
			return (
				n.width || (i.width = u.width / (i.scale?.x || 1)),
				(i.height = u.height / (i.scale?.y || 1)),
				u
			);
		}
		return (
			o(r, "update"),
			{
				id: "text",
				text: e,
				textSize: n.size ?? Oi,
				font: n.font,
				width: n.width,
				height: 0,
				align: n.align,
				lineSpacing: n.lineSpacing,
				letterSpacing: n.letterSpacing,
				textTransform: n.transform,
				textStyles: n.styles,
				add() {
					En(() => r(this));
				},
				draw() {
					ze(r(this));
				},
				renderArea() {
					return new ne(S(0), this.width, this.height);
				},
			}
		);
	}
	o(As, "text");
	function Os(e, n, r = {}) {
		return {
			id: "rect",
			width: e,
			height: n,
			radius: r.radius || 0,
			draw() {
				Ce(
					Object.assign(et(this), {
						width: this.width,
						height: this.height,
						radius: this.radius,
					})
				);
			},
			renderArea() {
				return new ne(S(0), this.width, this.height);
			},
			inspect() {
				return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
			},
		};
	}
	o(Os, "rect");
	function Ps(e, n) {
		return {
			id: "rect",
			width: e,
			height: n,
			draw() {
				Oe(
					Object.assign(et(this), {
						width: this.width,
						height: this.height,
					})
				);
			},
			renderArea() {
				return new ne(S(0), this.width, this.height);
			},
			inspect() {
				return `${Math.ceil(this.width)}, ${Math.ceil(this.height)}`;
			},
		};
	}
	o(Ps, "uvquad");
	function Rs(e) {
		return {
			id: "circle",
			radius: e,
			draw() {
				Qe(Object.assign(et(this), { radius: this.radius }));
			},
			renderArea() {
				return new ne(
					new v(this.anchor ? 0 : -this.radius),
					this.radius * 2,
					this.radius * 2
				);
			},
			inspect() {
				return `${Math.ceil(this.radius)}`;
			},
		};
	}
	o(Rs, "circle");
	function Ms(e = 1, n = W(0, 0, 0)) {
		return { id: "outline", outline: { width: e, color: n } };
	}
	o(Ms, "outline");
	function nr() {
		return {
			id: "timer",
			wait(e, n) {
				let r = [n],
					i = 0,
					u = this.onUpdate(() => {
						(i += Te()),
							i >= e && (r.forEach((l) => l()), u.cancel());
					});
				return {
					get paused() {
						return u.paused;
					},
					set paused(l) {
						u.paused = l;
					},
					cancel: u.cancel,
					onEnd(l) {
						r.push(l);
					},
					then(l) {
						return this.onEnd(l), this;
					},
				};
			},
			loop(e, n) {
				let r = null,
					i = o(() => {
						(r = this.wait(e, i)), n();
					}, "newAction");
				return (
					(r = gt(0, i)),
					{
						get paused() {
							return r.paused;
						},
						set paused(u) {
							r.paused = u;
						},
						cancel: () => r.cancel(),
					}
				);
			},
			tween(e, n, r, i, u = ot.linear) {
				let l = 0,
					a = [],
					m = this.onUpdate(() => {
						l += Te();
						let f = Math.min(l / r, 1);
						i(Me(e, n, u(f))),
							f === 1 &&
								(m.cancel(), i(n), a.forEach((p) => p()));
					});
				return {
					get paused() {
						return m.paused;
					},
					set paused(f) {
						m.paused = f;
					},
					onEnd(f) {
						a.push(f);
					},
					then(f) {
						return this.onEnd(f), this;
					},
					cancel() {
						m.cancel();
					},
					finish() {
						m.cancel(), i(n), a.forEach((f) => f());
					},
				};
			},
		};
	}
	o(nr, "timer");
	let Ds = 640,
		Gs = 65536;
	function Fs(e = {}) {
		let n = S(0),
			r = null,
			i = null,
			u = !1;
		return {
			id: "body",
			require: ["pos", "area"],
			jumpForce: e.jumpForce ?? Ds,
			gravityScale: e.gravityScale ?? 1,
			isStatic: e.isStatic ?? !1,
			mass: e.mass ?? 1,
			add() {
				if (this.mass === 0)
					throw new Error("Can't set body mass to 0");
				this.onCollideUpdate((l, a) => {
					if (
						l.is("body") &&
						!a.resolved &&
						(this.trigger("beforePhysicsResolve", a),
						l.trigger("beforePhysicsResolve", a.reverse()),
						!a.resolved && !(this.isStatic && l.isStatic))
					) {
						if (!this.isStatic && !l.isStatic) {
							let m = this.mass + l.mass;
							(this.pos = this.pos.add(
								a.displacement.scale(l.mass / m)
							)),
								(l.pos = l.pos.add(
									a.displacement.scale(-this.mass / m)
								)),
								(this.transform = Vt(this)),
								(l.transform = Vt(l));
						} else {
							let m =
								!this.isStatic && l.isStatic ? a : a.reverse();
							(m.source.pos = m.source.pos.add(m.displacement)),
								(m.source.transform = Vt(m.source));
						}
						(a.resolved = !0),
							this.trigger("physicsResolve", a),
							l.trigger("physicsResolve", a.reverse());
					}
				}),
					this.onPhysicsResolve((l) => {
						T.gravity &&
							(l.isBottom() && this.isFalling()
								? ((n.y = 0),
								  (r = l.target),
								  (i = l.target.pos),
								  u ? (u = !1) : this.trigger("ground", r))
								: l.isTop() &&
								  this.isJumping() &&
								  ((n.y = 0),
								  this.trigger("headbutt", l.target)));
					});
			},
			update() {
				if (!T.gravity || this.isStatic) return;
				if (
					(u &&
						((r = null),
						(i = null),
						this.trigger("fallOff"),
						(u = !1)),
					r)
				)
					if (!this.isOverlapping(r) || !r.exists() || !r.is("body"))
						u = !0;
					else {
						!r.pos.eq(i) &&
							e.stickToPlatform !== !1 &&
							this.moveBy(r.pos.sub(i)),
							(i = r.pos);
						return;
					}
				let l = n.y;
				(n.y += T.gravity * this.gravityScale * Te()),
					(n.y = Math.min(n.y, e.maxVelocity ?? Gs)),
					l < 0 && n.y >= 0 && this.trigger("fall"),
					this.move(n);
			},
			onPhysicsResolve(l) {
				return this.on("physicsResolve", l);
			},
			onBeforePhysicsResolve(l) {
				return this.on("beforePhysicsResolve", l);
			},
			curPlatform() {
				return r;
			},
			isGrounded() {
				return r !== null;
			},
			isFalling() {
				return n.y > 0;
			},
			isJumping() {
				return n.y < 0;
			},
			jump(l) {
				(r = null), (i = null), (n.y = -l || -this.jumpForce);
			},
			onGround(l) {
				return this.on("ground", l);
			},
			onFall(l) {
				return this.on("fall", l);
			},
			onFallOff(l) {
				return this.on("fallOff", l);
			},
			onHeadbutt(l) {
				return this.on("headbutt", l);
			},
		};
	}
	o(Fs, "body");
	function Bs(e = 2) {
		let n = e;
		return {
			id: "doubleJump",
			require: ["body"],
			numJumps: e,
			add() {
				this.onGround(() => {
					n = this.numJumps;
				});
			},
			doubleJump(r) {
				n <= 0 ||
					(n < this.numJumps && this.trigger("doubleJump"),
					n--,
					this.jump(r));
			},
			onDoubleJump(r) {
				return this.on("doubleJump", r);
			},
			inspect() {
				return `${n}`;
			},
		};
	}
	o(Bs, "doubleJump");
	function Ls(e, n) {
		return {
			id: "shader",
			shader: e,
			...(typeof n == "function"
				? {
						uniform: n(),
						update() {
							this.uniform = n();
						},
				  }
				: { uniform: n }),
		};
	}
	o(Ls, "shader");
	function Is() {
		return { id: "fixed", fixed: !0 };
	}
	o(Is, "fixed");
	function rr(e) {
		return { id: "stay", stay: !0, scenesToStay: e };
	}
	o(rr, "stay");
	function Vs(e) {
		if (e == null)
			throw new Error("health() requires the initial amount of hp");
		return {
			id: "health",
			hurt(n = 1) {
				this.setHP(e - n), this.trigger("hurt", n);
			},
			heal(n = 1) {
				this.setHP(e + n), this.trigger("heal", n);
			},
			hp() {
				return e;
			},
			setHP(n) {
				(e = n), e <= 0 && this.trigger("death");
			},
			onHurt(n) {
				return this.on("hurt", n);
			},
			onHeal(n) {
				return this.on("heal", n);
			},
			onDeath(n) {
				return this.on("death", n);
			},
			inspect() {
				return `${e}`;
			},
		};
	}
	o(Vs, "health");
	function js(e, n = {}) {
		if (e == null) throw new Error("lifespan() requires time");
		let r = n.fade ?? 0;
		return {
			id: "lifespan",
			async add() {
				await gt(e),
					r > 0 &&
						this.opacity &&
						(await Cn(
							this.opacity,
							0,
							r,
							(i) => (this.opacity = i),
							ot.linear
						)),
					this.destroy();
			},
		};
	}
	o(js, "lifespan");
	function Ns(e, n, r) {
		if (!e) throw new Error("state() requires an initial state");
		let i = {};
		function u(f) {
			i[f] ||
				(i[f] = {
					enter: new ve(),
					end: new ve(),
					update: new ve(),
					draw: new ve(),
				});
		}
		o(u, "initStateEvents");
		function l(f, p, x) {
			return u(p), i[p][f].add(x);
		}
		o(l, "on");
		function a(f, p, ...x) {
			u(p), i[p][f].trigger(...x);
		}
		o(a, "trigger");
		let m = !1;
		return {
			id: "state",
			state: e,
			enterState(f, ...p) {
				if (((m = !0), n && !n.includes(f)))
					throw new Error(`State not found: ${f}`);
				let x = this.state;
				if (r) {
					if (!r?.[x]) return;
					let D = typeof r[x] == "string" ? [r[x]] : r[x];
					if (!D.includes(f))
						throw new Error(
							`Cannot transition state from "${x}" to "${f}". Available transitions: ${D.map(
								(q) => `"${q}"`
							).join(", ")}`
						);
				}
				a("end", x, ...p),
					(this.state = f),
					a("enter", f, ...p),
					a("enter", `${x} -> ${f}`, ...p);
			},
			onStateTransition(f, p, x) {
				return l("enter", `${f} -> ${p}`, x);
			},
			onStateEnter(f, p) {
				return l("enter", f, p);
			},
			onStateUpdate(f, p) {
				return l("update", f, p);
			},
			onStateDraw(f, p) {
				return l("draw", f, p);
			},
			onStateEnd(f, p) {
				return l("end", f, p);
			},
			update() {
				m || (a("enter", e), (m = !0)), a("update", this.state);
			},
			draw() {
				a("draw", this.state);
			},
			inspect() {
				return this.state;
			},
		};
	}
	o(Ns, "state");
	function ks(e = 1) {
		let n = 0,
			r = !1;
		return {
			require: ["opacity"],
			add() {
				this.opacity = 0;
			},
			update() {
				r ||
					((n += Te()),
					(this.opacity = $t(n, 0, e, 0, 1)),
					n >= e && ((this.opacity = 1), (r = !0)));
			},
		};
	}
	o(ks, "fadeIn");
	function En(e) {
		B.loaded ? e() : T.events.on("load", e);
	}
	o(En, "onLoad");
	function _s(e, n) {
		T.scenes[e] = n;
	}
	o(_s, "scene");
	function Hs(e, ...n) {
		if (!T.scenes[e]) throw new Error(`Scene not found: ${e}`);
		T.events.onOnce("frameEnd", () => {
			T.events.trigger("sceneLeave", e),
				U.events.clear(),
				T.events.clear(),
				T.objEvents.clear(),
				[...T.root.children].forEach((r) => {
					(!r.stay ||
						(r.scenesToStay && !r.scenesToStay.includes(e))) &&
						T.root.remove(r);
				}),
				T.root.clearEvents(),
				(T.cam = {
					pos: null,
					scale: S(1),
					angle: 0,
					shake: 0,
					transform: new J(),
				}),
				T.scenes[e](...n),
				s.debug !== !1 && er(),
				s.burp && tr();
		});
	}
	o(Hs, "go");
	function qs(e) {
		return T.events.on("sceneLeave", e);
	}
	o(qs, "onSceneLeave");
	function $s(e, n) {
		try {
			return JSON.parse(window.localStorage[e]);
		} catch {
			return n ? (sr(e, n), n) : null;
		}
	}
	o($s, "getData");
	function sr(e, n) {
		window.localStorage[e] = JSON.stringify(n);
	}
	o(sr, "setData");
	function ir(e) {
		let n = e(tt);
		for (let r in n) (tt[r] = n[r]), s.global !== !1 && (window[r] = n[r]);
		return tt;
	}
	o(ir, "plug");
	function _t() {
		return S(we() / 2, ye() / 2);
	}
	o(_t, "center");
	let zs;
	((A) => (
		(A[(A.None = 0)] = "None"),
		(A[(A.Left = 1)] = "Left"),
		(A[(A.Top = 2)] = "Top"),
		(A[(A.LeftTop = 3)] = "LeftTop"),
		(A[(A.Right = 4)] = "Right"),
		(A[(A.Horizontal = 5)] = "Horizontal"),
		(A[(A.RightTop = 6)] = "RightTop"),
		(A[(A.HorizontalTop = 7)] = "HorizontalTop"),
		(A[(A.Bottom = 8)] = "Bottom"),
		(A[(A.LeftBottom = 9)] = "LeftBottom"),
		(A[(A.Vertical = 10)] = "Vertical"),
		(A[(A.LeftVertical = 11)] = "LeftVertical"),
		(A[(A.RightBottom = 12)] = "RightBottom"),
		(A[(A.HorizontalBottom = 13)] = "HorizontalBottom"),
		(A[(A.RightVertical = 14)] = "RightVertical"),
		(A[(A.All = 15)] = "All")
	))((zs ||= {}));
	function or(e = {}) {
		let n = S(0),
			r = e.isObstacle ?? !1,
			i = e.cost ?? 0,
			u = e.edges ?? [],
			l = o(() => {
				let m = { left: 1, top: 2, right: 4, bottom: 8 };
				return u.map((f) => m[f] || 0).reduce((f, p) => f | p, 0);
			}, "getEdgeMask"),
			a = l();
		return {
			id: "tile",
			tilePosOffset: e.offset ?? S(0),
			set tilePos(m) {
				let f = this.getLevel();
				(n = m.clone()),
					(this.pos = S(
						this.tilePos.x * f.tileWidth(),
						this.tilePos.y * f.tileHeight()
					).add(this.tilePosOffset));
			},
			get tilePos() {
				return n;
			},
			set isObstacle(m) {
				r !== m && ((r = m), this.getLevel().invalidateNavigationMap());
			},
			get isObstacle() {
				return r;
			},
			set cost(m) {
				i !== m && ((i = m), this.getLevel().invalidateNavigationMap());
			},
			get cost() {
				return i;
			},
			set edges(m) {
				(u = m), (a = l()), this.getLevel().invalidateNavigationMap();
			},
			get edges() {
				return u;
			},
			get edgeMask() {
				return a;
			},
			getLevel() {
				return this.parent;
			},
			moveLeft() {
				this.tilePos = this.tilePos.add(S(-1, 0));
			},
			moveRight() {
				this.tilePos = this.tilePos.add(S(1, 0));
			},
			moveUp() {
				this.tilePos = this.tilePos.add(S(0, -1));
			},
			moveDown() {
				this.tilePos = this.tilePos.add(S(0, 1));
			},
		};
	}
	o(or, "tile");
	function Ks(e, n) {
		if (!n.tileWidth || !n.tileHeight)
			throw new Error("Must provide tileWidth and tileHeight.");
		let r = bt([Nt(n.pos ?? S(0))]),
			i = e.length,
			u = 0,
			l = null,
			a = null,
			m = null,
			f = null,
			p = o((y) => y.x + y.y * u, "tile2Hash"),
			x = o((y) => S(Math.floor(y % u), Math.floor(y / u)), "hash2Tile"),
			D = o(() => {
				l = [];
				for (let y of r.children) q(y);
			}, "createSpatialMap"),
			q = o((y) => {
				let R = p(y.tilePos);
				l[R] ? l[R].push(y) : (l[R] = [y]);
			}, "insertIntoSpatialMap"),
			j = o((y) => {
				let R = p(y.tilePos);
				if (l[R]) {
					let P = l[R].indexOf(y);
					P >= 0 && l[R].splice(P, 1);
				}
			}, "removeFromSpatialMap"),
			$ = o(() => {
				let y = !1;
				for (let R of r.children) {
					let P = r.pos2Tile(R.pos);
					(R.tilePos.x != P.x || R.tilePos.y != P.y) &&
						((y = !0),
						j(R),
						(R.tilePos.x = P.x),
						(R.tilePos.y = P.y),
						q(R));
				}
				y && r.trigger("spatial_map_changed");
			}, "updateSpatialMap"),
			O = o(() => {
				let y = r.getSpatialMap(),
					R = r.numRows() * r.numColumns();
				a ? (a.length = R) : (a = new Array(R)), a.fill(1, 0, R);
				for (let P = 0; P < y.length; P++) {
					let G = y[P];
					if (G) {
						let N = 0;
						for (let Y of G)
							if (Y.isObstacle) {
								N = 1 / 0;
								break;
							} else N += Y.cost;
						a[P] = N || 1;
					}
				}
			}, "createCostMap"),
			A = o(() => {
				let y = r.getSpatialMap(),
					R = r.numRows() * r.numColumns();
				m ? (m.length = R) : (m = new Array(R)), m.fill(15, 0, R);
				for (let P = 0; P < y.length; P++) {
					let G = y[P];
					if (G) {
						let N = G.length,
							Y = 15;
						for (let oe = 0; oe < N; oe++) Y |= G[oe].edgeMask;
						m[P] = Y;
					}
				}
			}, "createEdgeMap"),
			te = o(() => {
				let y = r.numRows() * r.numColumns(),
					R = o((G, N) => {
						let Y = [];
						for (Y.push(G); Y.length > 0; ) {
							let oe = Y.pop();
							F(oe).forEach((me) => {
								f[me] < 0 && ((f[me] = N), Y.push(me));
							});
						}
					}, "traverse");
				f ? (f.length = y) : (f = new Array(y)), f.fill(-1, 0, y);
				let P = 0;
				for (let G = 0; G < a.length; G++) {
					if (f[G] >= 0) {
						P++;
						continue;
					}
					R(G, P), P++;
				}
			}, "createConnectivityMap"),
			_ = o((y, R) => a[R], "getCost"),
			H = o((y, R) => {
				let P = x(y),
					G = x(R);
				return P.dist(G);
			}, "getHeuristic"),
			F = o((y, R) => {
				let P = [],
					G = Math.floor(y % u),
					N = G > 0 && m[y] & 1 && a[y - 1] !== 1 / 0,
					Y = y >= u && m[y] & 2 && a[y - u] !== 1 / 0,
					oe = G < u - 1 && m[y] & 4 && a[y + 1] !== 1 / 0,
					me = y < u * i - u - 1 && m[y] & 8 && a[y + u] !== 1 / 0;
				return (
					R
						? (N &&
								(Y && P.push(y - u - 1),
								P.push(y - 1),
								me && P.push(y + u - 1)),
						  Y && P.push(y - u),
						  oe &&
								(Y && P.push(y - u + 1),
								P.push(y + 1),
								me && P.push(y + u + 1)),
						  me && P.push(y + u))
						: (N && P.push(y - 1),
						  Y && P.push(y - u),
						  oe && P.push(y + 1),
						  me && P.push(y + u)),
					P
				);
			}, "getNeighbours"),
			Ue = {
				id: "level",
				tileWidth() {
					return n.tileWidth;
				},
				tileHeight() {
					return n.tileHeight;
				},
				spawn(y, ...R) {
					let P = S(...R),
						G = (() => {
							if (typeof y == "string") {
								if (n.tiles[y]) {
									if (typeof n.tiles[y] != "function")
										throw new Error(
											"Level symbol def must be a function returning a component list"
										);
									return n.tiles[y](P);
								} else if (n.wildcardTile)
									return n.wildcardTile(y, P);
							} else {
								if (Array.isArray(y)) return y;
								throw new Error(
									"Expected a symbol or a component list"
								);
							}
						})();
					if (!G) return null;
					let N = !1,
						Y = !1;
					for (let me of G)
						me.id === "tile" && (Y = !0),
							me.id === "pos" && (N = !0);
					N || G.push(Nt()), Y || G.push(or());
					let oe = r.add(G);
					return (
						N && (oe.tilePosOffset = oe.pos.clone()),
						(oe.tilePos = P),
						l &&
							(q(oe),
							this.trigger("spatial_map_changed"),
							this.trigger("navigation_map_invalid")),
						oe
					);
				},
				numColumns() {
					return u;
				},
				numRows() {
					return i;
				},
				levelWidth() {
					return u * this.tileWidth();
				},
				levelHeight() {
					return i * this.tileHeight();
				},
				tile2Pos(...y) {
					return S(...y).scale(this.tileWidth(), this.tileHeight());
				},
				pos2Tile(...y) {
					let R = S(...y);
					return S(
						Math.floor(R.x / this.tileWidth()),
						Math.floor(R.y / this.tileHeight())
					);
				},
				getSpatialMap() {
					return l || D(), l;
				},
				onSpatialMapChanged(y) {
					return this.on("spatial_map_changed", y);
				},
				onNavigationMapInvalid(y) {
					return this.on("navigation_map_invalid", y);
				},
				getAt(y) {
					l || D();
					let R = p(y);
					return l[R] || [];
				},
				update() {
					l && $();
				},
				invalidateNavigationMap() {
					(a = null), (m = null), (f = null);
				},
				onNavigationMapChanged(y) {
					return this.on("navigation_map_changed", y);
				},
				getTilePath(y, R, P = {}) {
					if (
						(a || O(),
						m || A(),
						f || te(),
						y.x < 0 ||
							y.x >= u ||
							y.y < 0 ||
							y.y >= i ||
							R.x < 0 ||
							R.x >= u ||
							R.y < 0 ||
							R.y >= i)
					)
						return null;
					let G = p(y),
						N = p(R);
					if (a[N] === 1 / 0) return null;
					if (G === N) return [];
					if (f[G] != -1 && f[G] !== f[N]) return null;
					let Y = new Ut((Le, An) => Le.cost < An.cost);
					Y.insert({ cost: 0, node: G });
					let oe = new Map();
					oe.set(G, G);
					let me = new Map();
					for (me.set(G, 0); Y.length !== 0; ) {
						let Le = Y.remove()?.node;
						if (Le === N) break;
						let An = F(Le, P.allowDiagonals);
						for (let Ke of An) {
							let On = (me.get(Le) || 0) + _(Le, Ke) + H(Ke, N);
							(!me.has(Ke) || On < me.get(Ke)) &&
								(me.set(Ke, On),
								Y.insert({ cost: On, node: Ke }),
								oe.set(Ke, Le));
						}
					}
					let Tn = [],
						vt = N,
						di = x(vt);
					for (Tn.push(di); vt !== G; ) {
						vt = oe.get(vt);
						let Le = x(vt);
						Tn.push(Le);
					}
					return Tn.reverse();
				},
				getPath(y, R, P = {}) {
					let G = this.tileWidth(),
						N = this.tileHeight(),
						Y = this.getTilePath(
							this.pos2Tile(y),
							this.pos2Tile(R),
							P
						);
					return Y
						? [
								y,
								...Y.slice(1, -1).map((oe) =>
									oe.scale(G, N).add(G / 2, N / 2)
								),
								R,
						  ]
						: null;
				},
			};
		return (
			r.use(Ue),
			r.onNavigationMapInvalid(() => {
				r.invalidateNavigationMap(),
					r.trigger("navigation_map_changed");
			}),
			e.forEach((y, R) => {
				let P = y.split("");
				(u = Math.max(P.length, u)),
					P.forEach((G, N) => {
						r.spawn(G, S(N, R));
					});
			}),
			r
		);
	}
	o(Ks, "addLevel");
	function Ys(e = {}) {
		let n = null,
			r = null,
			i = null,
			u = null;
		return {
			id: "agent",
			require: ["pos", "tile"],
			agentSpeed: e.speed ?? 100,
			allowDiagonals: e.allowDiagonals ?? !0,
			getDistanceToTarget() {
				return n ? this.pos.dist(n) : 0;
			},
			getNextLocation() {
				return r && i ? r[i] : null;
			},
			getPath() {
				return r ? r.slice() : null;
			},
			getTarget() {
				return n;
			},
			isNavigationFinished() {
				return r ? i === null : !0;
			},
			isTargetReachable() {
				return r !== null;
			},
			isTargetReached() {
				return n ? this.pos.eq(n) : !0;
			},
			setTarget(l) {
				(n = l),
					(r = this.getLevel().getPath(this.pos, n, {
						allowDiagonals: this.allowDiagonals,
					})),
					(i = r ? 0 : null),
					r
						? (u ||
								((u = this.getLevel().onNavigationMapChanged(
									() => {
										r &&
											i !== null &&
											((r = this.getLevel().getPath(
												this.pos,
												n,
												{
													allowDiagonals:
														this.allowDiagonals,
												}
											)),
											(i = r ? 0 : null),
											r
												? this.trigger(
														"navigation-next",
														this,
														r[i]
												  )
												: this.trigger(
														"navigation-ended",
														this
												  ));
									}
								)),
								this.onDestroy(() => u.cancel())),
						  this.trigger("navigation-started", this),
						  this.trigger("navigation-next", this, r[i]))
						: this.trigger("navigation-ended", this);
			},
			update() {
				if (r && i !== null) {
					if (this.pos.sdist(r[i]) < 2)
						if (i === r.length - 1) {
							(this.pos = n.clone()),
								(i = null),
								this.trigger("navigation-ended", this),
								this.trigger("target-reached", this);
							return;
						} else i++, this.trigger("navigation-next", this, r[i]);
					this.moveTo(r[i], this.agentSpeed);
				}
			},
			onNavigationStarted(l) {
				return this.on("navigation-started", l);
			},
			onNavigationNext(l) {
				return this.on("navigation-next", l);
			},
			onNavigationEnded(l) {
				return this.on("navigation-ended", l);
			},
			onTargetReached(l) {
				return this.on("target-reached", l);
			},
			inspect() {
				return JSON.stringify({
					target: JSON.stringify(n),
					path: JSON.stringify(r),
				});
			},
		};
	}
	o(Ys, "agent");
	function Xs(e) {
		let n = U.canvas().captureStream(e),
			r = he.ctx.createMediaStreamDestination();
		he.masterNode.connect(r);
		let i = new MediaRecorder(n),
			u = [];
		return (
			(i.ondataavailable = (l) => {
				l.data.size > 0 && u.push(l.data);
			}),
			(i.onerror = () => {
				he.masterNode.disconnect(r),
					n.getTracks().forEach((l) => l.stop());
			}),
			i.start(),
			{
				resume() {
					i.resume();
				},
				pause() {
					i.pause();
				},
				stop() {
					return (
						i.stop(),
						he.masterNode.disconnect(r),
						n.getTracks().forEach((l) => l.stop()),
						new Promise((l) => {
							i.onstop = () => {
								l(new Blob(u, { type: "video/mp4" }));
							};
						})
					);
				},
				download(l = "kaboom.mp4") {
					this.stop().then((a) => In(l, a));
				},
			}
		);
	}
	o(Xs, "record");
	function Ws() {
		return document.activeElement === U.canvas();
	}
	o(Ws, "isFocused");
	function Js(e) {
		e.destroy();
	}
	o(Js, "destroy");
	let bt = T.root.add.bind(T.root),
		Qs = T.root.readd.bind(T.root),
		Zs = T.root.removeAll.bind(T.root),
		ar = T.root.get.bind(T.root);
	function ur(e = 2, n = 1) {
		let r = 0;
		return {
			id: "boom",
			require: ["scale"],
			update() {
				let i = Math.sin(r * e) * n;
				i < 0 && this.destroy(), (this.scale = S(i)), (r += Te());
			},
		};
	}
	o(ur, "boom");
	let ei = He(null, Gr),
		ti = He(null, Fr);
	function ni(e, n = {}) {
		let r = bt([Nt(e), rr()]),
			i = (n.speed || 1) * 5,
			u = n.scale || 1;
		r.add([Un(ti), kt(0), xn("center"), ur(i, u), ...(n.comps ?? [])]);
		let l = r.add([Un(ei), kt(0), xn("center"), nr(), ...(n.comps ?? [])]);
		return (
			l.wait(0.4 / i, () => l.use(ur(i, u))),
			l.onDestroy(() => r.destroy()),
			r
		);
	}
	o(ni, "addKaboom");
	function cr() {
		T.root.update();
	}
	o(cr, "updateFrame");
	class Ht {
		source;
		target;
		displacement;
		resolved = !1;
		constructor(n, r, i, u = !1) {
			(this.source = n),
				(this.target = r),
				(this.displacement = i),
				(this.resolved = u);
		}
		reverse() {
			return new Ht(
				this.target,
				this.source,
				this.displacement.scale(-1),
				this.resolved
			);
		}
		hasOverlap() {
			return !this.displacement.isZero();
		}
		isLeft() {
			return this.displacement.x > 0;
		}
		isRight() {
			return this.displacement.x < 0;
		}
		isTop() {
			return this.displacement.y > 0;
		}
		isBottom() {
			return this.displacement.y < 0;
		}
		preventResolution() {
			this.resolved = !0;
		}
	}
	o(Ht, "Collision");
	function ri() {
		let e = {},
			n = s.hashGridSize || Pi,
			r = new J(),
			i = [];
		function u(l) {
			if (
				(i.push(r.clone()),
				l.pos && r.translate(l.pos),
				l.scale && r.scale(l.scale),
				l.angle && r.rotate(l.angle),
				(l.transform = r.clone()),
				l.c("area") && !l.paused)
			) {
				let a = l,
					f = a.worldArea().bbox(),
					p = Math.floor(f.pos.x / n),
					x = Math.floor(f.pos.y / n),
					D = Math.ceil((f.pos.x + f.width) / n),
					q = Math.ceil((f.pos.y + f.height) / n),
					j = new Set();
				for (let $ = p; $ <= D; $++)
					for (let O = x; O <= q; O++)
						if (!e[$]) (e[$] = {}), (e[$][O] = [a]);
						else if (!e[$][O]) e[$][O] = [a];
						else {
							let A = e[$][O];
							e: for (let te of A) {
								if (!te.exists() || j.has(te.id)) continue;
								for (let H of a.collisionIgnore)
									if (te.is(H)) continue e;
								for (let H of te.collisionIgnore)
									if (a.is(H)) continue e;
								let _ = Er(a.worldArea(), te.worldArea());
								if (_) {
									let H = new Ht(a, te, _);
									a.trigger("collideUpdate", te, H);
									let F = H.reverse();
									(F.resolved = H.resolved),
										te.trigger("collideUpdate", a, F);
								}
								j.add(te.id);
							}
							A.push(a);
						}
			}
			l.children.forEach(u), (r = i.pop());
		}
		o(u, "checkObj"), u(T.root);
	}
	o(ri, "checkFrame");
	function si() {
		let e = T.cam,
			n = v.fromAngle(xt(0, 360)).scale(e.shake);
		(e.shake = Me(e.shake, 0, 5 * Te())),
			(e.transform = new J()
				.translate(_t())
				.scale(e.scale)
				.rotate(e.angle)
				.translate((e.pos ?? _t()).scale(-1).add(n))),
			T.root.draw(),
			fe();
	}
	o(si, "drawFrame");
	function ii() {
		let e = Fe();
		T.events.numListeners("loading") > 0
			? T.events.trigger("loading", e)
			: Ve(() => {
					let n = we() / 2,
						r = 24,
						i = S(we() / 2, ye() / 2).sub(S(n / 2, r / 2));
					Ce({
						pos: S(0),
						width: we(),
						height: ye(),
						color: W(0, 0, 0),
					}),
						Ce({
							pos: i,
							width: n,
							height: r,
							fill: !1,
							outline: { width: 4 },
						}),
						Ce({ pos: i, width: n * e, height: r });
			  });
	}
	o(ii, "drawLoadScreen");
	function lr(e, n) {
		Ve(() => {
			let r = S(8);
			re(), b(e);
			let i = $e({
					text: n,
					font: Qt,
					size: 16,
					pos: r,
					color: W(255, 255, 255),
					fixed: !0,
				}),
				u = i.width + r.x * 2,
				l = i.height + r.x * 2;
			e.x + u >= we() && b(S(-u, 0)),
				e.y + l >= ye() && b(S(0, -l)),
				Ce({
					width: u,
					height: l,
					color: W(0, 0, 0),
					radius: 4,
					opacity: 0.8,
					fixed: !0,
				}),
				ze(i),
				V();
		});
	}
	o(lr, "drawInspectText");
	function oi() {
		if (se.inspect) {
			let e = null;
			for (let n of T.root.get("*", { recursive: !0 }))
				if (n.c("area") && n.isHovering()) {
					e = n;
					break;
				}
			if ((T.root.drawInspect(), e)) {
				let n = [],
					r = e.inspect();
				for (let i in r)
					r[i] ? n.push(`${i}: ${r[i]}`) : n.push(`${i}`);
				lr(
					es(It()),
					n.join(`
`)
				);
			}
			lr(S(8), `FPS: ${se.fps()}`);
		}
		se.paused &&
			Ve(() => {
				re(), b(we(), 0), b(-8, 8);
				let e = 32;
				Ce({
					width: e,
					height: e,
					anchor: "topright",
					color: W(0, 0, 0),
					opacity: 0.8,
					radius: 4,
					fixed: !0,
				});
				for (let n = 1; n <= 2; n++)
					Ce({
						width: 4,
						height: e * 0.6,
						anchor: "center",
						pos: S((-e / 3) * n, e * 0.5),
						color: W(255, 255, 255),
						radius: 2,
						fixed: !0,
					});
				V();
			}),
			se.timeScale !== 1 &&
				Ve(() => {
					re(), b(we(), ye()), b(-8, -8);
					let e = 8,
						n = $e({
							text: se.timeScale.toFixed(1),
							font: Qt,
							size: 16,
							color: W(255, 255, 255),
							pos: S(-e),
							anchor: "botright",
							fixed: !0,
						});
					Ce({
						width: n.width + e * 2 + e * 4,
						height: n.height + e * 2,
						anchor: "botright",
						color: W(0, 0, 0),
						opacity: 0.8,
						radius: 4,
						fixed: !0,
					});
					for (let r = 0; r < 2; r++) {
						let i = se.timeScale < 1;
						qn({
							p1: S(-n.width - e * (i ? 2 : 3.5), -e),
							p2: S(-n.width - e * (i ? 2 : 3.5), -e - n.height),
							p3: S(
								-n.width - e * (i ? 3.5 : 2),
								-e - n.height / 2
							),
							pos: S(-r * e * 1 + (i ? -e * 0.5 : 0), 0),
							color: W(255, 255, 255),
							fixed: !0,
						});
					}
					ze(n), V();
				}),
			se.curRecording &&
				Ve(() => {
					re(),
						b(0, ye()),
						b(24, -24),
						Qe({
							radius: 12,
							color: W(255, 0, 0),
							opacity: Mn(0, 1, U.time() * 4),
							fixed: !0,
						}),
						V();
				}),
			se.showLog &&
				T.logs.length > 0 &&
				Ve(() => {
					re(), b(0, ye()), b(8, -8);
					let e = 8,
						n = $e({
							text: T.logs.join(`
`),
							font: Qt,
							pos: S(e, -e),
							anchor: "botleft",
							size: 16,
							width: we() * 0.6,
							lineSpacing: e / 2,
							fixed: !0,
							styles: {
								time: { color: W(127, 127, 127) },
								info: { color: W(255, 255, 255) },
								error: { color: W(255, 0, 127) },
							},
						});
					Ce({
						width: n.width + e * 2,
						height: n.height + e * 2,
						anchor: "botleft",
						color: W(0, 0, 0),
						radius: 4,
						opacity: 0.8,
						fixed: !0,
					}),
						ze(n),
						V();
				});
	}
	o(oi, "drawDebug"), s.debug !== !1 && er(), s.burp && tr();
	function ai(e) {
		T.events.on("loading", e);
	}
	o(ai, "onLoading");
	function ui(e) {
		U.onResize(e);
	}
	o(ui, "onResize");
	function ci(e) {
		T.events.on("error", e);
	}
	o(ci, "onError");
	function Sn(e) {
		U.run(() => {
			Ve(() => {
				let i = we(),
					u = ye(),
					l = {
						size: 36,
						width: i - 32 * 2,
						letterSpacing: 4,
						lineSpacing: 4,
						font: Qt,
						fixed: !0,
					};
				Ce({ width: i, height: u, color: W(0, 0, 255), fixed: !0 });
				let a = $e({
					...l,
					text: e.name,
					pos: S(32),
					color: W(255, 128, 0),
					fixed: !0,
				});
				ze(a),
					Wn({
						...l,
						text: e.message,
						pos: S(32, 32 + a.height + 16),
						fixed: !0,
					}),
					V(),
					T.events.trigger("error", e);
			});
		});
	}
	o(Sn, "handleErr");
	function li(e) {
		X.push(e);
	}
	o(li, "onCleanup");
	function hi() {
		T.events.onOnce("frameEnd", () => {
			U.quit();
			for (let n in Ze) window.removeEventListener(n, Ze[n]);
			h.clear(
				h.COLOR_BUFFER_BIT | h.DEPTH_BUFFER_BIT | h.STENCIL_BUFFER_BIT
			);
			let e = h.getParameter(h.MAX_TEXTURE_IMAGE_UNITS);
			for (let n = 0; n < e; n++)
				h.activeTexture(h.TEXTURE0 + n),
					h.bindTexture(h.TEXTURE_2D, null),
					h.bindTexture(h.TEXTURE_CUBE_MAP, null);
			h.bindBuffer(h.ARRAY_BUFFER, null),
				h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, null),
				h.bindRenderbuffer(h.RENDERBUFFER, null),
				h.bindFramebuffer(h.FRAMEBUFFER, null),
				X.forEach((n) => n()),
				h.deleteBuffer(w.vbuf),
				h.deleteBuffer(w.ibuf);
		});
	}
	o(hi, "quit");
	function Cn(e, n, r, i, u = ot.linear) {
		let l = 0,
			a = [],
			m = vn(() => {
				l += Te();
				let f = Math.min(l / r, 1);
				i(Me(e, n, u(f))),
					f === 1 && (m.cancel(), i(n), a.forEach((p) => p()));
			});
		return {
			get paused() {
				return m.paused;
			},
			set paused(f) {
				m.paused = f;
			},
			onEnd(f) {
				a.push(f);
			},
			then(f) {
				return this.onEnd(f), this;
			},
			cancel() {
				m.cancel();
			},
			finish() {
				m.cancel(), i(n), a.forEach((f) => f());
			},
		};
	}
	o(Cn, "tween");
	let qt = !0;
	U.run(() => {
		Ft(),
			B.loaded ||
				(Fe() === 1 &&
					!qt &&
					((B.loaded = !0), T.events.trigger("load"))),
			(!B.loaded && s.loadingScreen !== !1) || qt
				? ii()
				: (se.paused || cr(), ri(), si(), s.debug !== !1 && oi()),
			qt && (qt = !1),
			Bt(),
			T.events.trigger("frameEnd");
	});
	function hr() {
		let e = I,
			n = h.drawingBufferWidth / e,
			r = h.drawingBufferHeight / e;
		if (U.isFullscreen()) {
			let i = window.innerWidth,
				u = window.innerHeight,
				l = i / u,
				a = n / r;
			if (l > a) {
				let m = window.innerHeight * a;
				w.viewport = { x: (i - m) / 2, y: 0, width: m, height: u };
			} else {
				let m = window.innerWidth / a;
				w.viewport = { x: 0, y: (u - m) / 2, width: i, height: m };
			}
			return;
		}
		if (s.letterbox) {
			if (!s.width || !s.height)
				throw new Error(
					"Letterboxing requires width and height defined."
				);
			let i = n / r,
				u = s.width / s.height;
			if (i > u) {
				let l = r * u,
					a = (n - l) / 2;
				w.viewport = { x: a, y: 0, width: l, height: r };
			} else {
				let l = n / u,
					a = (r - l) / 2;
				w.viewport = { x: 0, y: a, width: n, height: l };
			}
			return;
		}
		if (s.stretch && (!s.width || !s.height))
			throw new Error("Stretching requires width and height defined.");
		w.viewport = { x: 0, y: 0, width: n, height: r };
	}
	o(hr, "updateViewport"),
		U.onResize(() => {
			if (U.isFullscreen()) return;
			let e = s.width && s.height;
			(e && !s.stretch && !s.letterbox) ||
				((c.width = c.offsetWidth * I),
				(c.height = c.offsetHeight * I),
				hr(),
				e ||
					(w.frameBuffer.free(),
					(w.frameBuffer = new Ge(
						h.drawingBufferWidth,
						h.drawingBufferHeight
					)),
					(w.width = h.drawingBufferWidth / I),
					(w.height = h.drawingBufferHeight / I)));
		}),
		hr();
	let tt = {
		VERSION: Ti,
		loadRoot: en,
		loadProgress: Fe,
		loadSprite: He,
		loadSpriteAtlas: St,
		loadSound: hn,
		loadBitmapFont: on,
		loadFont: sn,
		loadShader: cn,
		loadShaderURL: ln,
		loadAseprite: un,
		loadPedit: an,
		loadBean: dn,
		loadJSON: rn,
		load: ct,
		getSprite: Tt,
		getSound: At,
		getFont: Ot,
		getBitmapFont: Pt,
		getShader: Rt,
		getAsset: fn,
		Asset: ie,
		SpriteData: le,
		SoundData: ge,
		width: we,
		height: ye,
		center: _t,
		dt: Te,
		time: U.time,
		screenshot: U.screenshot,
		record: Xs,
		isFocused: Ws,
		setCursor: U.setCursor,
		getCursor: U.getCursor,
		setCursorLocked: U.setCursorLocked,
		isCursorLocked: U.isCursorLocked,
		setFullscreen: U.setFullscreen,
		isFullscreen: U.isFullscreen,
		isTouchScreen: U.isTouchScreen,
		onLoad: En,
		onLoading: ai,
		onResize: ui,
		onGamepadConnect: U.onGamepadConnect,
		onGamepadDisconnect: U.onGamepadDisconnect,
		onError: ci,
		onCleanup: li,
		camPos: ts,
		camScale: ns,
		camRot: rs,
		shake: ss,
		toScreen: bn,
		toWorld: Jn,
		setGravity: ms,
		getGravity: ps,
		setBackground: gs,
		getBackground: ws,
		getGamepads: U.getGamepads,
		add: bt,
		destroy: Js,
		destroyAll: Zs,
		get: ar,
		readd: Qs,
		pos: Nt,
		scale: kt,
		rotate: bs,
		color: vs,
		opacity: ys,
		anchor: xn,
		area: Ts,
		sprite: Un,
		text: As,
		rect: Os,
		circle: Rs,
		uvquad: Ps,
		outline: Ms,
		body: Fs,
		doubleJump: Bs,
		shader: Ls,
		timer: nr,
		fixed: Is,
		stay: rr,
		health: Vs,
		lifespan: js,
		z: xs,
		move: Es,
		offscreen: Cs,
		follow: Us,
		state: Ns,
		fadeIn: ks,
		tile: or,
		agent: Ys,
		on: je,
		onUpdate: vn,
		onDraw: is,
		onAdd: yn,
		onDestroy: Zn,
		onClick: cs,
		onCollide: os,
		onCollideUpdate: as,
		onCollideEnd: us,
		onHover: ls,
		onHoverUpdate: hs,
		onHoverEnd: ds,
		onKeyDown: U.onKeyDown,
		onKeyPress: U.onKeyPress,
		onKeyPressRepeat: U.onKeyPressRepeat,
		onKeyRelease: U.onKeyRelease,
		onMouseDown: U.onMouseDown,
		onMousePress: U.onMousePress,
		onMouseRelease: U.onMouseRelease,
		onMouseMove: U.onMouseMove,
		onCharInput: U.onCharInput,
		onTouchStart: U.onTouchStart,
		onTouchMove: U.onTouchMove,
		onTouchEnd: U.onTouchEnd,
		onScroll: U.onScroll,
		onGamepadButtonDown: U.onGamepadButtonDown,
		onGamepadButtonPress: U.onGamepadButtonPress,
		onGamepadButtonRelease: U.onGamepadButtonRelease,
		onGamepadStick: U.onGamepadStick,
		mousePos: It,
		mouseDeltaPos: U.mouseDeltaPos,
		isKeyDown: U.isKeyDown,
		isKeyPressed: U.isKeyPressed,
		isKeyPressedRepeat: U.isKeyPressedRepeat,
		isKeyReleased: U.isKeyReleased,
		isMouseDown: U.isMouseDown,
		isMousePressed: U.isMousePressed,
		isMouseReleased: U.isMouseReleased,
		isMouseMoved: U.isMouseMoved,
		isGamepadButtonPressed: U.isGamepadButtonPressed,
		isGamepadButtonDown: U.isGamepadButtonDown,
		isGamepadButtonReleased: U.isGamepadButtonReleased,
		charInputted: U.charInputted,
		loop: fs,
		wait: gt,
		play: dt,
		volume: pn,
		burp: Gt,
		audioCtx: he.ctx,
		Timer: at,
		Line: Se,
		Rect: ne,
		Circle: ke,
		Polygon: Pe,
		Vec2: v,
		Color: L,
		Mat4: J,
		Quad: Q,
		RNG: rt,
		rand: xt,
		randi: Dn,
		randSeed: pr,
		vec2: S,
		rgb: W,
		hsl2rgb: mr,
		quad: ue,
		choose: wr,
		chance: gr,
		lerp: Me,
		tween: Cn,
		easings: ot,
		map: $t,
		mapc: fr,
		wave: Mn,
		deg2rad: Re,
		rad2deg: st,
		testLineLine: nt,
		testRectRect: br,
		testRectLine: vr,
		testRectPoint: yt,
		testCirclePolygon: Ur,
		testLinePoint: yr,
		testLineCircle: Gn,
		drawSprite: Xr,
		drawText: Wn,
		formatText: $e,
		drawRect: Ce,
		drawLine: pt,
		drawLines: Hn,
		drawTriangle: qn,
		drawCircle: Qe,
		drawEllipse: $n,
		drawUVQuad: Oe,
		drawPolygon: qe,
		drawFormattedText: ze,
		drawMasked: Wr,
		drawSubtracted: Jr,
		pushTransform: re,
		popTransform: V,
		pushTranslate: b,
		pushScale: C,
		pushRotate: ee,
		pushMatrix: d,
		usePostEffect: gn,
		debug: se,
		scene: _s,
		go: Hs,
		onSceneLeave: qs,
		addLevel: Ks,
		getData: $s,
		setData: sr,
		download: zt,
		downloadJSON: Cr,
		downloadText: Ln,
		downloadBlob: In,
		plug: ir,
		ASCII_CHARS: Br,
		canvas: U.canvas(),
		addKaboom: ni,
		LEFT: v.LEFT,
		RIGHT: v.RIGHT,
		UP: v.UP,
		DOWN: v.DOWN,
		RED: L.RED,
		GREEN: L.GREEN,
		BLUE: L.BLUE,
		YELLOW: L.YELLOW,
		MAGENTA: L.MAGENTA,
		CYAN: L.CYAN,
		WHITE: L.WHITE,
		BLACK: L.BLACK,
		quit: hi,
		Event: ve,
		EventHandler: De,
		EventController: Ae,
	};
	if ((s.plugins && s.plugins.forEach(ir), s.global !== !1))
		for (let e in tt) window[e] = tt[e];
	return U.canvas().focus(), tt;
}, "default");
export { mo as default };
//# sourceMappingURL=kaboom.mjs.map
