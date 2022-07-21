const fs = requires('fs');

const writeFile = fileContent => {
    return new Promise((resolve,reject) =>{
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err){
                reject(err);
                // return out of the funciton here to make suer the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve,reject) =>{
        fs.copyFile('./src/style.css', './dist/style.html', err => {
            // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err){
                reject(err);
                // return out of the funciton here to make suer the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'Style sheet copied successfully!'
            });
        });
    });
}

module.exports = {
    writeFile: writeFile,
    copyFile: copyFile
};

// or
// module.exports = { writeFile, copyFile };