# 百度地图选址DEMO

## 接入

CDN引入

```html
<script src="https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=您的AK码" />
```

## 坐标系
- WGS84坐标系：地球坐标系，国际通用坐标系；Google海外地图 使用
- GCJ02坐标系：火星坐标系，WGS84坐标系加密后的坐标系；Google国内地图、高德、QQ地图 使用
- BD09坐标系：百度坐标系，GCJ02坐标系加密后的坐标系
- CGCS坐标系：国家2000大地坐标系

> 使用geolocation.getCurrentPosition获取的是WGS84坐标系

## poi
POI（Point of Interest），即“兴趣点”。在地理信息系统中，一个POI可以是一栋房子、一个景点、一个邮筒或者一个公交站等。
百度地图SDK提供三种类型的POI检索：城市内检索、周边检索和区域检索（即矩形区域检索）

## 初始化

```vue
<template>
    <div class="map-select">
        <div class="map-select__map">
            <div id="map" />
        </div>
    </div>
</template>

<script lang="ts">
import * as selfCount from './map-select.const';
import * as selftypes from './map-select.types';

export default {
    props: {
        // 初始定位坐标（WGS84标准），格式selftypes.Point
        position: Object
    },

    components: {
        Field
    },

    data() {
        return {
            mapExamples: null, // 地图实例
        };
    },

    mounted() {
        this.init();
    },

    methods: {
        /**
         * @description: 初始化
         */
        async init() {
            if (!this.mapExamples) {
                // 初始化地图实例
                this.mapExamples = new window.BMapGL.Map('map');
                // 双指缩放
                this.mapExamples.enablePinchToZoom();
                // 滚动条缩放
                this.mapExamples.enableScrollWheelZoom();
            }

            // 定位，权重：传入定位 > 获取当前定位 > 默认定位（天安门）
            let position = selfCount.DEFAULT_POSITION;
            if (this.position) {
                position = this.position;
            } else {
                const res = await new Promise(res => {
                    window.navigator.geolocation.getCurrentPosition(e => {
                        res(e.coords);
                    })
                });
                if (res) {
                    position = {
                        lat: res.latitude,
                        lng: res.longitude
                    };
                }
            }
            
            const point = new window.BMapGL.Point(position.lng, position.lat);
            // 转化为百度坐标系
            const convertor = new window.BMapGL.Convertor();
            const baiduPoint = await new Promise(res => {
                convertor.translate([point], window.COORDINATES_WGS84, window.COORDINATES_BD09, e => {
                    res(e.points[0]);
                });
            });

            // 地图定位居中
            this.mapExamples.centerAndZoom(baiduPoint, selfCount.DEFAULT_ZOOM);
        },
    }
};
</script>

<style src="./map-select.less" scoped />
```

## 拖动选址

