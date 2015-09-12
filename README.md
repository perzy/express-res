# express-res

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Installation

```bash
$ npm install express-res
```

## API

```js
var responses = require('express-res');
```

### responses(options)

Create a express response middleware with the given `options`.



## Examples

### express middleware init

The default custom express mvc response middleware path is ./app/responses/


```js
var express = require('express')
var responses = require('express-res');

var app = express()

app.use(responses());

```

### how to define a response middleware then use it

Create a file in ./app/responses folder,this call ok.js.

The content is like:

```js
var _ = require('lodash');

module.exports = function ok (data, options) {

  var req = this.req;
  var res = this.res;
  var defaultOptions = {
    keepEmptyData:false
  };
  options = _.assign(defaultOptions,options);

  var json = {
    code:200,
    msg:'ok',
    data:data
  };

  if(!options.keepEmptyData && _.isEmpty(json.data)){
    delete json.data;
  }

  res.json(json);
};
```

So when express mvc app start.The responses middleware setup auto.
Then, you can use custom method on res you define.

```js
router.get('/test/ok',function(req,res){
  res.ok({name:"jerry wu"});
});
```


## License

[MIT](LICENSE)