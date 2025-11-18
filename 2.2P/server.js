const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/add", (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const sum = a+b;
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "ERROR" });
    }

    res.json({
        a,
        b,
        sum
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

