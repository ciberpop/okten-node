const path= require('path');
const fs = require('fs');

function changeFiles(from, to) {
    fs.readdir(path.join(__dirname, from), (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                fs.rename(path.join(from, file), path.join(to, file), err => {
                    if (err) console.log(err)
                })
            })
        }
    })
}

changeFiles('18.00', '20.00')
changeFiles('20.00', '18.00')