```vue
<template>
    <div class="map-select">
        <div class="map-select__map">
            <div id="map" />

            <!-- 定位title -->
            <div v-show="!markerFlying && marketPopoverTitle" class="map-select__title">
                {{ marketPopoverTitle }}
                <div class="map-select__title-arrow" />
            </div>

            <!-- 定位icon -->
            <div class="map-select__market">
                <img v-if="markerFlying" src="./images/market.png" />
                <img v-else src="./images/marketFloor.png" />
            </div>
            
            <!-- poi列表 -->
            <div class="map-select__list">
                <div
                    class="map-select__item"
                    v-for="poi in centerLocationInfo.surroundingPois || []"
                    :key="poi.uid"
                    @click="selectAddress(poi.point)"
                >
                    <div>
                        <div class="map-select__item-title">{{ poi.title }}</div>
                        <div class="map-select__item-desc">{{ poi.address }}</div>
                    </div>

                    <!-- <img v-if="true" src="./images/check.png" />
                    <img v-else src="./images/checked.png" /> -->
                </div>

                <div
                    v-if="!centerLocationInfo.surroundingPois || !centerLocationInfo.surroundingPois.length"
                    class="map-select__list-no-data"
                >
                    暂无结果
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Field } from 'vant';

import * as selfCount from './map-select.const';
import * as selftypes from './map-select.types';

export default {
    props: {
        // 初始定位坐标（WGS84标准），格式selftypes.Point
        position: Object
    },

    components: {
        Field
    },

    data() {
        return {
            mapExamples: null, // 地图实例
            geoExamples: null, // 解析器实例
            localSearchExamples: null, // 搜索实例
            autoCompleteExamples: null, // 搜索组件实例

            centerLocationInfo: {}, // 中心点地址信息
            markerFlying: false, // 地图拖动中

            searchKeywords: '', // 搜索关键字
            searchList: [] // 搜索结果
        };
    },

    computed: {
        marketPopoverTitle() {
            if (this.centerLocationInfo.surroundingPois) {
                if (this.centerLocationInfo.surroundingPois[0]) {
                    return this.centerLocationInfo.surroundingPois[0].title;
                }
            }
            return '';
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        /**
         * @description: 初始化
         */
        async init() {
            if (!this.mapExamples) {
                // 初始化地图实例
                this.mapExamples = new window.BMapGL.Map('map');
                this.mapExamples.enablePinchToZoom();
                this.mapExamples.enableScrollWheelZoom();

                this.mapExamples.addEventListener('moving', () => {
                    this.markerFlying = true;
                });
                this.mapExamples.addEventListener('moveend', () => {
                    // 拖动结束后获取窗口中心的位置信息以及poi检索
                    this.getCenterLocationInfo();
                });

                // 初始化地址解析实例
                this.geoExamples = new window.BMapGL.Geocoder();
            }

            let position = selfCount.DEFAULT_POSITION;
            if (this.position) {
                position = this.position;
            } else {
                const res = await new Promise(res => {
                    window.navigator.geolocation.getCurrentPosition(e => {
                        res(e.coords);
                    })
                });
                if (res) {
                    position = {
                        lat: res.latitude,
                        lng: res.longitude
                    };
                }
            }

            const point = new window.BMapGL.Point(position.lng, position.lat);
            const convertor = new window.BMapGL.Convertor();
            const baiduPoint = await new Promise(res => {
                convertor.translate([point], window.COORDINATES_WGS84, window.COORDINATES_BD09, e => {
                    res(e.points[0]);
                });
            });

            this.mapExamples.centerAndZoom(baiduPoint, selfCount.DEFAULT_ZOOM);
            this.moveView2Center();
        },

        /**
         * @description: 移动视图置视觉中心
         */
        moveView2Center() {
            const containerSize = this.mapExamples.getContainerSize();
            this.mapExamples.panBy(0, -(containerSize.height / 4));
        },

        /**
         * @description: 获取中心坐标地址信息
         */
        getCenterLocationInfo() {
            const containerSize = this.mapExamples.getContainerSize();
            const centerPoint = this.mapExamples.pixelToPoint(
                new window.BMapGL.Pixel(containerSize.width / 2, containerSize.height / 4)
            );
            this.geoExamples.getLocation(centerPoint, location => {
                this.markerFlying = false;
                this.centerLocationInfo = location;
            });
        },

        /**
         * @description: 选择地址
         */
        selectAddress(point: selftypes.Point) {
            this.geoExamples.getLocation(point, location => {
                this.$emit('onSelectAddress', location);
            });
        }
    }
};
</script>

<style src="./map-select.less" scoped />
```

## 地址搜索

