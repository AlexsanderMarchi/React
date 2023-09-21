//para instalar
//npm install cypress --save-dev

//no arquivo json 
//"cypress:open": "cypress open"

//para rodar no cmd
//npm run cypress:open

describe('Sistema da globe deve', () =>  {
    it('Exibir a noticia do Mollusco', ()=> {
        cy.visit('https://g1.com.br')
    })
    
})


