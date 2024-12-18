import { faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
import { screenshot } from '../Screenshots';

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
        cy.get(nameTag).clear().type(tagName_);
        screenshot.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        screenshot.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        screenshot.takeScreenshot('fillDescriptionTag')
        cy.get(imageTag).attachFile(tagImage_);
        screenshot.takeScreenshot('AttachFileTag')
        cy.wait(delay);
        screenshot.takeScreenshot('tagAfterClearAndType')
    }

    /**
     * Limpia y rellena los campos del formulario para editar un tag existente.
     * @param {string} tagName_ - Nombre editado del tag.
     * @param {string} tagColor_ - Color editado del tag en hexadecimal sin '#'.
     * @param {string} tagDescription_ - Descripción editada del tag.
     * @param {string} tagImage_ - Ruta de la imagen editada del tag.
     */
    ClearAndTypeTagEdit(tagName_ = this.tagNameEdit, tagColor_ = this.tagColorEdit, tagDescription_ = this.tagDescriptionEdit, tagImage_ = this.tagImageEdit) {
        screenshot.takeScreenshot('tagBeforeEdited')
        cy.get(nameTag).clear().type(tagName_);
        screenshot.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        screenshot.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        screenshot.takeScreenshot('fillDescriptionTag')
        cy.get(imageFilledTag).click();
        screenshot.takeScreenshot('deleteImageTag')
        cy.get(imageTag).attachFile(tagImage_);
        screenshot.takeScreenshot('AttachFileTag')
        cy.wait(delay);
        screenshot.takeScreenshot('tagAfterEdited')
    }

    /**
     * Limpia todos los campos del formulario de tag sin escribir nuevos datos.
     */
    ClearTag() {
        screenshot.takeScreenshot('tagBeforeClear');
        cy.get(nameTag).clear();
        screenshot.takeScreenshot('clearNameTag');
        cy.get(colorHexadecimalTag).clear();
        screenshot.takeScreenshot('clearColorTag');
        cy.get(descriptionTag).clear();
        screenshot.takeScreenshot('clearDescriptionTag')
        cy.get(imageTag).invoke('val', null);
        screenshot.takeScreenshot('clearImageTag')
        cy.wait(delay);
        screenshot.takeScreenshot('tagAfterClear');
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
        screenshot.takeScreenshot('BeforeTagCreated')
        cy.get(backButtonTag).click();
        screenshot.takeScreenshot('ListTagCreated')
        cy.wait(delay);
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        screenshot.takeScreenshot('AfterTagCreated')
        cy.wait(delay);
    }

    /**
     * Navega a la lista de tags para verificar si el tag editado con el nuevo nombre especificado ha sido actualizado.
     * @param {string} tagName_ - Nombre editado del tag (opcional, por defecto usa el nombre editado de la propiedad).
     */
    SeeTagEdited(tagName_ = this.tagNameEdit) {
        screenshot.takeScreenshot('BeforeTagEdited')
        cy.get(backButtonTag).click();
        cy.wait(delay);
        screenshot.takeScreenshot('ListTagedited')
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        cy.wait(delay);
        screenshot.takeScreenshot('TagEdited')
        cy.get(backButtonTag).click();
        cy.wait(delay);
        screenshot.takeScreenshot('AfterTagEdited')
    }

    /**
     * Navega fuera de la página de tags y confirma el abandono.
     */
    seeTagsLeavePage() {
        screenshot.takeScreenshot('BeforeLeavePageTag')
        cy.get(backButtonTag).click();
        screenshot.takeScreenshot('ModalBeforeLeavePageTag')
        cy.wait(delay);
        cy.get(leavePageButtonTag).click();
        screenshot.takeScreenshot('AfterLeavePageTag')
        cy.wait(delay);
    }

    /**
     * Busca y selecciona un tag específico en la lista de tags.
     * 
     * @param {string} tagName_ - Nombre del tag a buscar (por defecto usa `this.tagName`).
     */
    seeTagsLeavePageCancel(tagName_ = this.tagName) {
        screenshot.takeScreenshot('BeforeSeeTagsLeavePageCancel')
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        screenshot.takeScreenshot('AfterSeeTagsLeavePageCancel')
        cy.wait(delay);
    }
}

export const tagPage = new TagPage();