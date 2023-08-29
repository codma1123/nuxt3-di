import IEquatable from "./equatable";

export default class List<T> extends Array<T> implements IEquatable {
	constructor(...items: T[]) {
		super(...items);
	}
	public equals(other: this): boolean {
		if (this.length !== other.length) return false;
		return this.map((x, i) => other[i] == x).reduce((x, y) => x && y, true);
	}
}
