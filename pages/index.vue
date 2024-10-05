<template>

  <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar"
    aria-controls="cta-button-sidebar" type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
      </path>
    </svg>
  </button>
  <SideBar />
  <div class="p-4 md:ml-24">
    <div class="lg:pl-4 border-none border-gray-700 rounded-lg">
      <FilterBar />
      <Echart/>
      <div class="flex items-center justify-center mb-4 rounded  dark:bg-gray-800">
        <div class=" overflow-x-auto w-full">
          <div class="w-full flex-col flex flex-wrap">
            <h1 class="text-3xl font-bold text-gray-500 py-3">Gönderiler</h1>
            <div v-if="error">{{ error }}</div>
            <div v-else-if="posts.length === 0">
                <div class="absolute top-0 left-0 w-full h-full z-10 backdrop-blur-md flex items-center justify-center  border border-blue-200 rounded-lg p-4">
                  <div
                    class="animate-spin relative inline-block size-10 border-[4px] border-current border-t-transparent text-blue-600 rounded-full"
                    role="status" aria-label="loading">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
            </div>
            <div v-else class="flex flex-wrap gap-3">
              <div v-for="post in posts" :key="post.id">

                <a href="#"
                  class="flex lg:flex-row flex-col overflow-hidden items-start pt-2 pl-2 bg-[#FFFFFF] rounded-lg  md:flex-row md:max-w-md">
                  <img class="object-contain rounded-lg h-44 lg:h-full w-full lg:w-28" src="/assets/image-4.jpg" alt="">
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <span
                      class="bg-pink-100 max-w-20 text-pink-800 text-xs font-medium pl-3  rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400">
                      <p>{{ post.platform }}</p>
                    </span>
                    <h5 class="mb-2 text-md font-semibold tracking-tight text-white dark:text-white">
                      @{{ post.username }}</h5>
                    <p class="text-xs text-gray-400">
                      {{ post.isExpanded ? post.caption : truncateText(post.caption, 100) }}
                      <button v-if="post.caption.length > 100" @click="toggleReadMore(index)"
                        class="text-blue-500 ml-2">
                        {{ post.isExpanded ? 'Read Less' : 'Read More' }}
                      </button>
                    </p>

                    <p class=" text-md font-semibold text-gray-400">
                      {{ formatDate(post.taken_at) }}
                    </p>
                    <div class="flex items-center justify-center gap-x-3">
                      <span class="flex items-center justify-start mt-1">
                        <svg class="w-5 h-5 text-white dark:text-white" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                        </svg>
                        <p class="text-sm font-bold text-white"> {{ post.like_count }}</p>
                      </span>
                      <span class="flex items-center justify-start mt-1">
                        <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z" />
                        </svg>

                        <p class="text-sm font-bold text-white"> {{ post.comment_count }}</p>
                      </span>
                      <span class="flex items-center justify-start mt-1">
                        <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                          height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m15.141 6 5.518 4.95a1.05 1.05 0 0 1 0 1.549l-5.612 5.088m-6.154-3.214v1.615a.95.95 0 0 0 1.525.845l5.108-4.251a1.1 1.1 0 0 0 0-1.646l-5.108-4.251a.95.95 0 0 0-1.525.846v1.7c-3.312 0-6 2.979-6 6.654v1.329a.7.7 0 0 0 1.344.353 5.174 5.174 0 0 1 4.652-3.191l.004-.003Z" />
                        </svg>
                        <p class="text-sm font-bold text-white">244B</p>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';

//Durumlar
const posts = ref([]);
const error = ref(null);
// Grafik referansı
const chartDiv = ref(null);

// formatDate fonksiyonu
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // UNIX zaman damgasını milisaniyeye çevir
  return date.toLocaleString(); // Tarih formatında döndür
};

// API'den Instagram gönderilerini çekme
onMounted(async () => {
  try {
    const response = await fetch('/api/instagramPosts');
    const data = await response.json();

    if (data && data.data && data.data.items) {
      posts.value = data.data.items.map(post => ({
        id: post.id,
        platform: 'Instagram',
        username: post.user.username,
        caption: post.caption?.text || '',
        taken_at: post.taken_at,
        like_count: post.like_count || 0,
        profil_pic: post.user.profile_pic_url,
        comment_count: post.comment_count || 0,
        isExpanded: false
      }));

      // ECharts grafiğini başlat
      initChart(posts.value);
    } else {
      error.value = 'Veriler bulunamadı';
    }
  } catch (err) {
    error.value = 'Veri alınamadı: ' + err.message;
  }
});

// ECharts grafiğini başlatma fonksiyonu
const initChart = (posts) => {
  if (!chartDiv.value) {
    console.error("Grafik referansı bulunamadı.");
    return;
  }

  const chartInstance = echarts.init(chartDiv.value);

  chartInstance.setOption({
    title: {
      text: 'Instagram Beğeni ve Yorum Sayıları',
    },
    tooltip: {},
    legend: {
      data: ['Beğeniler', 'Yorumlar'],
    },
    xAxis: {
      type: 'category',
      data: posts.map(post => post.username), // Kullanıcı adları x ekseninde gösterilecek
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Beğeniler',
        type: 'bar',
        data: posts.map(post => post.like_count), // Beğeni sayıları
        itemStyle: { color: '#4BC0C0' }, // Çubuk rengi
      },
      {
        name: 'Yorumlar',
        type: 'bar',
        data: posts.map(post => post.comment_count), // Yorum sayıları
        itemStyle: { color: '#FF6384' }, // Çubuk rengi
      },
    ],
  });
};

// Metni Kısaltma Fonksiyonu
const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// "Daha Fazla Göster" Fonksiyonu
const toggleReadMore = (index) => {
  posts.value[index].isExpanded = !posts.value[index].isExpanded;
};
</script>

<style scoped>
.posts-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.post-card {
  border: 1px solid #ccc;
  padding: 16px;
  width: 300px;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.post-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
</style>