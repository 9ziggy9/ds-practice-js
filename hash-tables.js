const {Bucket} = require("./bucket.js");

// How to hash?
// For instance: for strings --> look at its length and take it modulo size of the (static )array

class Table {
  constructor(initialCap, resizeRatio=0) {
    this.capacity = initialCap;
    this.occupiedBuckets = 0;
    this.resizeRatio = resizeRatio;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(bucket => new Bucket());
    Object.seal(this.buckets);
  }

  static hash = (value, cap) => String(value)
    .split("")
    .reduce((sum, l) => sum + l.charCodeAt(0), 0) % cap;

  _checkSize = () => this.resizeRatio
    && (this.occupiedBuckets / this.capacity >= this.resizeRatio);

  insert(key, value) {
    if (!this.buckets[Table.hash(key, this.capacity)].head) this.occupiedBuckets++;
    if (this._checkSize()) this.resize();
    this.buckets[Table.hash(key, this.capacity)].append(key, value);
  }

  remove(key) {
    this.buckets[Table.hash(key, this.capacity)].delete(key);
  }

  resize() {
    this.capacity *= 2;
    const og = this.buckets; // STORING STATE OF HASH TABLE
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(bucket => new Bucket());
    og.forEach(bucket => {
      let current = bucket.head;
      while (current) {
	this.insert(current.key, current.value);
	current = current.next;
      }
    });
  }

  print() {
    this.buckets.forEach((bucket, idx) => {
      process.stdout.write(`${idx}: `);
      bucket.print();
    });
  }
}

const newTable = new Table(10, 0.6);
newTable.insert("Roberto", 20);
newTable.insert("Andrea", 3);
newTable.insert("David", 4);
newTable.insert("Cameron", 55);
newTable.insert("Kevin", 10);
newTable.insert("Deanna", -2000);
newTable.insert("Zach", "lel");
newTable.insert("Amanda", 350);
newTable.insert("Jack", 100);
newTable.insert("Katlynn", 1);
newTable.insert("Alan", 4);
newTable.insert("William", 40);
newTable.insert("Chase", 100);
newTable.remove("Roberto");
newTable.print();
