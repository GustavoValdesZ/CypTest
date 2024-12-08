describe('Categorias Page', () => {
  beforeEach(() => {
    // Navegar a la página de categorías
    cy.visit('/categorias');
  });

  it('debería mostrar el título de la página', () => {
    cy.get('ion-title').contains('Categorías');
  });

  it('debería mostrar todas las categorías con sus imágenes y nombres', () => {
    const categorias = ['Accion', 'Aventura', 'Deportes', 'Shooter', 'Terror'];

    // Verifica que la lista de categorías tiene el número correcto de elementos
    cy.get('.categorias-list .categoria-item').should('have.length', categorias.length);

    // Verifica cada categoría
    categorias.forEach((categoria, index) => {
      cy.get(`.categorias-list .categoria-item:nth-child(${index + 1})`)
        .within(() => {
          cy.get('.categoria-imagen').should('have.attr', 'alt', categoria);
          cy.get('h3').contains(categoria);
        });
    });
  });

  it('debería navegar a la página de la categoría al hacer clic en un enlace', () => {
    cy.get('.categorias-list .categoria-item').first().click();

    // Asegúrate de que el navegador cambió a la URL correcta
    cy.url().should('include', '/accion');
  });
});
