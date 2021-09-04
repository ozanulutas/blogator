<template>
  <section class="container">
    <h1 class="text-center my-4">BLOGATÖR</h1>

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

    <input v-model="blogTitle" type="text" class="form-control mb-4" placeholder="Blog Başlığı">

    <Editor
      v-model="sourceCode"
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
          'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
            
      }"
    />

    <div class="border p-1 mt-4">
      <pre>
        {{ outputCode }}
      </pre>
    </div>

  </section>
</template>


<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Editor,
  },


  data() {
    return {
      sourceCode: "",
      outputCode: "",
      blogTitle: "",
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
        },
        salonrandevu: {
        },
        ilksms: {
        },
      }
    };
  },


  methods: {
    output() {
      if (this.selectedWebsite === "") {
        return;
      }

      const elements = "p, h1, h2, h3, h4, h5, h6, img, a, strong, ul, ol, li, table, tr, td, th";
      let tagName = "";
      const div = document.createElement("div");

      div.innerHTML = this.sourceCode;

      div.querySelectorAll(elements).forEach((element) => {
        tagName = element.tagName.toLowerCase();
        console.log(tagName);
        console.log(this.selectedWebsite);

        if(! Object.prototype.hasOwnProperty.call(this.styles[this.selectedWebsite], tagName)) {
          return;
        }

        element.classList.add(this.styles[this.selectedWebsite][tagName]);
      });

      this.blogTitle = this.blogTitle.replace(/\s+/g, "-").toLowerCase();
      console.log(div);
      this.outputCode = div.innerHTML;
    }
  },
};
</script>
