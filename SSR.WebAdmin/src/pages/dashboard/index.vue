<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import Stat from "@/components/widgets/widget-stat";
import {sparklineChartData, salesDonutChart, radialBarChart} from "./data";
import {CONSTANTS} from "@/helpers/constants";
import {dashboardModel} from "@/models/dashboardModel";

export default {
  page: {
    title: "Bảng điều khiển",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    Layout,
    Stat
  },
  data() {
    return {
      sparklineChartData: sparklineChartData,
      salesDonutChart: salesDonutChart,
      radialBarChart: radialBarChart,
      statData: [
        {
          title: "Tin tức - Sự kiện",
          image: require("@/assets/images/services-icon/01.png"),
          value: "0",
          subText: "VBD",
          color: "white",
          path: "/tin-tuc-su-kien",
          className: "card-vanbanden",
          icon: "mdi-file text-primary"
        },
        {
          title: "Tuyển dụng",
          image: require("@/assets/images/services-icon/02.png"),
          value: "0",
          subText: "VBD",
          color: "white",
          path: "/tuyen-dung",
          className: "card-vanbandi",
          icon: "mdi-book-arrow-left text-success"
        },
        {
          title: "Phòng máy",
          image: require("@/assets/images/services-icon/03.png"),
          value: "0",
          subText: "VBDXL",
          color: "white",
          path: "/phong-may",
          className: "card-hopthu",
          icon: "mdi-email text-danger"
        },
        {
          title: "Nhân viên",
          image: require("@/assets/images/services-icon/04.png"),
          value: "0",
          subText: "HT",
          color: "white",
          path: "/nhan-vien",
          className: "card-thongbao",
          icon: "mdi-bell text-warning"
        }
      ],
      modelSoLieu: dashboardModel.baseJson(),
      activityUserData: [],
      userLogins: []
    };
  },
  async created() {
    this.soLieuDashboard();
  },
  methods: {
    soLieuDashboard() {
      try {
        this.$store.dispatch("dashboardStore/getDashboard").then(resp => {
          if (resp.resultCode == CONSTANTS.SUCCESS) {
            this.modelSoLieu = resp.data;
            if (this.modelSoLieu) {
              this.statData[0].value = this.modelSoLieu.soTinTucSuKien.toString();
              this.statData[1].value = this.modelSoLieu.soTuyenDung.toString();
              this.statData[2].value = this.modelSoLieu.soNhanVien.toString();
              this.statData[3].value = this.modelSoLieu.soPhongMay.toString();
            }
            return;
          } else {
            return null;
          }
        })
      } finally {
        console.log()
      }
    },
  }
};
</script>

<template>
  <Layout>
    <!-- start page title -->
    <div class="row align-items-center">
      <div class="col-sm-6">
        <div class="page-title-box p-2 mb-2">
          <h4 class="font-size-18 text-dark"> Bảng điều khiển</h4>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item active text-dark"> Chào mừng đến với hệ thống SSR - Đồng Tháp</li>
          </ol>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="float-end d-none d-md-block">
          <b-dropdown right variant="primary" menu-class="dropdown-menu-end">
            <template v-slot:button-content>
              <i class="mdi mdi-cog me-2"></i> Truy cập nhanh
            </template>
            <b-dropdown-item href="https://cybercoredongthap.com" target="_blank"> Trang chủ</b-dropdown-item>
            <b-dropdown-item> Thông tin bản quyền</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <!-- end page title -->
    <div class="row mb-3">
      <div class="col-md-3 col-sm-12 mb-2" v-for="stat of statData" :key="stat.icon">
        <Stat
            :title="stat.title"
            :image="stat.image"
            :subText="stat.subText"
            :value="stat.value"
            :color="stat.color"
            :path="stat.path"
            :icon="stat.icon"
            :className="stat.className"
        />
      </div>
    </div>
<!--    <div class="row">-->
<!--      <div class="col-lg-4 col-md-12">-->
<!--        <Activity :activityUserData="userLogins" />-->
<!--      </div>-->
<!--    </div>-->
  </Layout>
</template>

<style>
.title-capso {
  font-weight: bold;
  color: #00568C;
}

.pd-custom-2 {
  padding: 0px 5px;
}
</style>

<style lang="scss">
.card-vanbanden {
  //background: url("~@/assets/images/card-vanbanden.png");
  //background-repeat: no-repeat;
  //background-size: cover;
  background: linear-gradient(135deg, #308dc7, #6dbdf3);
  color: #fff;
  min-height: 120px !important;
  height: 100%;

  & .mini-stat-label {
    color: #2a2a2a !important;
  }

}

.card-vanbandi {
  //background: url("~@/assets/images/card-vanbandi.png");
  //background-repeat: no-repeat;
  //background-size: cover;
  background: linear-gradient(135deg, #1b8b9a, #5ac7c7);
  color: #fff;
  min-height: 120px !important;
  height: 100%;

  & .mini-stat-label {
    color: #2a2a2a !important;
  }
}

.card-hopthu {
  //background: url("~@/assets/images/card-hopthu.png");
  //background-repeat: no-repeat;
  //background-size: cover;
  background: linear-gradient(135deg, #c04141, #e59191);
  color: #fff;
  min-height: 120px !important;
  height: 100%;
  & .mini-stat-label {
    color: #2a2a2a !important;
  }
}

.card-thongbao {
  //background: url("~@/assets/images/card-thongbao.png");
  //background-repeat: no-repeat;
  //background-size: cover;
  background: linear-gradient(135deg, #c98e0c, #eab46f);
  color: #fff;
  min-height: 120px !important;
  height: 100%;

  & .mini-stat-label {
    color: #2a2a2a !important;
  }
}
</style>
