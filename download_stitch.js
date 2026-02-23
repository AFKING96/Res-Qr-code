const fs = require('fs');
const https = require('https');
const path = require('path');

const screens = [
    { name: 'Order_Confirmation.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FkMzE3ZDNiOTVjYjQ3OTE5YmY4Y2MyYTU2N2I0NTBiEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Order_Tracking.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2UyMTM3YWZmYjU3YzQ3M2ViODg2M2ZjNmY3ZWRkZTBlEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Admin_Dashboard.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYwMGU3NGM4YmFlMTQyMTM4M2Q4ZmFhN2ZkOTE2MzdiEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Cashier_Dashboard.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZlODU3NDIzOTJlZjRkNGFiODc1NTFiOGIyZDEzNzJkEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Staff_Login.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ1ZmYyMGQ4NTE3NTQ0MmRiOGUzODFiOGUyNTc4OTY4EgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Menu_Page_1.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg0NzQ5MzA5NTZkNzQ4Y2FiMmM5ZjM4YzRhNzA5MGZmEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Menu_Page_2.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzUyOGQzOTBhMDRjODQxOGE5ZGYyMmM0MmY4ZWFjOWYxEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Cart.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU2Mzk1MDYyMzVkMjQwOThhMDc4ZWFkZmQwMTJmY2IxEgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' },
    { name: 'Kitchen_Dashboard.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2NmNGZhYmQzMTAxOTQxMDRhZTdlZDk1NTNjYzY1MWM0EgsSBxCazoSmyxsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMjQ0NzIxNzAzMjI4MDcxMjY4Mg&filename=&opi=89354086' }
];

const dir = path.join(__dirname, 'stitch_reference');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, function (response) {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle redirect
                download(response.headers.location, dest).then(resolve).catch(reject);
            } else {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(resolve);
                });
            }
        }).on('error', function (err) {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function main() {
    for (const screen of screens) {
        const dest = path.join(dir, screen.name);
        console.log(`Downloading ${screen.name}...`);
        try {
            await download(screen.url, dest);
            console.log(`Saved ${screen.name}`);
        } catch (e) {
            console.error(`Failed to download ${screen.name}`, e);
        }
    }
}

main();
