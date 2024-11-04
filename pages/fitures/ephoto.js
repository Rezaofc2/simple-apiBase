const axios = require("axios");
const cheerio = require("cheerio");
const FormData = require("form-data");
const allowedApiKeys = require("../../declaration/arrayKey.jsx");

// Mapping efek ke URL ephoto360 yang sesuai
const effectUrls = {
    glitchtext: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
    writetext: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
    advancedglow: 'https://en.ephoto360.com/advanced-glow-effects-74.html',
    typographytext: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
    pixelglitch: 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
    neonglitch: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
    flagtext: 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html',
    flag3dtext: 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
    deletingtext: 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
    blackpinkstyle: 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
    glowingtext: 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
    underwatertext: 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html',
    logomaker: 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
    cartoonstyle: 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html',
    papercutstyle: 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
    watercolortext: 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html',
    effectclouds: 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html',
    blackpinklogo: 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
    gradienttext: 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
    summerbeach: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html',
    luxurygold: 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
    multicoloredneon: 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html',
    sandsummer: 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html',
    galaxywallpaper: 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html',
    style1917: 'https://en.ephoto360.com/1917-style-text-effect-523.html',
    makingneon: 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html',
    royaltext: 'https://en.ephoto360.com/royal-text-effect-online-free-471.html',
    freecreate: 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html',
    galaxystyle: 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html',
    amongustext: 'https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html',
    rainytext: 'https://en.ephoto360.com/foggy-rainy-text-effect-75.html'
};

async function ephoto(url, textInput) {
    let formData = new FormData();

    let initialResponse = await axios.get(url, {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
        }
    });

    let $ = cheerio.load(initialResponse.data);
    let token = $('input[name=token]').val();
    let buildServer = $('input[name=build_server]').val();
    let buildServerId = $('input[name=build_server_id]').val();

    formData.append('text[]', textInput);
    formData.append('token', token);
    formData.append('build_server', buildServer);
    formData.append('build_server_id', buildServerId);

    let postResponse = await axios({
        url: url,
        method: 'POST',
        data: formData,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'cookie': initialResponse.headers['set-cookie']?.join('; '),
            ...formData.getHeaders()
        }
    });

    let $$ = cheerio.load(postResponse.data);
    let formValueInput = JSON.parse($$('input[name=form_value_input]').val());
    formValueInput['text[]'] = formValueInput.text;
    delete formValueInput.text;

    let { data: finalResponseData } = await axios.post('https://en.ephoto360.com/effect/create-image', new URLSearchParams(formValueInput), {
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            'cookie': initialResponse.headers['set-cookie']?.join('; ')
        }
    });

    // Cek jika finalResponseData berisi url image
    if (!finalResponseData || !finalResponseData.image) {
        throw new Error('Gagal mendapatkan URL gambar dari ephoto360');
    }

    return buildServer + finalResponseData.image;
}

module.exports = async (req, res) => {
    const command = req.query.command; // Ambil command dari query
    const textInput = req.query.text || "";
    const apiKey = req.query.apiKey;

    if (!textInput) {
        return res.status(400).json({
            error: "Mau nanya apa lu njir"
        });
    }

    if (!apiKey || !allowedApiKeys.includes(apiKey)) {
        return res.status(403).json({
            error: "Input Parameter Apikey !"
        });
    }

    let url = effectUrls[Object.keys(effectUrls).find(effect => new RegExp(effect).test(command))];

    if (!url) {
        return res.status(400).json({
            error: "Efek tidak ditemukan. Pastikan efek yang diminta tersedia."
        });
    }

    try {
        const imageUrl = await ephoto(url, textInput);
        res.status(200).json({
            status: true,
            creator: "krizz",
            data: imageUrl
        });
    } catch (error) {
        console.error("Error creating image:", error);
        res.status(500).json({
            error: "Ada masalah, coba lagi nanti"
        });
    }
};
