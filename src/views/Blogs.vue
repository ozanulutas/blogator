<template>
  <section class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-for="field in fields.typeOne" :key="field" scope="col">
            {{ field }}
          </th>
          <th scope="col">
            İşlemler
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog in blogs" :key="blog.id">
          <th scope="row">{{ blog.id }}</th>
          <td>{{ blog.title.length > 49 ? blog.title.slice(0, 50) + "..." : blog.title }}</td>
          <td>{{ blog.category_id }}</td>
          <td>{{ blog.author_id }}</td>
          <td>{{ blog.date }}</td>
          <td>
            <button @click="openEdit(blog.id)" class="btn btn-outline-primary m-1">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="btn btn-outline-danger m-1">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from "../utilities/plugins/axios";

export default {
  data() {
    return {
      fields: {
        typeOne: ["Id", "Başlık", "Kategori", "Yazar", "Tarih"]
      },
      blogs: []
    }
  },


  mounted() {
    axios.get("/blog/default").then((response) => {
      const { data } = response;
      this.blogs = data;
    });
  },


  methods: {
    openEdit(id) {
      this.$store.commit("setBlog", this.blogs.filter(blog => blog.id === id)[0]);
      this.$router.push("/blogator");
      // console.log(this.$store.state.blog);
    }
  }
};
</script>

<style>
</style>