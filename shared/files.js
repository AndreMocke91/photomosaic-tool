const fs = require('fs')
const handlebars = require('handlebars')

const writeFile = async (path, fileContent) => {
  await new Promise((resolve, reject) => {
    fs.writeFile(path, fileContent, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

const readDirectory = async (path) => {
  const filenames = await new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
      }
      resolve(files)
    })
  })

  return filenames
}

const readFile = async path => {
  const buffer = await new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err)
      }
      resolve(buffer)
    })
  })

  return buffer.toString()
}

const compileIndexFile = async campaignID => {
  const campaignJSON = JSON.parse(
    await readFile(`./campaigns/${campaignID}.json`)
  )
  const templateFile = await readFile('./handlebar-templates/index.handlebars')

  const handlebarsTemplate = handlebars.compile(templateFile)

  const result = handlebarsTemplate(campaignJSON)
  return result
}

const makeDirectory = async directoryName => {
  return new Promise((resolve, reject) => {
    fs.stat(directoryName, (error, stats) => {
      if (!error) {
        resolve()
        return
      }
      fs.mkdir(directoryName, err => {
        // check before protects against dir existing
        // istanbul ignore next
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  })
}

const saveCampaignJSON = async (brand) => {
  await writeFile(
    `./campaigns/${brand.projectId}.json`,
    JSON.stringify(brand, null, 2)
  )
}

const compilePublicFiles = async (brand) => {
  const indexResult = await compileIndexFile(brand.projectId)

  await writeFile(
    `./public/index.html`,
    indexResult
  )
}

module.exports = {
  writeFile,
  readDirectory,
  readFile,
  saveCampaignJSON,
  compilePublicFiles,
  compileIndexFile,
  makeDirectory
}
