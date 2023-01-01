class Entry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class Bucket {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(key, value) {
    const newEntry = new Entry(key, value);
    if (!this.length) {
      this.head = newEntry;
      this.tail = newEntry;
      this.length++;
      return newEntry;
    }
    let tail = this.tail;
    tail.next = newEntry;
    this.tail = newEntry;
    this.length++;
    return newEntry;
  }

  affix(key, value) {
    const newEntry = new Entry(key, value);
    newEntry.next = this.head;
    this.head = newEntry;
    this.length++;
    return newEntry;
  }

  // Effectively, popping off last value
  dappend() {
    if (!this.length) return this.length;
    let current = this.head;
    while (current.next.next !== null) {
      current = current.next;
    }
    this.tail = null;
    current.next = this.tail;
    this.length--;
    return this.length;
  }

  daffix() {
    if (!this.length) return null;
    this.head = this.head.next;
    this.length--;
    return this.length;
  }

  // CAN WE AVOID O(N)?
  insert(position, key, value) {
    let current = this.head;
    const newEntry = new Entry(key, value);
    // Want -1 to correspond to adding to end
    // -2 corresponds to adding to 1 before the end
    if (position < 0) {
      position = this.length + position + 1;
    }
    if (!position) return this.affix(newEntry.key, newEntry.value);
    while(position > 1) {
      current = current.next;
      position--;
    }
    newEntry.next = current.next;
    current.next = newEntry;
    this.length++;
    return newEntry;
  };

  delete(key) {
    let current = this.head; // POINTER TO OBJECT
    if (!current) {
      console.log("RETURNING OUT, NO CURRENT");
      return null;
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      return this.length;
    }
    if (current.key === key) {
      this.head = current.next;
      return this.length;
    }
    while (current && current.next.key !== key) {
      current = current.next;
    }
    current.next = current.next.next;
    return this.length;
  }

  print(start=this.head) {
    if (start === null) {
      process.stdout.write(`null\n`);
      return null;
    } else {
      process.stdout.write(`[key: ${start.key}, value: ${start.value}]`);
      process.stdout.write(` -> `);
    }
    return this.print(start.next);
  }

  show() {
    console.log(JSON.stringify(this.head, null, 2));
  }
}

module.exports = {Entry, Bucket};
