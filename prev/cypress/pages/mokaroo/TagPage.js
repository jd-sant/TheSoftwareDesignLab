import { base, faker } from '@faker-js/faker';
const delay = Cypress.env('delay') || 300;
import { screenshot } from '../Screenshots';

const newTagButton = '.ember-view.gh-btn.gh-btn-primary';
const nameTag = '#tag-name';
const slugTag = '#tag-slug'
const colorHexadecimalTag = '[data-test-input="accentColor"]';
const descriptionTag = '#tag-description';
const imageTag = '.x-file-input';
const metaTitleTag = '#meta-title';
const metaDescriptionTag = '#meta-description';
const saveButtonTag = '[data-test-button="save"]';
const deleteButtonTag = '[data-test-button="delete-tag"]';
const backButtonTag = '[data-test-link="tags-back"]';
const expandMetaData = ':nth-child(1) > .gh-expandable-header > .gh-btn > span'
const tableTags = '.view-container.content-list'
const listNameTag = '.gh-tag-list-name'
const leavePageButtonTag = '.modal-footer > .gh-btn-red > span'
const imageFilledTag = '.image-action';
const titleTag = '.gh-canvas-title';
const errorNameTag = 'span.error p.response:nth-child(1)';
const errorColorTag = 'span.error p.response:nth-child(2)';
const errorDescriptionTag = 'div.form-group.no-margin.error p.response';
const errorSlugTag = 'div.form-group.error p.response';


/**
 * Clase que representa la página de gestión de tags (etiquetas).
 * Utiliza Faker para generar datos de prueba dinámicos para los tags.
 */
class TagPage {
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
    ClearAndTypeTag(tagName_, tagColor_, tagDescription_, tagImage_, tagSlug_) {
        screenshot.takeScreenshot('tagBeforeClearAndType')
        cy.get(nameTag).clear().type(tagName_);
        screenshot.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        screenshot.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        screenshot.takeScreenshot('fillDescriptionTag')
        cy.get(imageTag).attachFile({
            fileContent: tagImage_.split(',')[1],
            fileName: 'image.png',
            mimeType: 'image/png',
            encoding: 'base64'
        });
        screenshot.takeScreenshot('AttachFileTag')
        cy.get(slugTag).clear().type(tagSlug_);
        screenshot.takeScreenshot('fillSlugTag');
        cy.wait(delay);
        screenshot.takeScreenshot('tagAfterClearAndType')
    }

    typeMetaData(tagMetaTitle_, tagMetaDescription_){
        cy.get(expandMetaData).click();
        screenshot.takeScreenshot('AfterExpandMetadata')
        cy.get(metaTitleTag).type(tagMetaTitle_);
        screenshot.takeScreenshot('fillMetaTitle');
        cy.get(metaDescriptionTag).type(tagMetaDescription_);
        screenshot.takeScreenshot('fillMetaDescription');
        cy.wait(delay);
    }

