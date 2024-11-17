import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;

const newTagButton = '.ember-view.gh-btn.gh-btn-primary';
const nameTag = '#tag-name';
const colorHexadecimalTag = '[data-test-input="accentColor"]';
const descriptionTag = '#tag-description';
const imageTag = '.x-file-input';
const saveButtonTag = '[data-test-button="save"]';
const backButtonTag = '[data-test-link="tags-back"]';
const tableTags = '.view-container.content-list'
const listNameTag = '.gh-tag-list-name'
const leavePageButtonTag = '.modal-footer > .gh-btn-red > span'
const imageFilledTag = '.image-action';


/**
 * Clase que representa la página de gestión de tags (etiquetas).
 * Utiliza Faker para generar datos de prueba dinámicos para los tags.
 */
class TagPage {

    // Contador para los screenshots
    screenshotCounter = 0;
    currentTest = Cypress.currentTest?.title || 'unnamedTest'
    datetime = new Date().toISOString().replace(/:/g,".");

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
      * Toma un screenshot con un nombre único y ordenado.
      * @param {string} name - Nombre del screenshot.
      */
    takeScreenshot(name) {
        const pathScreenShot = Cypress.currentTest.title
        if (pathScreenShot != this.currentTest){
            this.currentTest = Cypress.currentTest.title
            this.screenshotCounter = 0
            this.datetime = new Date().toISOString().replace(/:/g,".");
        }
        const formattedCounter = String(this.screenshotCounter).padStart(3, '0'); // Formatea el número con ceros iniciales
        const screenshotName = `${formattedCounter}_${name}`;
        cy.screenshot(`${this.datetime}-${pathScreenShot}/${screenshotName}`);
        this.screenshotCounter++; // Incrementa el contador
        
    }

    /**
     * Navega a la página de creación de un nuevo tag y hace clic en el botón para crear uno.
     */
    NavigateToCreateNewTag() {
        this.takeScreenshot('BeforeNavigateToNewTag')
        cy.get(newTagButton).click();
        this.takeScreenshot('AfterNavigateToNewTag')
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
        this.takeScreenshot('tagBeforeClearAndType')
        cy.get(nameTag).clear().type(tagName_);
        this.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        this.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        this.takeScreenshot('fillDescriptionTag')
        cy.get(imageTag).attachFile(tagImage_);
        this.takeScreenshot('AttachFileTag')
        cy.wait(delay);
        this.takeScreenshot('tagAfterClearAndType')
    }

    /**
     * Limpia y rellena los campos del formulario para editar un tag existente.
     * @param {string} tagName_ - Nombre editado del tag.
     * @param {string} tagColor_ - Color editado del tag en hexadecimal sin '#'.
     * @param {string} tagDescription_ - Descripción editada del tag.
     * @param {string} tagImage_ - Ruta de la imagen editada del tag.
     */
    ClearAndTypeTagEdit(tagName_ = this.tagNameEdit, tagColor_ = this.tagColorEdit, tagDescription_ = this.tagDescriptionEdit, tagImage_ = this.tagImageEdit) {
        this.takeScreenshot('tagBeforeEdited')
        cy.get(nameTag).clear().type(tagName_);
        this.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        this.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        this.takeScreenshot('fillDescriptionTag')
        cy.get(imageFilledTag).click();
        this.takeScreenshot('deleteImageTag')
        cy.get(imageTag).attachFile(tagImage_);
        this.takeScreenshot('AttachFileTag')
        cy.wait(delay);
        this.takeScreenshot('tagAfterEdited')
    }

    /**
     * Limpia todos los campos del formulario de tag sin escribir nuevos datos.
     */
    ClearTag() {
        this.takeScreenshot('tagBeforeClear');
        cy.get(nameTag).clear();
        this.takeScreenshot('clearNameTag');
        cy.get(colorHexadecimalTag).clear();
        this.takeScreenshot('clearColorTag');
        cy.get(descriptionTag).clear();
        this.takeScreenshot('clearDescriptionTag')
        cy.get(imageTag).invoke('val', null);
        this.takeScreenshot('clearImageTag')
        cy.wait(delay);
        this.takeScreenshot('tagAfterClear');
    }

    /**
     * Guarda el tag actual haciendo click en el botón de guardado.
     */
    saveButtonTag() {
        this.takeScreenshot('tagBeforeSaveButton')
        cy.get(saveButtonTag).click();
        this.takeScreenshot('tagAfterSaveButton')
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
     * Intenta crear un nuevo tag con todos los campos en blanco y luego guarda.
     */
    CreateTagWitAllFieldsBlank() {
        this.NavigateToCreateNewTag();
        this.ClearTag();
        this.saveButtonTag();
    }

    /**
    * Crea un nuevo tag, luego lo edita y guarda los cambios.
    */
    CreateTagAndEdit() {
        this.CreateTag();
        this.SeeTagCreated();
        this.ClearAndTypeTagEdit();
        this.saveButtonTag();
    }

    /**
     * Crea un nuevo tag, luego lo edita y sale sin guardar los cambios.
     */
    CreateTagEditAndCancel() {
        this.CreateTag();
        this.SeeTagCreated();
        this.ClearAndTypeTagEdit();
        this.seeTagsLeavePage();
    }

    /**
     * Navega a la lista de tags para verificar si el tag con el nombre especificado ha sido creado.
     * @param {string} tagName_ - Nombre del tag creado (opcional, por defecto usa el nombre actual de la propiedad).
     */
    SeeTagCreated(tagName_ = this.tagName) {
        this.takeScreenshot('BeforeTagCreated')
        cy.get(backButtonTag).click();
        this.takeScreenshot('ListTagCreated')
        cy.wait(delay);
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        this.takeScreenshot('AfterTagCreated')
        cy.wait(delay);
    }

    /**
     * Navega a la lista de tags para verificar si el tag editado con el nuevo nombre especificado ha sido actualizado.
     * @param {string} tagName_ - Nombre editado del tag (opcional, por defecto usa el nombre editado de la propiedad).
     */
    SeeTagEdited(tagName_ = this.tagNameEdit) {
        this.takeScreenshot('BeforeTagEdited')
        cy.get(backButtonTag).click();
        cy.wait(delay);
        this.takeScreenshot('ListTagedited')
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        cy.wait(delay);
        this.takeScreenshot('TagEdited')
        cy.get(backButtonTag).click();
        cy.wait(delay);
        this.takeScreenshot('AfterTagEdited')
    }

    /**
     * Navega fuera de la página de tags y confirma el abandono.
     */
    seeTagsLeavePage() {
        this.takeScreenshot('BeforeLeavePageTag')
        cy.get(backButtonTag).click();
        this.takeScreenshot('ModalBeforeLeavePageTag')
        cy.wait(delay);
        cy.get(leavePageButtonTag).click();
        this.takeScreenshot('AfterLeavePageTag')
        cy.wait(delay);
    }

    /**
     * Busca y selecciona un tag específico en la lista de tags.
     * 
     * @param {string} tagName_ - Nombre del tag a buscar (por defecto usa `this.tagName`).
     */
    seeTagsLeavePageCancel(tagName_ = this.tagName) {
        this.takeScreenshot('BeforeSeeTagsLeavePageCancel')
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        this.takeScreenshot('AfterSeeTagsLeavePageCancel')
        cy.wait(delay);
    }
}

export const tagPage = new TagPage()