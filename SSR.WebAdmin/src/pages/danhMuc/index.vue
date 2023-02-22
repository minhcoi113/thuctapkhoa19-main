<script>
import Layout from "../../layouts/main";
import { required } from "vuelidate/lib/validators";
import appConfig from "@/app.config";
import { notifyModel } from "@/models/notifyModel";
import { pagingModel } from "@/models/pagingModel";
import { CONSTANTS } from "@/helpers/constants";
import { knowledgeModel } from "@/models/knowledgeModel";

export default {
  page: {
    title: "Danh mục",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, 'ckeditor-nuxt': () => { return import('@blowstack/ckeditor-nuxt')  },},
  data() {
    return {
      editorConfig: {
        toolbar: {
          items: [
            'heading', '|',
            'fontfamily', 'fontsize', '|',
            'uploadImage',
            'code', 'codeBlock', '|',
            'alignment', '|',
            'fontColor', 'fontBackgroundColor', '|',
            'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
            'link', '|',
            'outdent', 'indent', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'insertTable', '|',
            'undo', 'redo'
          ],
          shouldNotGroupWhenFull: false
        },
        removePlugins: ['Title', 'ImageCaption'],
        simpleUpload: {
          uploadUrl: process.env.VUE_APP_API_URL + "files/upload-ckeditor",
          headers: {
            'Authorization': 'optional_token'
          }
        },
      },

      title: "Danh mục",
      data: [],
      showModal: false,
      showPhanloai: false,
      showDetail: false,
      showDeleteModal: false,
      submitted: false,
      model: knowledgeModel.baseJson(),
      pagination: pagingModel.baseJson(),
      todoTotalRows: 1,
      currentPage: 1,
      numberOfElement: 1,
      perPage: 10,
      pageOptions: [5, 10, 25, 50, 100],
      filter: null,
      filterOn: [],
      isBusy: false,
      sortBy: "age",
      sortDesc: false,
      fields: [
        {
          key: 'STT',
          label: 'STT',
          class: 'cs-text-center',
          sortable: false,
          thClass: 'hidden-sortable',
          thStyle: { width: '30px', minWidth: '30px' }
        },
        {
          key: "name",
          label: "Hướng dẫn",
          sortable: true,
        },
        {
          key: "content",
          label: "Content",
          class: 'td-xuly',
          sortable: true,
          thStyle: { width: '700px', minWidth: '700px' },
        },
        {
          key: 'process',
          label: 'Xử lý',
          class: 'td-xuly btn-process',
          thClass: 'hidden-sortable',
          sortable: false,
          thStyle: { width: '130px', minWidth: '130px' },
        }
      ],
      listLoaiDanhMuc: []
    };
  },
  validations: {
    model: {
      name: { required },
      content: { required },
    },
  },
  created() {
    this.fnGetList();
    this.getListKnowledge();
  },
  watch: {
    showModal(status) {
      if (status == false) this.model = knowledgeModel.baseJson();
    },
    showDeleteModal(val) {
      if (val == false) {
        this.model.id = null;
      }
    },
  },
  methods: {
    handleSearch() {
      this.fnGetList()
    },
    fnGetList() {
      this.$refs.tblList?.refresh()
    },
    async getListKnowledge() {
      await this.$store.dispatch("knowledgeStore/get").then((res) => {
        this.listLoaiDanhMuc = res.data || [];
      })
    },
    async handleUpdate(id) {
      await this.$store.dispatch("knowledgeStore/getById", id).then((res) => {
        if (res.resultCode === 'SUCCESS') {
          this.model = res.data
          this.showModal = true;
        } else {
          this.$store.dispatch("snackBarStore/addNotify", notifyModel.addMessage(res));
          this.fnGetList();
        }
      });
    },
    async handleDetail(id) {
      await this.$store.dispatch("knowledgeStore/getById", id).then((res) => {
        if (res.resultCode === 'SUCCESS') {
          this.model = res.data
          this.showDetail = true;
        } else {
          this.$store.dispatch("snackBarStore/addNotify", notifyModel.addMessage(res));
        }
      });
    },
    async handleDelete() {
      if (this.model.id != 0 && this.model.id != null && this.model.id) {
        await this.$store.dispatch("knowledgeStore/delete", this.model.id).then((res) => {
          if (res.resultCode === 'SUCCESS') {
            this.fnGetList();
            this.showDeleteModal = false;
          }
          this.$store.dispatch("snackBarStore/addNotify", notifyModel.addMessage(res));
          // });
        });
      }
    },
    handleShowDeleteModal(id) {
      this.model.id = id;
      this.showDeleteModal = true;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        let loader = this.$loading.show({
          container: this.$refs.formContainer,
        });
        if (
          this.model.id != 0 &&
          this.model.id != null &&
          this.model.id
        ) {
          // Update model
          await this.$store.dispatch("knowledgeStore/update", this.model).then((res) => {
            if (res.resultCode === 'SUCCESS') {
              this.fnGetList();
              this.showModal = false;
            }
            this.$store.dispatch("snackBarStore/addNotify", notifyModel.addMessage(res))
          });
        } else {
          // Create model
          await this.$store.dispatch("knowledgeStore/create", this.model).then((res) => {
            if (res.resultCode === 'SUCCESS') {
              this.fnGetList();
              this.showModal = false;
              this.model = knowledgeModel.baseJson();
            }
            this.$store.dispatch("snackBarStore/addNotify", notifyModel.addMessage(res))
          });
        }
        loader.hide();
      }
      this.submitted = false;
    },
    myProvider(ctx) {
      const params = {
        start: ctx.currentPage,
        limit: ctx.perPage,
        content: this.filter,
        sortBy: ctx.sortBy,
        sortDesc: ctx.sortDesc,
      }
      this.loading = true
      try {
        let promise = this.$store.dispatch("knowledgeStore/getPagingParams", params)
        return promise.then(resp => {
          if (resp.resultCode == CONSTANTS.SUCCESS) {
            let data = resp.data;
            this.totalRows = data.totalRows
            let items = data.data
            this.numberOfElement = items.length
            this.loading = false
            return items || []
          } else {
            return [];
          }
        })
      } finally {
        this.loading = false
      }
    },
    clearSearch() {
      this.filter = null;
    }
  }
}
</script>
<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="card mb-2">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 col-12 d-flex align-items-center">
                <h4 class="font-size-18 fw-bold cs-title-page">Hướng dẫn xử lý yêu cầu lỗi</h4>
              </div>
              <div class="col-md-8 col-12 text-end">
                <b-button v-b-toggle.collapseSearch variant="light" class="btn w-md btn-primary-outline me-2" size="sm">
                  <i class="fas fa-caret-down align-middle me-2"></i>
                  Tìm kiếm
                </b-button>
                <b-button variant="primary" type="button" class="btn w-md btn-primary" @click="showModal = true"
                  size="sm">
                  <i class="mdi mdi-plus me-1"></i> Tạo hướng dẫn xử lý 
                </b-button>
              </div>
            </div>
            <b-collapse id="collapseSearch" class="mt-1">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex justify-content-between align-items-end flex-wrap mb-2">
                    <!-- Nội dung -->
                    <div class="flex-grow-1 me-2">
                      <label>Nội dung</label>
                      <input v-model="filter" type="text" class="form-control" placeholder="Tìm kiếm ..." />
                      <i class="bx bx-search-alt search-icon"></i>
                    </div>
                    <div class="flex-grow-0 ms-2">
                      <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <div class="flex-grow-1 mt-xl-0 mt-2">
                          <b-button @click="handleSearch" variant="light" class="btn w-md btn-primary me-2" size="md">
                            <i class="fas fa-search align-middle me-2"></i>
                            Tìm kiếm
                          </b-button>
                        </div>
                        <div class="flex-grow-1 mt-xl-0 mt-2">
                          <b-button @click="clearSearch" variant="light" class="btn w-md btn-secondary me-2" size="md">
                            <i class="fas fa-redo-alt align-middle me-2"></i>
                            Làm mới
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-8">
                <div class="text-sm-end">
                  <b-modal v-model="showModal" title="Thông tin danh mục" title-class="text-black font-18"
                    body-class="p-3" hide-footer centered no-close-on-backdrop size="lg">
                    <form @submit.prevent="handleSubmit" ref="formContainer">
                      <div class="row">
                        <div class="col-12">
                          <div class="mb-3">
                            <label class="text-left">Tên hướng dẫn</label>
                            <span style="color: red">&nbsp;*</span>
                            <input type="hidden" v-model="model.id" />
                            <input id="name" v-model.trim="model.name" type="text" class="form-control"
                              placeholder="Nhập tên hướng dẫn" :class="{
                                'is-invalid':
                                  submitted && $v.model.name.$error,
                              }" />
                            <div v-if="submitted && !$v.model.name.required" class="invalid-feedback">
                              Tên danh mục không được để trống.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="mb-2">
                            <label class="form-label cs-title-form" for="validationCustom01"> Nội dung</label>
                            <span class="text-danger">*</span>
                            <ckeditor-nuxt v-model="model.content" :config="editorConfig" />
                            <div v-if="submitted && !$v.model.content.required" class="invalid-feedback">
                              Nội dung không được để trống.
                            </div>
                          </div>
                        </div>
                        <!-- <div class="col-12">
                                  <div class="mb-3">
                                    <label class="text-left">Loại danh mục</label>
                                    <span style="color: red">&nbsp;*</span>
                                    <multiselect v-model="model.loaiDanhMuc"
                                                 :options="listLoaiDanhMuc"
                                                 label="name"
                                                 selectLabel="Nhấn vào để chọn"
                                                 deselectLabel="Nhấn vào để xóa"
                                                 track-by="id"
                                                 :class="{
                                        'is-invalid':
                                          submitted && $v.model.loaiDanhMuc.$error,
                                      }"
                                                 placeholder="Chọn loại danh mục"
                                    ></multiselect>
                                    <div
                                        v-if="submitted && !$v.model.loaiDanhMuc.required"
                                        class="invalid-feedback"
                                    >
                                      Loại danh mục không được trống.
                                    </div>
                                  </div>
                                </div> -->
                      </div>
                      <div class="text-end pt-2 mt-3">
                        <b-button variant="light" class="w-md" size="sm" @click="showModal = false">
                          Đóng
                        </b-button>
                        <b-button type="submit" variant="primary" size="sm" class="ms-1 w-md">
                          Lưu
                        </b-button>
                      </div>
                    </form>
                  </b-modal>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="row mb-3">
                  <div class="col-sm-12 col-md-6">
                    <div id="tickets-table_length" class="dataTables_length">
                      <label class="d-inline-flex align-items-center">
                        Hiện
                        <b-form-select class="form-select form-select-sm" v-model="perPage" size="sm"
                          :options="pageOptions"></b-form-select>&nbsp;dòng
                      </label>
                    </div>
                  </div>
                </div>
                <div class="table-responsive-sm">
                  <b-table class="datatables custom-table" :items="myProvider" :fields="fields" responsive="sm"
                    :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc"
                    :filter="filter" :filter-included-fields="filterOn" ref="tblList" primary-key="id" :busy.sync="isBusy"
                    tbody-tr-class="b-table-chucvu">
                    <template v-slot:cell(STT)="data">
                      {{ data.index + ((currentPage - 1) * perPage) + 1 }}
                    </template>
                    <template v-slot:cell(name)="data">
                      <template v-if="data.item.name">
                        <div>
                          <span>{{ data.item.name }}</span>
                        </div>
                      </template>
                    </template>
                    <template v-slot:cell(content)="data">
                          <span>{{ data.item.content }}</span>
                    </template>
                    <template v-slot:cell(process)="data">
                      <button type="button" size="sm" class="btn btn-edit btn-sm" data-toggle="tooltip"
                        data-placement="bottom" title="Cập nhật" v-on:click="handleUpdate(data.item.id)">
                        <i class="fas fa-pencil-alt"></i>
                      </button>
                      <button type="button" size="sm" class="btn btn-delete btn-sm" data-toggle="tooltip"
                        data-placement="bottom" title="Xóa" v-on:click="handleShowDeleteModal(data.item.id)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </template>
                  </b-table>
                  <template v-if="isBusy">
                    <div align="center">Đang tải dữ liệu</div>
                  </template>
                  <template v-if="totalRows <= 0 && !isBusy">
                    <div align="center">Không có dữ liệu</div>
                  </template>
                </div>
                <div class="row">
                  <b-col>
                    <div>Hiển thị {{ numberOfElement }} trên tổng số {{ totalRows }} dòng</div>
                  </b-col>
                  <div class="col">
                    <div class="dataTables_paginate paging_simple_numbers float-end">
                      <ul class="pagination pagination-rounded mb-0">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                          size="sm"></b-pagination>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <b-modal v-model="showDeleteModal" centered title="Xóa dữ liệu" title-class="font-18" no-close-on-backdrop>
          <p>
            Dữ liệu xóa sẽ không được phục hồi!
          </p>
          <template #modal-footer>
            <b-button v-b-modal.modal-close_visit size="sm" class="btn btn-outline-info w-md"
              v-on:click="showDeleteModal = false">
              Đóng
            </b-button>
            <b-button v-b-modal.modal-close_visit size="sm" variant="danger" type="button" class="w-md"
              v-on:click="handleDelete">
              Xóa
            </b-button>
          </template>
        </b-modal>
      </div>
    </div>
  </Layout>
</template>
<style>
.td-stt {
  text-align: center;
}

.td-xuly {
  text-align: center;
}

.table>tbody>tr>td {
  padding: 0px;
  line-height: 30px;
}

.hidden-sortable:after,
.hidden-sortable:before {
  display: none !important;
}

@media only screen and (max-width: 768px) {
  .b-table-chucvu>td:nth-of-type(1):before {
    content: "STT";
    font-weight: bold;
    color: #00568c;
  }

  .b-table-chucvu>td:nth-of-type(2):before {
    content: "Tên";
    font-weight: bold;
    color: #00568c;
  }

  .b-table-chucvu>td:nth-of-type(3):before {
    content: "Màu sắc";
    font-weight: bold;
    color: #00568c;
  }

  .b-table-chucvu>td:nth-of-type(4):before {
    content: "";
    font-weight: bold;
    color: #00568c;
  }
}
</style>

