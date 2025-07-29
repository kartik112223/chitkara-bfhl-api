const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ... rest of your code

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concatChars = [];

    for (let item of data) {
        if (/^\d+$/.test(item)) {
            const num = parseInt(item);
            if (num % 2 === 0) {
                even_numbers.push(item);
            } else {
                odd_numbers.push(item);
            }
            sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
            concatChars.push(item);
        } else {
            special_characters.push(item);
        }
    }

    let reversedConcat = concatChars.join('').split('').reverse();
    let concat_string = reversedConcat.map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');

    const response = {
        is_success: true,
        user_id: "your_full_name_ddmmyyyy".toLowerCase(),
        email: "your_email@example.com",
        roll_number: "YOURROLL123",
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string
    };

    res.status(200).json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
