describe('Sistema do Cartola deve', () => {
    it('Exibir os clubes', () => {
        cy.visit('http://localhost:5173/')
    })
    
    it('clicar no primeiro time', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[href="/atletas/262"]').click();
    })

    it('dar scroll', () => {
        cy.visit('http://localhost:5173/')
        cy.get('[href="/atletas/262"]').click();
        cy.scrollTo(0, 500)
    })
    
})

