<template>
  <div class="uploader">
    <input
      type="file"
      style="display:none"
      ref="fileItem"
      @change="fileChange"
      multiple
    />
    <template v-for="(item, index) in imgArr">
      <img
        :src="item.base64"
        alt=""
        class="upload-img"
        :key="index"
        @click="deleteImg(index)"
      />
    </template>
    <div class="add-button">
      <i class="add-icon el-icon-plus" @click="fileButtonHandler"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [],
    };
  },
  methods: {
    fileChange(e) {
      console.log(this.imgArr);
      const that = this;
      const files = e.target.files;
      const fd = new FormData(); //FormData方式发送请求
      var iLen = files.length; //获取图片数量
      let index = 0;
      for (var i = 0; i < iLen; i++) {
        if (!this.$refs.fileItem['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {
          //判断上传文件格式
          return alert('上传的图片格式不正确，请重新选择');
        }
        var reader = new FileReader(); //创建FileReader对象
        reader.index = i;
        fd.append(i, files[i]); //可以通过fd.get(i)获取FormData()对应的值;
        reader.readAsDataURL(files[i]); //转成base64，并存在reader.result里
        reader.fileName = files[i].name;

        reader.onload = function(e) {
          index++;
          //设置图片信息对象
          const imgMsg = {
            name: this.fileName, //获取文件名
            base64: this.result, //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
          };
          that.imgArr = [...that.imgArr, imgMsg];

          //将图片信息对象存到数据数组中
          // result =
          //   '<div class="delete">delete</div><div class="result"><img src="' +
          //   this.result +
          //   '" alt=""/></div>';
          // var div = document.createElement('div');
          // div.innerHTML = result;
          // div['className'] = 'float';
          // div['index'] = index;
          // document.getElementsByTagName('body')[0].appendChild(div); //插入dom树
          // var img = div.getElementsByTagName('img')[0];
          // img.onload = function() {
          //   var nowHeight = ReSizePic(this); //设置图片大小
          //   this.parentNode.style.display = 'block';
          //   var oParent = this.parentNode;
          //   if (nowHeight) {
          //     oParent.style.paddingTop =
          //       (oParent.offsetHeight - nowHeight) / 2 + 'px';
          //   }
          // };

          // div.onclick = function() {
          //   this.remove(); // 在页面中删除该图片元素
          //   delete dataArr[this.index]; // 删除dataArr对应的数据
          // };

          // index++;
        };
      }
    },
    fileButtonHandler() {
      if (typeof FileReader === 'undefined') {
        alert('抱歉，你的浏览器不支持 FileReader');
        this.$refs.fileItem.setAttribute('disabled', 'disabled'); //添加属性，禁用input
      } else {
        this.$refs.fileItem.click();
      }
    },
    deleteImg(item) {
      this.imgArr = this.imgArr.filter((i, ind) => ind !== item);
    },
  },
};
</script>

<style scoped lang="less">
.uploader {
  display: flex;
  align-items: center;
  height: 200px;
  background-color: #fff;
  padding-left: 20px;
}
.upload-img {
  width: 178px;
  height: 178px;
  margin-right: 20px;
  border-radius: 6px;
  object-fit: cover;
}
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 178px;
  height: 178px;
  border: 1px dashed #8c939d;
  border-radius: 6px;

  &:hover {
    border-color: #409eff;
    cursor: pointer;
  }
}

.add-icon {
  display: block;
  font-size: 30px;
  color: #8c939d;
}
</style>