```vue
<template>
    <div class="map-select">
        <!-- 搜索框 -->
        <Field id="map__search" v-model="searchKeywords" left-icon="search" placeholder="请输入地址" clearable />

        <!-- poi检索列表 -->
        <div v-show="searchKeywords" class="map-select__search-list">
            <div
                class="map-select__search-item"
                v-for="(address, index) in searchList"
                :key="index"
                @click="selectSearchAddress(address)"
            >
                <div>
                    <div class="map-select__search-item-title">{{ address.business }}</div>
                    <div class="map-select__search-item-desc">
                        {{ address.province + address.city + address.district + address.street + address.business }}
                    </div>
                </div>
                <!-- <div>距离</div> -->
            </div>
        </div>

        <div v-show="!searchKeywords" class="map-select__map">
            <div id="map" />

            <div v-show="!markerFlying && marketPopoverTitle" class="map-select__title">
                {{ marketPopoverTitle }}
                <div class="map-select__title-arrow" />
            </div>

            <div class="map-select__market">
                <img v-if="markerFlying" src="./images/market.png" />
                <img v-else src="./images/marketFloor.png" />
            </div>

            <div class="map-select__list">
                <div
                    class="map-select__item"
                    v-for="poi in centerLocationInfo.surroundingPois || []"
                    :key="poi.uid"
                    @click="selectAddress(poi.point)"
                >
                    <div>
                        <div class="map-select__item-title">{{ poi.title }}</div>
                        <div class="map-select__item-desc">{{ poi.address }}</div>
                    </div>

                    <!-- <img v-if="true" src="./images/check.png" />
                    <img v-else src="./images/checked.png" /> -->
                </div>

                <div
                    v-if="!centerLocationInfo.surroundingPois || !centerLocationInfo.surroundingPois.length"
                    class="map-select__list-no-data"
                >
                    暂无结果
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Field } from 'vant';

import * as selfCount from './map-select.const';
import * as selftypes from './map-select.types';

export default {
    props: {
        // 初始定位坐标（WGS84标准），格式selftypes.Point
        position: Object
    },

    components: {
        Field
    },

    data() {
        return {
            mapExamples: null, // 地图实例
            geoExamples: null, // 解析器实例
            localSearchExamples: null, // 搜索实例
            autoCompleteExamples: null, // 搜索组件实例

            centerLocationInfo: {}, // 中心点地址信息
            markerFlying: false, // 地图拖动中

            searchKeywords: '', // 搜索关键字
            searchList: [] // 搜索结果
        };
    },

    computed: {
        marketPopoverTitle() {
            if (this.centerLocationInfo.surroundingPois) {
                if (this.centerLocationInfo.surroundingPois[0]) {
                    return this.centerLocationInfo.surroundingPois[0].title;
                }
            }
            return '';
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        /**
         * @description: 初始化
         */
        async init() {
            if (!this.mapExamples) {
                // 初始化地图实例
                this.mapExamples = new window.BMapGL.Map('map');
                this.mapExamples.enablePinchToZoom();
                this.mapExamples.enableScrollWheelZoom();

                this.mapExamples.addEventListener('moving', () => {
                    this.markerFlying = true;
                });
                this.mapExamples.addEventListener('moveend', () => {
                    this.getCenterLocationInfo();
                });

                // 初始化地址解析实例
                this.geoExamples = new window.BMapGL.Geocoder();

                // 初始化搜索组件实例
                // 用于获取输入框DOM创建结果提示类
                this.autoCompleteExamples = new window.BMapGL.Autocomplete({
                    input: 'map__search',
                    location: this.mapExamples,
                    // poi检索回调函数
                    onSearchComplete: res => (this.searchList = res._pois || [])
                });

                // 初始化搜索实例
                // 用于点击poi检索后将地址信息转化为坐标信息
                this.localSearchExamples = new window.BMapGL.LocalSearch(this.mapExamples, {
                    onSearchComplete: res => {
                        this.markerFlying = true;
                        this.searchKeywords = '';
                        // 将地图中心点移动至目标位置
                        this.mapExamples.flyTo(res.getPoi(0).point, selfCount.DEFAULT_ZOOM + 2, {
                            callback: () => {
                                // 调整视觉中心、获取中心点数据
                                this.moveView2Center();
                                this.getCenterLocationInfo();
                                this.markerFlying = false;
                            }
                        });
                    }
                });
            }

            let position = selfCount.DEFAULT_POSITION;
            if (this.position) {
                position = this.position;
            } else {
                const res = await new Promise(res => {
                    window.navigator.geolocation.getCurrentPosition(e => {
                        res(e.coords);
                    })
                });
                if (res) {
                    position = {
                        lat: res.latitude,
                        lng: res.longitude
                    };
                }
            }

            const point = new window.BMapGL.Point(position.lng, position.lat);
            const convertor = new window.BMapGL.Convertor();
            const baiduPoint = await new Promise(res => {
                convertor.translate([point], window.COORDINATES_WGS84, window.COORDINATES_BD09, e => {
                    res(e.points[0]);
                });
            });

            this.mapExamples.centerAndZoom(baiduPoint, selfCount.DEFAULT_ZOOM);
            this.moveView2Center();
        },

        /**
         * @description: 移动视图置视觉中心
         */
        moveView2Center() {
            const containerSize = this.mapExamples.getContainerSize();
            this.mapExamples.panBy(0, -(containerSize.height / 4));
        },

        /**
         * @description: 获取中心坐标地址信息
         */
        getCenterLocationInfo() {
            const containerSize = this.mapExamples.getContainerSize();
            const centerPoint = this.mapExamples.pixelToPoint(
                new window.BMapGL.Pixel(containerSize.width / 2, containerSize.height / 4)
            );
            this.geoExamples.getLocation(centerPoint, location => {
                this.markerFlying = false;
                this.centerLocationInfo = location;
            });
        },

        /**
         * @description: 选择搜索地址
         */
        selectSearchAddress(address) {
            // 点击poi检索结果，使用位置检索实例搜索坐标
            this.localSearchExamples.search(
                address.province + address.city + address.district + address.street + address.business
            );
        },

        /**
         * @description: 选择地址
         */
        selectAddress(point: selftypes.Point) {
            this.geoExamples.getLocation(point, location => {
                this.$emit('onSelectAddress', location);
            });
        }
    }
};
</script>

<style src="./map-select.less" scoped />
```