    /**
     * Limpia y rellena los campos del formulario para editar un tag existente.
     * @param {string} tagName_ - Nombre editado del tag.
     * @param {string} tagColor_ - Color editado del tag en hexadecimal sin '#'.
     * @param {string} tagDescription_ - Descripción editada del tag.
     * @param {string} tagImage_ - Ruta de la imagen editada del tag.
     */
    ClearAndTypeTagEdit(tagName_, tagColor_, tagDescription_, tagImage_, tagSlug_) {
        screenshot.takeScreenshot('tagBeforeEdited')
        cy.get(nameTag).clear().type(tagName_);
        screenshot.takeScreenshot('fillNameTag')
        cy.get(colorHexadecimalTag).clear().type(tagColor_);
        screenshot.takeScreenshot('fillColorTag')
        cy.get(descriptionTag).clear().type(tagDescription_);
        screenshot.takeScreenshot('fillDescriptionTag')
        cy.get(imageFilledTag).click();
        screenshot.takeScreenshot('deleteImageTag')
        cy.get(imageTag).attachFile({
            fileContent: tagImage_.split(',')[1],
            fileName: 'image.png',
            mimeType: 'image/png',
            encoding: 'base64'
        });
        screenshot.takeScreenshot('AttachFileTag')
        cy.get(slugTag).clear().type(tagSlug_);
        screenshot.takeScreenshot('fillSlugTag');
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
        cy.get(slugTag).clear()
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
     * Elimina el tag actual haciendo click en el botón de eliminar.
     */
    deleteButtonTag() {
        screenshot.takeScreenshot('tagBeforeDeleteButton')
        cy.get(deleteButtonTag).click();
        screenshot.takeScreenshot('tagAfterDeleteButton')
        cy.wait(delay);
        cy.get(leavePageButtonTag).click()
        cy.wait(delay);
    }

    /**
     * Crea un nuevo tag diligenciando todos los campos y luego guardando.
     */
    CreateTag(tagName, tagColor, tagDescription, tagImage, tagSlug) {
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag(tagName, tagColor, tagDescription, tagImage, tagSlug);
        this.saveButtonTag();
    }

    wrapCreateTag(baseData) {
        this.CreateTag(baseData.tagName, baseData.tagColor.substring(1), baseData.tagDescription, baseData.tagImage, baseData.tagName)
    }


    createTagWithMetaData(baseData){
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag(baseData.tagName, baseData.tagColor.substring(1), baseData.tagDescription, baseData.tagImage, baseData.tagName);
        this.typeMetaData(baseData.tagMetaTitle, baseData.tagMetaDescription);
        this.saveButtonTag();
    }

    /**
     * Crea un nuevo tag superando el limite del name y luego guardando.
     */
    CreateTagLongCharacters(baseData) {
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag(baseData.tagName192, baseData.tagColor.substring(1), baseData.tagDescription, baseData.tagImage, baseData.tagName);
        this.saveButtonTag();
    }

    /**
     * Crea un nuevo tag con color invalido y luego guardando.
     */
    createTagInvalidColor(baseData) {
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag(baseData.tagName, baseData.tagColorInvalid, baseData.tagDescription, baseData.tagImage, baseData.tagName);
        this.saveButtonTag();
    }

    /**
     * Crea un nuevo tag con descripcion larga y luego guardando.
     */
    createTagLongDescription(baseData) {
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag(baseData.tagName, baseData.tagColor.substring(1), baseData.tagDescription501, baseData.tagImage, baseData.tagName);
        this.saveButtonTag();
    }

    /**
     * Crea un nuevo tag con slug largo y luego guardando.
     */
    createTagLongSlug(baseData) {
        this.NavigateToCreateNewTag();
        this.ClearAndTypeTag(baseData.tagName, baseData.tagColor.substring(1), baseData.tagDescription, baseData.tagImage, baseData.tagName192);
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
    CreateTagAndEdit(baseData, baseDataEdit) {
        this.CreateTag(baseData.tagName, baseData.tagColor.substring(1), baseData.tagDescription, baseData.tagImage, baseData.tagName);
        this.SeeTagCreated(baseData.tagName);
        this.ClearAndTypeTagEdit(baseDataEdit.tagName, baseDataEdit.tagColor.substring(1), baseDataEdit.tagDescription, baseDataEdit.tagImage, baseDataEdit.tagName);
        this.saveButtonTag();
    }

    /**
     * Crea un nuevo tag, luego lo edita y sale sin guardar los cambios.
     */
    CreateTagEditAndCancel(baseData, baseDataEdit) {
        this.CreateTag(baseData.tagName, baseData.tagColor.substring(1), baseData.tagDescription, baseData.tagImage, baseData.tagName);
        this.SeeTagCreated(baseData.tagName);
        this.ClearAndTypeTagEdit(baseDataEdit.tagName, baseDataEdit.tagColor.substring(1), baseDataEdit.tagDescription, baseDataEdit.tagImage, baseDataEdit.tagName);
        this.seeTagsLeavePage();
    }

    DeleteTag(baseData) {
        this.wrapCreateTag(baseData);
        this.SeeTagCreated(baseData.tagName);
        this.deleteButtonTag();

    }

    wrapSeeTagCreated(baseData) {
        this.SeeTagCreated(baseData.tagName);
    }

    wrapSeeTagEdited(baseData) {
        this.SeeTagEdited(baseData.tagName)
    }

    wrapSeeTagsLeavePageCancel(baseData) {
        this.seeTagsLeavePageCancel(baseData.tagName)
    }

    /**
     * Navega a la lista de tags para verificar si el tag con el nombre especificado ha sido creado.
     * @param {string} tagName_ - Nombre del tag creado (opcional, por defecto usa el nombre actual de la propiedad).
     */
    SeeTagCreated(tagName_) {
        screenshot.takeScreenshot('BeforeTagCreated')
        cy.get(backButtonTag).click();
        screenshot.takeScreenshot('ListTagCreated')
        cy.wait(delay);
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        cy.get(titleTag).should('contain.text', tagName_);
        screenshot.takeScreenshot('AfterTagCreated')
        cy.wait(delay);
    }

    /**
     * Navega a la lista de tags para verificar si el tag editado con el nuevo nombre especificado ha sido actualizado.
     * @param {string} tagName_ - Nombre editado del tag (opcional, por defecto usa el nombre editado de la propiedad).
     */
    SeeTagEdited(tagNameEdit_) {
        screenshot.takeScreenshot('BeforeTagEdited')
        cy.get(backButtonTag).click();
        cy.wait(delay);
        screenshot.takeScreenshot('ListTagedited')
        cy.get(tableTags).contains(listNameTag, tagNameEdit_).click();
        cy.get(titleTag).should('contain.text', tagNameEdit_);
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
        cy.get(leavePageButtonTag).should('contain.text', 'Leave')
        cy.get(leavePageButtonTag).click();
        screenshot.takeScreenshot('AfterLeavePageTag')
        cy.wait(delay);
    }

    /**
     * Busca y selecciona un tag específico en la lista de tags.
     * 
     * @param {string} tagName_ - Nombre del tag a buscar (por defecto usa `this.tagName`).
     */
    seeTagsLeavePageCancel(tagName_) {
        screenshot.takeScreenshot('BeforeSeeTagsLeavePageCancel')
        cy.get(tableTags).contains(listNameTag, tagName_).click();
        cy.get(titleTag).should('contain.text', tagName_);
        screenshot.takeScreenshot('AfterSeeTagsLeavePageCancel')
        cy.wait(delay);
    }

    seeTagNotCreate(arg) {
        switch (arg) {
            case 'nameTag':
                cy.get(errorNameTag).should('contain.text', 'Tag names cannot be longer than 191 characters.');
                break;

            case 'colorTag':
                cy.get(errorColorTag).should('contain.text', 'The colour should be in valid hex format');
                break;

            case 'descriptionTag':
                cy.get(errorDescriptionTag).should('contain.text', 'Description cannot be longer than 500 characters.');
                break;

            case 'slugTag':
                cy.get(errorSlugTag).should('contain.text', 'URL cannot be longer than 191 characters.');
                break;

            default:
                break;
        }
        cy.get(saveButtonTag)
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq('Retry'); // Remueve espacios al inicio y final
            });
        screenshot.takeScreenshot('seeTagNotCreate');
        cy.wait(delay);
    }

    notSeeTagDelete(baseData) {
        screenshot.takeScreenshot('ListTagCreated')
        cy.wait(delay);
        cy.get(tableTags).should('not.contain.text', baseData.tagName);
    }

    seeTagWithMetaData(baseData){
        screenshot.takeScreenshot('BeforeSeeTagWithMetaData')
        cy.get(backButtonTag).click();
        cy.get(tableTags).contains(listNameTag, baseData.tagName).click();
        cy.get(titleTag).should('contain.text', baseData.tagName);
        cy.get(expandMetaData).click();
        cy.get(metaTitleTag).invoke('val').should('eq', baseData.tagMetaTitle);
        cy.get(metaDescriptionTag).invoke('val').should('eq', baseData.tagMetaDescription)
        screenshot.takeScreenshot('AfterSeeTagWithMetaData')
    }
}

export const tagPage = new TagPage();