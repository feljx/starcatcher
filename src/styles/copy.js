const fs = require('fs')

function readFiles (source, predicate) {
    return new Promise((resolve, reject) => {
        fs.readdir(source, (err, files) => {
            if (err) {
                reject(err)
            }
            resolve(files.filter(predicate))
        })
    })
}

async function copyFiles (source, target, predicate) {
    try {
        const files = await readFiles(source, predicate)
        for (const file of files) {
            fs.copyFileSync(`${__dirname}/${file}`, `${target}/${file}`)
        }
    } catch (error) {
        console.log(error)
    }
}

const stylesFolder = __dirname
const outputFolder = '/docs'
const _outputFolder = process.cwd() + outputFolder
const isCssFile = (file) => file.split('.').pop() === 'css'

copyFiles(stylesFolder, _outputFolder, isCssFile)