## 样式

```less
.map-select {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    #map__search {
        flex-shrink: 0;
    }

    &__search {
        &-list {
            flex: 1;
            background: #fff;
            overflow-y: auto;
        }

        &-item {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:not(:last-child) {
                border-bottom: 1px solid #ebedf0;
            }

            &-title {
                font-size: 28px;
            }

            &-desc {
                font-size: 26px;
                color: #999;
            }
        }
    }

    &__map {
        position: relative;
        width: 100%;
        flex: 1;

        #map {
            width: 100%;
            height: 100%;
        }
    }

    &__title {
        position: absolute;
        top: calc(25% - 50px);
        left: 50%;
        transform: translate(-50%, -100%);
        background-color: #fff;
        width: max-content;
        max-width: 70%;
        word-break: break-all;
        padding: 14px;
        font-size: 26px;
        border-radius: 18px;

        &-arrow {
            position: absolute;
            border: 4px solid #fff;
            border-top-color: rgba(0, 0, 0, 0);
            border-left-color: rgba(0, 0, 0, 0);
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 46%) rotate(45deg);
        }
    }

    &__market {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -100%);

        width: 30px;
        height: 30px;

        & > img {
            width: 100%;
            height: 100%;
        }
    }

    &__list {
        position: absolute;
        z-index: 11;
        width: 90%;
        height: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0);

        background: #fff;
        border-radius: 16px 16px 0 0;
        padding: 10px;
        overflow-y: auto;

        &-no-data {
            padding-top: 30px;
            text-align: center;
        }
    }

    &__item {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:not(:last-child) {
            border-bottom: 1px solid #ebedf0;
        }

        & > img {
            width: 32px;
            height: 32px;
        }

        &-title {
            font-size: 28px;
        }

        &-desc {
            font-size: 26px;
            color: #999;
        }
    }
}

```