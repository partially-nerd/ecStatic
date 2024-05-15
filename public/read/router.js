// Run with npm watch

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const mime_maps = {
    js: "javascript",
}

app.use(require('sanitize').middleware);
app.get("*", (req, res) => {
    let url = req.url.startsWith("/") ? "." + req.url : req.url;
    console.log("REQUESTED ", url);
    if (fs.existsSync(url) && fs.statSync(url).isFile()) {
        // if .jsx
        if (url.includes(".jsx")) {
            const data = require(`../../${url}`)(url);
            res.send(data);
        }
        // if .md
        else if (url.includes(".md")) {
            const data = require(`../../public/read/router.jsx`)(url);
            res.setHeader('content-type', `text/html`);
            data.then(resp => {
                // console.log(resp);
                res.send(resp);
            })
        }
        // if neither
        else {
            let ext = url.split(".")[2];
            let mime_type = (mime_maps[ext] !== null && mime_maps[ext] !== undefined) ? mime_maps[ext] : ext;
            res.setHeader('content-type', `text/${mime_type}`);
            const data = fs.readFileSync(url);
            res.send(data);
        }

    } else {
        // 404 file doesn't exist
        const data = require("../../public/read/router.jsx")("public/read/pages/404.md");
        res.send(data);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
