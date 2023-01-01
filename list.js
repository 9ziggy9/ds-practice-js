class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }
    let tail = this.tail;
    tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return newNode;
  }

  affix(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
    return newNode;
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
  insert(position, value) {
    let current = this.head;
    const newNode = new Node(value);
    // Want -1 to correspond to adding to end
    // -2 corresponds to adding to 1 before the end
    if (position < 0) {
      position = this.length + position + 1;
    }
    if (!position) return this.affix(newNode.value);
    while(position > 1) {
      current = current.next;
      position--;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.length++;
    return newNode;
  };

  print(start=this.head) {
    if (start === null) {
      process.stdout.write(`null\n`);
      return null;
    } else {
      process.stdout.write(`[value: ${start.value}]`);
      process.stdout.write(` -> `);
    }
    return this.print(start.next);
  }
}

const myList = new List();
myList.append(1);
myList.append(2);
myList.append(3);
myList.daffix();
myList.print();
