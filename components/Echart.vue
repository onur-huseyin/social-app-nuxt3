<template>
    <div class="mt-8">
        <div v-if="error">{{ error }}</div>
        <div v-else>
            <!-- ECharts grafiği için div -->
            <div ref="chartDiv" style="height: 400px;"></div>
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
            text: 'Grafik',
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
</script>