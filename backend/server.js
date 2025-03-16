const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const GOLD_PRICE = 2000; // Sabit altın fiyatı

app.use(cors());

// Ürün verilerini JSON dosyasından okuma fonksiyonu
const getProducts = () => {
    const rawData = fs.readFileSync(PRODUCTS_FILE);
    return JSON.parse(rawData);
};

// API endpoint'i: Ürünleri fiyat hesaplamasıyla döndürür
app.get('/products', (req, res) => {
    const products = getProducts();
    
    const productsWithPrice = products.map(product => ({
        ...product,
        price: ((product.popularityScore + 1) * product.weight * GOLD_PRICE).toFixed(2)
    }));

    res.json(productsWithPrice);
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Backend çalışıyor: http://localhost:${PORT}`);
});
