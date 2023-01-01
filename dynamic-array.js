class Vector {
  constructor(initialCap=4) {
    this.capacity = initialCap;
    this.length = 0;
    this.xs = Array(this.capacity).fill(null);
    Object.seal(this.xs); // Make it a static array
  }
  // This tells devs, this is a "private" method
  // True indicates a resize is necessary,
  // false means you're good.
  _checkSize() {
    return (this.length + 1) / this.capacity >= 0.75;
  }

  push(x) {
    if (this._checkSize()) this.resize();
    this.xs[this.length] = x;
    this.length++;
    return this.length;
  }

  pop() {
    const popped = this.xs[this.length-1];
    this.xs[this.length-1] = null;
    this.length--;
    return popped;
  }

  resize() {
    console.log("Resize occurring...");
    this.xs = [...this.xs, ...new Array(this.capacity).fill(null)];
    this.capacity *= 2;
    Object.seal(this.xs);
  }

  print = () => console.table({
    capacity: this.capacity,
    length: this.xs.length,
    elements: this.xs
  });
}

const myVec = new Vector();

myVec.print();
myVec.push(5);
myVec.push(5);
myVec.push(5);
console.log(myVec.pop());
myVec.print();
