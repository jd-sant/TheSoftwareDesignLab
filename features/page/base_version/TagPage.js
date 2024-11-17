const { faker } = require('@faker-js/faker');
const screenshot = require('../pages/Screenshots');

const delay = 2000;
const newTagButton = '.ember-view.gh-btn.gh-btn-primary';
const nameTag = '#tag-name';
const colorHexadecimalTag = '.input-color > .gh-input';
const descriptionTag = '#tag-description';
const imageTag = '.x-file-input input[type="file"]';
const saveButtonTag = '.gh-btn.gh-btn-primary.gh-btn-icon.ember-view';
const backButtonTag = 'h2.gh-canvas-title > a';
const tableTags = '.view-container.content-list';
const listNameTag = 'h3.gh-tag-list-name'


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
        await screenshot.takeScreenshot(context, 'BeforeNavigateToNewTag')
        await context.driver.$(newTagButton).click();
        await screenshot.takeScreenshot(context, 'AfterNavigateToNewTag')
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
        await screenshot.takeScreenshot(context, 'tagBeforeClearAndType');
        await context.driver.$(nameTag).setValue(tagName_);
        await screenshot.takeScreenshot(context, 'fillNameTag');
        await context.driver.$(colorHexadecimalTag).setValue(tagColor_);
        await screenshot.takeScreenshot(context, 'fillColorTag');
        await context.driver.$(descriptionTag).setValue(tagDescription_);
        await screenshot.takeScreenshot(context, 'fillDescriptionTag');
        await context.driver.$(imageTag).setValue(tagImage_);
        await screenshot.takeScreenshot(context, 'AttachFileTag');
        await context.driver.pause(delay);
        await screenshot.takeScreenshot(context, 'tagAfterClearAndType');
    }

    /**
     * Guarda el tag actual haciendo click en el botón de guardado.
     */
    async saveButtonTag(context) {
        await screenshot.takeScreenshot(context, 'tagBeforeSaveButton');
        await context.driver.$(saveButtonTag).click();
        await screenshot.takeScreenshot(context, 'tagAfterSaveButton');
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
     * Navega a la lista de tags para verificar si el tag con el nombre especificado ha sido creado.
     * @param {string} tagName_ - Nombre del tag creado (opcional, por defecto usa el nombre actual de la propiedad).
     */
    async SeeTagCreated(context, tagName_ = this.tagName) {
        await screenshot.takeScreenshot(context, 'BeforeTagCreated');
        await context.driver.$(backButtonTag).click();
        await screenshot.takeScreenshot(context, 'ListTagCreated');
        await context.driver.pause(delay);
        await context.driver.$(tableTags).$(`${listNameTag}*=${tagName_}`).click();
        await context.driver.$(nameTag).click();
        await screenshot.takeScreenshot(context, 'AfterTagCreated');
        await context.driver.pause(delay);
    }
}

module.exports = new TagPage();