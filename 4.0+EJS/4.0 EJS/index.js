import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {

    const today = new Date("July 14, 2024 01:15:00");
    const day = today.getDay();
    console.log(day);
    

    let type = "a weekday";
    let adv = "it's time to work Hard";

    if (day === 0 || day == 6) {
        type = "the weekend";
        adv = "Have Fun";
            
    } 

    res.render("index.ejs", {
        dayType: type,
        advice: adv,
    })
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});