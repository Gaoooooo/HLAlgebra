# HLAlgebra

A collection of machine learning and linear algebra algorithms for Hedgehog Lab. 

## Quick Start

To import HLAlgebra library into Hedgehog Lab:

```js
*import HLAlgebra: SimpleRegression
```

Here is a simple example:

```js
*import HLAlgebra: SimpleRegression

sr = new SimpleRegression();

let a = mat( [ [1,2,3], [0,4,6] ])
sr.fit(a).log()
print(sr.alpha)
print(sr.beta + "beta")

let b = mat ( [4,5,6] )

sr.predict(b).log()
print(b.val[0])
sr.log();
```
