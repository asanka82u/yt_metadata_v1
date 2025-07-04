
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/extract-metadata', async (req, res) => {
    const youtubeUrl = req.body.url;

    if (!youtubeUrl) {
        return res.status(400).json({ error: 'YouTube URL is required.' });
    }

    try {
        const response = await axios.get(youtubeUrl);
        const html = response.data;
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content');
        const description = $('meta[property="og:description"]').attr('content');
        const thumbnailUrl = $('meta[property="og:image"]').attr('content');
        const keywords = $('meta[name="keywords"]').attr('content');

        // Attempt to extract tags from keywords or other meta tags
        let tags = [];
        if (keywords) {
            tags = keywords.split(',').map(tag => tag.trim());
        }

        // Fallback for description if og:description is not found
        if (!description) {
            const metaDescription = $('meta[name="description"]').attr('content');
            if (metaDescription) {
                description = metaDescription;
            }
        }

        res.json({
            title,
            description,
            thumbnailUrl,
            keywords: keywords ? keywords.split(',').map(kw => kw.trim()) : [],
            tags
        });

    } catch (error) {
        console.error('Error extracting metadata:', error.message);
        res.status(500).json({ error: 'Failed to extract metadata. Please check the URL.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
