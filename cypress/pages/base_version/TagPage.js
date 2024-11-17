import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
import { screenshot } from '../Screenshots';

const newTagButton = '.ember-view.gh-btn.gh-btn-primary';
const nameTag = '#tag-name';
const colorHexadecimalTag = '.input-color > .gh-input';
const descriptionTag = '#tag-description';
const imageTag = '.x-file-input';
const saveButtonTag = '.gh-btn.gh-btn-primary.gh-btn-icon.ember-view';
const backButtonTag = 'h2.gh-canvas-title > a';
const tableTags = '.view-container.content-list'
const listNameTag = '.gh-tag-list-name'


/**
 * Clase que representa la página de gestión de tags (etiquetas).
 * Utiliza Faker para generar datos de prueba dinámicos para los tags.
 */
class TagPage {

    // Propiedades para los datos de un nuevo tag
    tagName = faker.word.adjective();
    tagColor = faker.color.rgb().substring(1);
    tagDescription = faker.lorem.paragraph()
    tagImage = '../fixtures/image.png'

    // Propiedades para los datos de edición de un tag existente
    tagNameEdit = faker.word.adjective();
    tagColorEdit = faker.color.rgb().substring(1);
    tagDescriptionEdit = faker.lorem.paragraph()
    tagImageEdit = '../fixtures/image2.png'

    /**
     * Navega a la página de creación de un nuevo tag y hace clic en el botón para crear uno.
     */
    NavigateToCreateNewTag() {
        screenshot.takeScreenshot('BeforeNavigateToNewTag')
        cy.get(newTagButton).click();
        screenshot.takeScreenshot('AfterNavigateToNewTag')
        cy.wait(delay);
    }

    /**
     * Limpia y rellena los campos del formulario de creación de un nuevo tag.
     * @param {string} tagName_ - Nombre del tag.
     * @param {string} tagColor_ - Color del tag en hexadecimal sin '#'.
     * @param {string} tagDescription_ - Descripción del tag.
     * @param {string} tagImage_ - Ruta de la imagen del tag.
     */
    ClearAndTypeTag(tagName_ = this.tagName, tagColor_ = this.tagColor, tagDescription_ = this.tagDescription, tagImage_ = this.tagImage) {
        screenshot.takeScreenshot('tagBeforeClearAndType')
        cy.get(nameTag).clear().type(tagName_, {force: true});
        screenshot.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_, {force: true});
        screenshot.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        screenshot.takeScreenshot('fillDescriptionTag')
        cy.get(imageTag).attachFile(tagImage_);
        screenshot.takeScreenshot('AttachFileTag')
        cy.wait(delay);
        screenshot.takeScreenshot('tagAfterClearAndType')
    }

    /**
     * Guarda el tag actual haciendo click en el botón de guardado.
     */
    saveButtonTag() {
        screenshot.takeScreenshot('tagBeforeSaveButton')
        cy.get(saveButtonTag).click();
        screenshot.takeScreenshot('tagAfterSaveButton')
        cy.wait(delay);
    }

    /**
     * Crea un nuevo tag diligenciando todos los campos y luego guardando.
     */
    CreateTag() {
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag();
        this.saveButtonTag();
    }

    /**
     * Navega a la lista de tags para verificar si el tag con el nombre especificado ha sido creado.
     * @param {string} tagName_ - Nombre del tag creado (opcional, por defecto usa el nombre actual de la propiedad).
     */
    SeeTagCreated(tagName_ = this.tagName) {
        screenshot.takeScreenshot('BeforeTagCreated')
        cy.get(backButtonTag).click();
        screenshot.takeScreenshot('ListTagCreated')
        cy.wait(delay);
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        screenshot.takeScreenshot('AfterTagCreated')
        cy.wait(delay);
    }
}

export const tagPage = new TagPage();