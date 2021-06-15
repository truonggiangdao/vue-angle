# Vue Angle Picker

This is a small project to create the angle picker as I want because I couldn't find it online.


### Example
<p align="center">
  <a href="https://github.com/truonggiangdao/vue-angle" target="_blank">
    <img alt="Vue Angle" width="200" src="https://github.com/truonggiangdao/vue-angle/blob/master/examples/01.png">
  </a>
</p>

### Instruction

Install:

```
npm install vue-angle
```

Use:

```
import Vue from 'vue';
import VueAngle from 'vue-angle';
vue.use(VueAngle);
```

Example Code:

```
<template>
    <vue-angle :angle="angle" @change="onChange"></vue-angle> 
</template>
<script>
    export default{
        data() {
            angle: 0
        },
        methods:{
            onChange(angle){
                this.angle = angle;
            }
        }
    }
</script>
```


### Browser Support

Tested on Chrome and Safari


### GitHub

[https://github.com/truonggiangdao/vue-angle](https://github.com/truonggiangdao/vue-angle)


### License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present Giang Dao