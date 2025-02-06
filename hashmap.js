class HashMap {
    constructor(initialCapacity = 8, loadFactor = 0.75) {
        this.buckets = new Array(initialCapacity).fill(null).map(() => []);
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.size++;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    keys() {
        return this.buckets.flat().map(pair => pair[0]);
    }

    values() {
        return this.buckets.flat().map(pair => pair[1]);
    }

    entries() {
        return this.buckets.flat();
    }

    resize() {
        const newCapacity = this.capacity * 2;
        this.capacity = newCapacity; // ✅ Update capacity before rehashing
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);
    
        this.buckets.flat().forEach(([key, value]) => {
            const index = this.hash(key);  // ✅ Now it correctly uses the updated capacity
            newBuckets[index].push([key, value]);
        });
    
        this.buckets = newBuckets;
    }
    
    
}


const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

console.log(test.get('apple'));
console.log(test.get('banana'));
console.log(test.get('carrot'));
console.log(test.get('dog'));

console.log(test.has('apple'));
console.log(test.has('dog'));

console.log(test.remove('banana'));
console.log(test.get('banana'));

console.log(test.length());

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

for (let i = 0; i < 20; i++) {
    test.set(`key${i}`, `value${i}`);
}
console.log(test.length());

test.clear();
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());