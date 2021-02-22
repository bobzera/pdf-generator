const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')
const app = express()

const fitters = [
    {
        name: "Weslley Oliveria",
        batFitterName: "O Rei",
        horasDeVoo: 3000
    },
    {
        name: "Igor Oliveria",
        batFitterName: "Ta pra trampo ",
        horasDeVoo: 300
    },
    {
        name: "Lucas Aranha",
        batFitterName: "Batman",
        horasDeVoo: 1000
    },
    {
        name: "Fabio Dantas",
        batFitterName: "O aprendiz",
        horasDeVoo: 800
    },
    {
        name: "Igor Oliveria",
        batFitterName: "Ta pra trampo ",
        horasDeVoo: 300
    },
    {
        name: "Lucas Aranha",
        batFitterName: "Batman",
        horasDeVoo: 1000
    },
    {
        name: "Fabio Dantas",
        batFitterName: "O aprendiz",
        horasDeVoo: 800
    }
]

app.get('/pdf', async(request, response) =>{

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter'
        
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)

})

app.get('/', (request, response) => {
    
    //vai no caminhdo da pagia e envia os dados do fitter    
    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { fitters }, (err, data) => {
        if(err){
            return response.send('erro na leirutura dos dados')
        }

                
        return response.send(data) 
    })

})

app.listen(3000)