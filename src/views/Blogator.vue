<template>
  <section class="container">

    <form @submit.prevent="">
      <div class="row">
        <div class="col">
          <select v-model="selectedWebsite" class="form-select">
            <option value="" selected disabled>Websitesi Seçin</option>
            <option v-for="website in websites" :key="website.value" :value="website.value">{{ website.name }}</option>
          </select>
        </div>

        <div class="col">
          <button @click="output()" class="btn btn-outline-primary">Çıktı Al</button>
        </div>
      </div>

      <hr>

      <input type="hidden" :value="form.id">

      <div class="form-group mb-4">
        <label>Başlık</label>
        <input v-model="form.title" type="text" class="form-control" placeholder="Blog başlığı">
      </div>

      <div class="form-group mb-4">
        <label>Özet</label>
        <textarea v-model="form.summary" class="form-control" rows="3"></textarea>
      </div>

      <div class="form-group mb-4">
        <label>Description</label>
        <textarea v-model="form.meta_desc" class="form-control" rows="3"></textarea>
      </div>

      <div class="form-group mb-4">
        <label>Keywords</label>
        <textarea v-model="form.meta_keywords" class="form-control" rows="3"></textarea>
      </div>

      <div class="form-group mb-4">
        <label>Link</label>
        <input v-model="form.link" type="text" class="form-control" placeholder="Blog linki (URL)">
      </div>

      <div class="form-group mb-4">
        <label>Resim</label>
        <input v-model="form.img" type="text" class="form-control" placeholder="Blog resmi">
      </div>

      <div class="form-group mb-4">
        <label for="example-date-input">Tarih</label>
        <input v-model="form.date" type="date" class="form-control">
      </div>

      <div class="form-group mb-4">
        <label>Kategori</label>
        <input v-model="form.category_id" type="text" class="form-control" placeholder="Kategori id">
      </div>

      <div class="form-group mb-4">
        <label>Yazar</label>
        <input v-model="form.author_id" type="text" class="form-control" placeholder="Yazar id">
      </div>

      <Editor
        v-model="form.post"
        api-key="xv5w4hpgx4o6g7012vojcf6yqwtqd7wgjjy6eia6kdqkilfi"
        :init="{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic removeformat | \
              link image | bullist numlist | code ',
        }"
      />
    </form>

    <div class="border p-1 mt-4">
      <pre>
        {{ outputCode }}
      </pre>
    </div>

  </section>
</template>


<script>
import Editor from "@tinymce/tinymce-vue";
// import axios from "../utilities/plugins/axios";

export default {
  components: {
    Editor,
  },


  data() {
    return {
      form: {
        id: "",
        title: "",
        summary: "",
        post: "",
        meta_desc: "",
        meta_keywords: "",
        img: "",
        link: "",
        date: "",
        category_id: "",
        author_id: ""
      },

      outputCode: "",
      selectedWebsite: "",

      websites: [
        { name: "SalonRandevu", value: "salonrandevu" },
        { name: "İlkSMS", value: "ilksms" },
        { name: "VatanSMS.com", value: "vatansms_com" },
      ],

      styles: {
        vatansms_com: {
          p: "my-3",
          h1: "my-4", h2: "my-4", h3: "my-4", h4: "my-4", h5: "my-4", h6: "my-4",
          a: "link"
        }
      },

      blog: {}
    };
  },


  mounted() {

    this.blog = this.$store.state.blog;

    this.form.id = this.blog.id;
    this.form.title = this.blog.title;
    this.form.summary = this.blog.summary;
    this.form.post = this.blog.post;
    this.form.meta_desc = this.blog.meta_desc;
    this.form.meta_keywords = this.blog.meta_keywords;
    this.form.img = this.blog.img;
    this.form.link = this.blog.link;
    this.form.date = this.blog.date;
    this.form.category_id = this.blog.category_id;
    this.form.author_id = this.blog.author_id;

    console.log(this.blog);
    // axios.post("/blog/create", {
    //   title: "asd",
    //   summary: "sdsdf",
    //   post: "sdgfg",
    //   img: "fsdgfdg",
    //   date: "2020-10-10",
    //   link: "asdsad",
    //   meta_keywords: "sdfsdf",
    //   meta_desc: "sfdgdfgd",
    //   category_id: 6,
    //   author_id: 1      
    // }).then((response) => {
    //   const { data } = response;
    //   console.log(data);
    // }).catch((e) => {
    //   console.log(e);
    // });
    
  },


  methods: {
    output() {
      if (this.selectedWebsite === "") {
        return;
      }

      const elements = "p, h1, h2, h3, h4, h5, h6, img, a, strong, ul, ol, li, table, tr, td, th";
      let tagName = "";
      const div = document.createElement("div");

      div.innerHTML = this.post;

      div.querySelectorAll(elements).forEach((element) => {
        tagName = element.tagName.toLowerCase();

        if(! Object.prototype.hasOwnProperty.call(this.styles[this.selectedWebsite], tagName)) {
          return;
        }

        element.classList.add(this.styles[this.selectedWebsite][tagName]);
      });

      this.title = this.title.replace(/\s+/g, "-").toLowerCase();
      console.log(div);
      this.outputCode = div.innerHTML;
    },

  },
};
</script>


<style>
</style>