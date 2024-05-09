"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-upload",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.mixinUp, common_vendor.props$6],
  data() {
    return {
      lists: [],
      isInCount: true
    };
  },
  watch: {
    // 监听文件列表的变化，重新整理内部数据
    fileList: {
      handler() {
        this.formatFileList();
      },
      immediate: true,
      deep: true
    }
  },
  emits: ["error", "beforeRead", "oversize", "afterRead", "delete", "clickPreview"],
  methods: {
    formatFileList() {
      const {
        fileList = [],
        maxCount
      } = this;
      const lists = fileList.map(
        (item) => Object.assign(Object.assign({}, item), {
          // 如果item.url为本地选择的blob文件的话，无法判断其为video还是image，此处优先通过accept做判断处理
          isImage: this.accept === "image" || common_vendor.index.$u.test.image(item.url || item.thumb),
          isVideo: this.accept === "video" || common_vendor.index.$u.test.video(item.url || item.thumb),
          deletable: typeof item.deletable === "boolean" ? item.deletable : this.deletable
        })
      );
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
    },
    chooseFile() {
      const {
        maxCount,
        multiple,
        lists,
        disabled
      } = this;
      if (disabled)
        return;
      let capture;
      try {
        capture = common_vendor.index.$u.test.array(this.capture) ? this.capture : this.capture.split(",");
      } catch (e) {
        capture = [];
      }
      common_vendor.chooseFile(
        Object.assign({
          accept: this.accept,
          multiple: this.multiple,
          capture,
          compressed: this.compressed,
          maxDuration: this.maxDuration,
          sizeType: this.sizeType,
          camera: this.camera
        }, {
          maxCount: maxCount - lists.length
        })
      ).then((res) => {
        this.onBeforeRead(multiple ? res : res[0]);
      }).catch((error) => {
        this.$emit("error", error);
      });
    },
    // 文件读取之前
    onBeforeRead(file) {
      const {
        beforeRead,
        useBeforeRead
      } = this;
      let res = true;
      if (common_vendor.index.$u.test.func(beforeRead)) {
        res = beforeRead(file, this.getDetail());
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            "beforeRead",
            Object.assign(Object.assign({
              file
            }, this.getDetail()), {
              callback: (ok) => {
                ok ? resolve() : reject();
              }
            })
          );
        });
      }
      if (!res) {
        return;
      }
      if (common_vendor.index.$u.test.promise(res)) {
        res.then((data) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index
      };
    },
    onAfterRead(file) {
      const {
        maxSize,
        afterRead
      } = this;
      const oversize = Array.isArray(file) ? file.some((item) => item.size > maxSize) : file.size > maxSize;
      if (oversize) {
        this.$emit("oversize", Object.assign({
          file
        }, this.getDetail()));
        return;
      }
      if (typeof afterRead === "function") {
        afterRead(file, this.getDetail());
      }
      this.$emit("afterRead", Object.assign({
        file
      }, this.getDetail()));
    },
    deleteItem(index) {
      this.$emit(
        "delete",
        Object.assign(Object.assign({}, this.getDetail(index)), {
          file: this.fileList[index]
        })
      );
    },
    // 预览图片
    onPreviewImage(item) {
      if (!item.isImage || !this.previewFullImage)
        return;
      common_vendor.index.previewImage({
        // 先filter找出为图片的item，再返回filter结果中的图片url
        urls: this.lists.filter((item2) => this.accept === "image" || common_vendor.index.$u.test.image(item2.url || item2.thumb)).map((item2) => item2.url || item2.thumb),
        current: item.url || item.thumb,
        fail() {
          common_vendor.index.$u.toast("预览图片失败");
        }
      });
    },
    onPreviewVideo(event) {
      if (!this.data.previewFullImage)
        return;
      const {
        index
      } = event.currentTarget.dataset;
      const {
        lists
      } = this.data;
      common_vendor.wx$1.previewMedia({
        sources: lists.filter((item) => isVideoFile(item)).map(
          (item) => Object.assign(Object.assign({}, item), {
            type: "video"
          })
        ),
        current: index,
        fail() {
          common_vendor.index.$u.toast("预览视频失败");
        }
      });
    },
    onClickPreview(event) {
      const {
        index
      } = event.currentTarget.dataset;
      const item = this.data.lists[index];
      this.$emit(
        "clickPreview",
        Object.assign(Object.assign({}, item), this.getDetail(index))
      );
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_loading_icon2 = common_vendor.resolveComponent("u-loading-icon");
  (_easycom_u_icon2 + _easycom_u_loading_icon2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_loading_icon = () => "../u-loading-icon/u-loading-icon.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_loading_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.previewImage
  }, _ctx.previewImage ? {
    b: common_vendor.f($data.lists, (item, index, i0) => {
      return common_vendor.e({
        a: item.isImage || item.type && item.type === "image"
      }, item.isImage || item.type && item.type === "image" ? {
        b: item.thumb || item.url,
        c: _ctx.imageMode,
        d: common_vendor.o(($event) => $options.onPreviewImage(item), index),
        e: common_vendor.s({
          width: _ctx.$u.addUnit(_ctx.width),
          height: _ctx.$u.addUnit(_ctx.height)
        })
      } : {
        f: "cafe0b2a-0-" + i0,
        g: common_vendor.p({
          color: "#80CBF9",
          size: "26",
          name: item.isVideo || item.type && item.type === "video" ? "movie" : "folder"
        }),
        h: common_vendor.t(item.isVideo || item.type && item.type === "video" ? "视频" : "文件")
      }, {
        i: item.status === "uploading" || item.status === "failed"
      }, item.status === "uploading" || item.status === "failed" ? common_vendor.e({
        j: item.status === "failed"
      }, item.status === "failed" ? {
        k: "cafe0b2a-1-" + i0,
        l: common_vendor.p({
          name: "close-circle",
          color: "#ffffff",
          size: "25"
        })
      } : {
        m: "cafe0b2a-2-" + i0,
        n: common_vendor.p({
          size: "22",
          mode: "circle",
          color: "#ffffff"
        })
      }, {
        o: item.message
      }, item.message ? {
        p: common_vendor.t(item.message)
      } : {}) : {}, {
        q: item.status !== "uploading" && (_ctx.deletable || item.deletable)
      }, item.status !== "uploading" && (_ctx.deletable || item.deletable) ? {
        r: "cafe0b2a-3-" + i0,
        s: common_vendor.p({
          name: "close",
          color: "#ffffff",
          size: "10"
        }),
        t: common_vendor.o(($event) => $options.deleteItem(index), index)
      } : {}, {
        v: item.status === "success"
      }, item.status === "success" ? {
        w: "cafe0b2a-4-" + i0,
        x: common_vendor.p({
          name: "checkmark",
          color: "#ffffff",
          size: "12"
        })
      } : {}, {
        y: index
      });
    })
  } : {}, {
    c: $data.isInCount
  }, $data.isInCount ? common_vendor.e({
    d: _ctx.$slots.default || _ctx.$slots.$default
  }, _ctx.$slots.default || _ctx.$slots.$default ? {
    e: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args))
  } : common_vendor.e({
    f: common_vendor.p({
      name: _ctx.uploadIcon,
      size: "26",
      color: _ctx.uploadIconColor
    }),
    g: _ctx.uploadText
  }, _ctx.uploadText ? {
    h: common_vendor.t(_ctx.uploadText)
  } : {}, {
    i: !_ctx.disabled ? "u-upload__button--hover" : "",
    j: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    k: common_vendor.n(_ctx.disabled && "u-upload__button--disabled"),
    l: common_vendor.s({
      width: _ctx.$u.addUnit(_ctx.width),
      height: _ctx.$u.addUnit(_ctx.height)
    })
  })) : {}, {
    m: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cafe0b2a"], ["__file", "C:/project/轻羽项目/qingyu-client/node_modules/uview-plus/components/u-upload/u-upload.vue"]]);
wx.createComponent(Component);
