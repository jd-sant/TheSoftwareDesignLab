const { faker } = require('@faker-js/faker');
const delay = 2000;
const newTagButton = '.ember-view.gh-btn.gh-btn-primary';
const nameTag = '#tag-name';
const colorHexadecimalTag = '[data-test-input="accentColor"]';
const descriptionTag = '#tag-description';
const imageTag = '.x-file-input input[type="file"]';
const saveButtonTag = '[data-test-button="save"]';
const backButtonTag = '[data-test-link="tags-back"]';
const tableTags = '.view-container.content-list';
const listNameTag = 'h3.gh-tag-list-name'
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
    tagImage = 'features/web/assets/image.png';

    // Propiedades para los datos de edición de un tag existente
    tagNameEdit = faker.word.adjective();
    tagColorEdit = faker.color.rgb().substring(1);
    tagDescriptionEdit = faker.lorem.paragraph();
    tagImageEdit = 'features/web/assets/image2.png';

    /**
     * Navega a la página de creación de un nuevo tag y hace clic en el botón para crear uno.
     */
    async NavigateToCreateNewTag(context) {
        await context.driver.$(newTagButton).click();
        await context.driver.pause(delay);
    }

    /**
     * Limpia y rellena los campos del formulario de creación de un nuevo tag.
     * @param {string} tagName_ - Nombre del tag.
     * @param {string} tagColor_ - Color del tag en hexadecimal sin '#'.
     * @param {string} tagDescription_ - Descripción del tag.
     * @param {string} tagImage_ - Ruta de la imagen del tag.
     */
    async ClearAndTypeTag(context, tagName_ = this.tagName, tagColor_ = this.tagColor, tagDescription_ = this.tagDescription, tagImage_ = this.tagImage) {
        await context.driver.$(nameTag).setValue(tagName_);
        await context.driver.$(colorHexadecimalTag).setValue(tagColor_);
        await context.driver.$(descriptionTag).setValue(tagDescription_);
        await context.driver.$(imageTag).setValue(tagImage_);
        await context.driver.pause(delay);
    }

    /**
     * Limpia todos los campos del formulario de tag sin escribir nuevos datos.
     */
    async ClearTag(context) {
        await context.driver.$(nameTag).clearValue();
        await context.driver.$(colorHexadecimalTag).clearValue();
        await context.driver.$(descriptionTag).clearValue();
        await context.driver.$(imageTag).clearValue();
        await context.driver.pause(delay);
    }

    /**
     * Limpia y rellena los campos del formulario para editar un tag existente.
     * @param {string} tagName_ - Nombre editado del tag.
     * @param {string} tagColor_ - Color editado del tag en hexadecimal sin '#'.
     * @param {string} tagDescription_ - Descripción editada del tag.
     * @param {string} tagImage_ - Ruta de la imagen editada del tag.
     */
    async ClearAndTypeTagEdit(context, tagName_ = this.tagNameEdit, tagColor_ = this.tagColorEdit, tagDescription_ = this.tagDescriptionEdit, tagImage_ = this.tagImageEdit) {
        await context.driver.$(nameTag).clearValue();
        await context.driver.$(nameTag).setValue(tagName_);
        await context.driver.$(colorHexadecimalTag).clearValue()
        await context.driver.$(colorHexadecimalTag).setValue(tagColor_);
        await context.driver.$(descriptionTag).clearValue()
        await context.driver.$(descriptionTag).setValue(tagDescription_);
        await context.driver.$(imageFilledTag).click();
        await context.driver.$(imageTag).setValue(tagImage_);
        await context.driver.pause(delay);
    }

    /**
     * Guarda el tag actual haciendo click en el botón de guardado.
     */
    async saveButtonTag(context) {
        await context.driver.$(saveButtonTag).click();
        await context.driver.pause(delay);
    }

    /**
     * Crea un nuevo tag diligenciando todos los campos y luego guardando.
     */
    async CreateTag(context) {
        await this.NavigateToCreateNewTag(context);
        await this.ClearAndTypeTag(context);
        await this.saveButtonTag(context);
    }

    /**
     * Intenta crear un nuevo tag con todos los campos en blanco y luego guarda.
     */
    async CreateTagWitAllFieldsBlank(context) {
        await this.NavigateToCreateNewTag(context);
        await this.ClearTag(context);
        await this.saveButtonTag(context);
    }

    /**
    * Crea un nuevo tag, luego lo edita y guarda los cambios.
    */
    async CreateTagAndEdit(context) {
        await this.CreateTag(context);
        await this.SeeTagCreated(context);
        await this.ClearAndTypeTagEdit(context);
        await this.saveButtonTag(context);
    }

    /**
     * Crea un nuevo tag, luego lo edita y sale sin guardar los cambios.
     */
    async CreateTagEditAndCancel(context) {
        await this.CreateTag(context);
        await this.SeeTagCreated(context);
        await this.ClearAndTypeTagEdit(context);
        await this.seeTagsLeavePage(context);
    }

    /**
     * Navega a la lista de tags para verificar si el tag con el nombre especificado ha sido creado.
     * @param {string} tagName_ - Nombre del tag creado (opcional, por defecto usa el nombre actual de la propiedad).
     */
    async SeeTagCreated(context, tagName_ = this.tagName) {
        await context.driver.$(backButtonTag).click();
        await context.driver.pause(delay);
        await context.driver.$(tableTags).$(`${listNameTag}*=${tagName_}`).click();
        await context.driver.$(nameTag).click();
        await context.driver.pause(delay);
    }

    /**
     * Navega fuera de la página de tags y confirma el abandono.
     */
    async seeTagsLeavePage(context) {
        await context.driver.$(backButtonTag).click();
        await context.driver.pause(delay);
        await context.driver.$(leavePageButtonTag).click();
        await context.driver.pause(delay);
    }

    /**
     * Navega a la lista de tags para verificar si el tag editado con el nuevo nombre especificado ha sido actualizado.
     * @param {string} tagName_ - Nombre editado del tag (opcional, por defecto usa el nombre editado de la propiedad).
     */
    async SeeTagEdited(context, tagName_ = this.tagNameEdit) {
        await context.driver.$(backButtonTag).click();
        await context.driver.pause(delay);
        await context.driver.$(tableTags).$(`${listNameTag}*=${tagName_}`).click();
        await context.driver.pause(delay);
        await context.driver.$(backButtonTag).click();
        await context.driver.pause(delay);
    }

    /**
     * Busca y selecciona un tag específico en la lista de tags.
     * 
     * @param {string} tagName_ - Nombre del tag a buscar (por defecto usa `this.tagName`).
     */
    async seeTagsLeavePageCancel(context, tagName_ = this.tagName) {
        await context.driver.$(tableTags).$(`${listNameTag}*=${tagName_}`).click();
        await context.driver.$(nameTag).click();
        await context.driver.pause(delay);
    }

}

module.exports = new TagPage();