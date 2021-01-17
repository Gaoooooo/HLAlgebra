class BinaryHeap {

    constructor() {}
    
    //to do
    /*important note: somehow prevent calling heapify before a call to build heap is ever made. heapify requires subtrees to be heaps 
    * make sure all functions that shouldnt modify parameter use class variables instead 

    *
    maybe make sure its a 1d array?*/

    vector: Mat;

    //given a heap indice (shifted by +1 relative to array), give back its parent node indice
    parent(i) {
        return mathjs.floor(i/2);
    }
    //return left child indice
    left(i) {
        return 2*i;
    }
    //return right child indice
    right(i) {
        return 2*i + 1;
    }

    //maintains the max heap property starting at i. assumes that only the current node is the issue - the subtrees from 'i' assumed to be maxheaps
    //does so by looking at each left and right child of a node and whichever child is greatest, gets swapped with parent. 
    //keep checking each sub-subtree to make sure it preserves the maxheap property. ends when largest is the parent itself i.e. property is satisfied
    maxHeapify(i) {
        //get the heap indice of left and right child
        let l = this.left(i);
        let r = this.right(i);
        let largest = 0;
        //when the left child is LTE the number of elements in the heap and left childs value is greater than parent, largest updates to lefts indice
        //note, a.val[0][l-1] is because its in accordance with mat object type in matrix.ts, and array indices start at 0 while the working heap indice starts at 1
        if (l <= this.heapsize && (this.vector.val[0][l-1] > this.vector.val[0][i-1]) ) {
            largest = l;
        }
        //case that parent is GTE to child
        else {
            largest = i;
        }
        //when right child is bigger than parent, set largest indice to right
        if (r <= this.heapsize && (this.vector.val[0][r-1] > this.vector.val[0][largest - 1] ) ) {
            largest = r;
        }
        //if 
        if (!(largest === i)) {
            //exchange a[i] with a[largest]
            let tempswap = this.vector.val[0][i-1];
            this.vector.val[0][i-1] = this.vector.val[0][largest-1];
            this.vector.val[0][largest-1] = tempswap;
            //recursively fix the maxheap property since swapping largest child with parent can make the largest child no longer a proper parent
            this.maxHeapify(largest);
        }
        return this.vector;
    }

    //given an mat object A, look at all non-leaf nodes and heapify them. end result will be every subtree has maxheap property including root tree i.e. its a max heap
    buildMaxHeap(A) {
        //heapsize = a.length. matrix.ts has no length so use cols, if 2d could use cols*rows
        let B = A.clone();
        this.vector = B;
        let heapsize = this.vector.cols;
        //save heapsize as a class variable
        this.heapsize = heapsize;
        
        for (let i = mathjs.floor(this.vector.cols/2); i > 0; i--) {
            this.maxHeapify(i);
        }
        return this.vector;
    }

    //shouldn't be used, more for demo. builds a max heap given a mat object then sorts it
    maxHeapSort(A) {
        let b = this.buildMaxHeap(A);
        //swap root with a[i] where i refers to last element of the heap. since root goes to a[i], its in the proper place sorting-wise, but 
        //being there violates heap property, so reduce heapsize by 1 as its effectively no longer part of the heap. 
        //since the new root is an original leaf node, retain the maxheap property starting at root. 
        //do this until all but one are in the correct sorting order (filling in the sorted array backwards), and that last one must be in first place
        for (let i = b.cols; i > 1; i--) {
            let tempswap = b.val[0][0];
            b.val[0][0] = b.val[0][i-1];
            b.val[0][i-1] = tempswap;
            this.heapsize = this.heapsize - 1;
            this.maxHeapify(1)
        }
        return b;
    }

    //returns the root key (for maxheap, root is maximum, for minheap root is minimum)
    heapRoot(A) {
        return A.val[0][0];
    }

    //get root node (max or min) and return it, while making sure heap property remains
    maxHeapExtract(A) {
        if (this.heapsize < 1) {
            throw 'Heapsize 0 or lower'
        }
        let max = A.val[0][0];
        A.val[0][0] = A[0][this.heapsize-1];
        this.heapsize = this.heapsize -1;
        this.maxHeapify(1);

        return max;
    }
    //similar to maxheapextract except you dont return the max, only remove it
    maxHeapDeleteMax(A) {
        if (this.heapsize < 1) {
            throw 'Cant delete from an empty heap'
        }
        A.val[0][0] = A[0][this.heapsize-1];
        this.heapsize = this.heapsize-1;
        this.maxHeapify(1);

        return this;
    }

    //changes the key (increase or decrease) in the heap where the indice i is the heap indice (1 greater than corresponding array indice)
    heapIncreaseKey(A, i, key) {
        if (key < A.val[0][i-1]) {
            throw 'New key is smaller than current key'
        }
        //a[i] = key, set the new value in the heap
        A.val[0][i-1] = key;
        //make sure the heap property is maintained by swapping the key with the parent until its parent is larger than key
        while (i > 1 && ( (A.val[0][this.parent(i)-1]) < (A.val[0][i-1])) ) {
            let tempswap = A.val[0][i-1];
            A.val[0][i-1] = A.val[0][this.parent(i)-1];
            A.val[0][this.parent(i)-1] = tempswap;
            i = this.parent(i);
        }
        return A;
    }

    //add any key to the heap, increasing it by 1 and maintaining the heap property
    maxHeapInsert(A, key) {
        //increase heapsize by 1 for maxheapify and other functions to work correctly
        this.heapsize = this.heapsize + 1;
        A.cols = A.cols+1;
        //at the last element of the heap, put in negative infinity (make sure it floats up properly)
        A.val[0][this.heapsize-1] = -1000000;
        //and force this into its proper location by increasing negative infinity to 'key' hence maintaining heap property through heapIncreaseKey()
        this.heapIncreaseKey(A, this.heapsize, key);

        return A;

    }
    //returns size of heap
    heapSize(A) {
        return this.heapsize;
    }
    //returns true if empty, false otherwise
    heapIsEmpty(A) {
        if (this.heapsize = 0) {
            return true;
        }
        else { 
            return false;
        }
    }

    //merge, meld


}


/*let bH = new BinaryHeap();
let a = mat([8,6,5,7,2,1])

//bh = new BinaryHeap( myArray );
//bh.insert(1).insert(2).remove(2)

print(a)
let b = bH.buildMaxHeap(a)
print(a)
print(bH.buildMaxHeap(a))
print(b)
let c =(bH.maxHeapInsert(b, 25))
print(c)
let d = bH.maxHeapSort(c)
print(d)


//print(heap0)

//print(bH.buildMaxHeap(a))
//let heap = bH.buildMaxHeap(a)
//print(heap)
//print(bH.heapsize)

//let heap2 = bH.maxHeapInsert(heap0, 25)
//print(bH.heapsize)
//print(heap2)*/