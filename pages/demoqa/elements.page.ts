import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { NEW_USER_DATA } from '../../helpers/constants.helper';
import { retryAction } from '../../helpers/utils.helper';
import { link } from 'fs';

export class ElementsPage extends BasePage {

    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly submitButton: Locator;
    readonly outputDiv: Locator;
    readonly actualAddressInput: Locator;
    readonly permanentAddressInput: Locator;
    readonly resultDiv: Locator;
    readonly resultText: Locator;
    readonly addButton: Locator;
    readonly searchBox: Locator;
    readonly tableRows: Locator;
    readonly submitFormButton: Locator;
    readonly formFields = {
        firstName: this.page.locator('#firstName'),
        lastName: this.page.locator('#lastName'),
        email: this.page.locator('#userEmail'),
        age: this.page.locator('#age'),
        salary: this.page.locator('#salary'),
        department: this.page.locator('#department')
    }
    readonly rowsPerPageSelect: Locator;
    readonly doubleClickButton: Locator;
    readonly rightClickButton: Locator;
    readonly dynamicClickButton: Locator;
    readonly dcMessage: Locator;
    readonly rcMessage: Locator;
    readonly scMessage: Locator;
    readonly simpleLinkHome: Locator;
    readonly dynamicLinkHome: Locator;
    readonly linkResponseDiv: Locator;
    readonly validLinkBtn: Locator;
    readonly brokenLinkBtn: Locator;
    readonly validImage: Locator;
    readonly brokenImage: Locator;
    readonly downloadLink: Locator;
    readonly uploadInput: Locator;
    readonly uploadStatus: Locator;
    readonly enabledAfterButton: Locator;
    readonly colorChangeButton: Locator;
    readonly visibleAfterButton: Locator;


    constructor(page: Page) {
        super(page);
        this.fullNameInput = page.locator('#userName');
        this.emailInput = page.locator('#userEmail');
        this.actualAddressInput = page.locator('#currentAddress');
        this.permanentAddressInput = page.locator('#permanentAddress');
        this.submitButton = page.locator('#submit');
        this.outputDiv = page.locator('#output');
        this.resultDiv = page.locator('#result');
        this.resultText = page.locator('.text-success');
        this.addButton = page.locator('#addNewRecordButton');
        this.searchBox = page.locator('#searchBox');
        this.tableRows = page.locator('.rt-tbody .rt-tr-group');
        this.submitFormButton = page.locator('#submit');
        this.rowsPerPageSelect = page.locator('select[aria-label="rows per page"]');
        this.doubleClickButton = page.locator('#doubleClickBtn');
        this.rightClickButton = page.locator('#rightClickBtn');
        this.dynamicClickButton = page.locator("//button[normalize-space(text())='Click Me']");
        this.dcMessage = page.locator('#doubleClickMessage');
        this.rcMessage = page.locator('#rightClickMessage');
        this.scMessage = page.locator('#dynamicClickMessage');
        this.simpleLinkHome = page.locator('#simpleLink');
        this.dynamicLinkHome = page.locator('#dynamicLink');
        this.linkResponseDiv = page.locator('#linkResponse');
        this.validLinkBtn = page.getByRole('link', { name: 'Click Here for Valid Link' });
        this.brokenLinkBtn = page.getByRole('link', { name: 'Click Here for Broken Link' });
        this.validImage = page.locator('p:has-text("Valid image") + img');
        this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
        this.downloadLink = page.locator('#downloadButton');
        this.uploadInput = page.locator('#uploadFile');
        this.uploadStatus = page.locator('#uploadedFilePath');
        this.enabledAfterButton = page.locator('#enableAfter');
        this.colorChangeButton = page.locator('#colorChange');
        this.visibleAfterButton = page.locator('#visibleAfter');
    }

    async goToSubMenu(subMenuName: string) {
        const leftPanel = this.page.locator('.left-pannel'); 
        await leftPanel.getByText(subMenuName, { exact: true }).click();
    }

    async submitTextBoxForm(fullName: string, email: string, actualAddress: string, permanentAddress: string) {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.actualAddressInput.fill(actualAddress);
        await this.permanentAddressInput.fill(permanentAddress);
        await this.submitButton.click();
    }

    async checkBoxExpandAll() {
        await this.page.locator('.rct-option.rct-option-expand-all').click();
    }

    async expandNodeById(nodeId: string) {
        const nodeLocator = this.page.locator(`span.rct-text:has(label[for="${nodeId}"]) button[title="Toggle"]`);
        await nodeLocator.click();
    }

    async selectCheckBoxById(checkboxId: string) {
        await this.page.locator(`label[for="${checkboxId}"]`).click();
    }

    async selectRadioButtonById(radioId: string) {
        await this.page.locator(`label[for="${radioId}"]`).click();
    }

    async openAddNewRecordForm() {
        await this.addButton.click();
    }

    async fillRegistrationForm(data: typeof NEW_USER_DATA){
        await this.formFields.firstName.fill(data.FIRST_NAME);
        await this.formFields.lastName.fill(data.LAST_NAME);
        await this.formFields.email.fill(data.EMAIL);
        await this.formFields.age.fill(data.AGE);
        await this.formFields.salary.fill(data.SALARY);
        await this.formFields.department.fill(data.DEPARTMENT);
        await this.submitFormButton.click();
    }

    getEditButtonByEmail(email: string): Locator {
        return this.tableRows
        .filter({ hasText: email})
        .locator('[title="Edit"]');
    }

    getDeleteButtonByEmail(email: string): Locator {
        return this.tableRows
        .filter({ hasText: email})
        .locator('[title="Delete"]');
    }

    async selectRowsPerPage(selectedRows: string) {
        await this.rowsPerPageSelect.selectOption(selectedRows);
    }

    async doubleClickButtonAction() {
        await retryAction( 
            () => this.doubleClickButton.dblclick(),
            5,
            200
        );
    }

    async rightClickButtonAction() {
        await this.rightClickButton.click({ button: 'right' });
    }

    async dynamicClickButtonAction() {
        await this.dynamicClickButton.click({ force: true });
    }

    async navigateToViaLink(linkLocator: Locator): Promise<Page> {
        const [newPage] = await Promise.all([
                this.page.waitForEvent('popup'),
                linkLocator.click(), 
            ]);
        return newPage;
    }

    async clickApiLinkById(linkId: string) {
        await this.page.locator(`#${linkId}`).click();
    }

    async getPageStatusCode(linkLocator: Locator): Promise<number> {
        const href = await linkLocator.getAttribute('href');
        const [response] = await Promise.all([
            this.page.waitForResponse(response => response.url().includes(href!) && response.request().method() === 'GET'),
            linkLocator.click()
        ]);
        const status = response.status();
        await this.page.goBack();
        return status;
    }

    async getImageWidth(linkLocator: Locator): Promise<number> {
        return await linkLocator.evaluate((img: HTMLImageElement) => img.naturalWidth);
    }

    async downloadFile(): Promise<string> {
        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadLink.click()
        ]);
        return download.suggestedFilename();
    }

    async uploadFile(filePath: string) {
        await this.uploadInput.setInputFiles(filePath);
    }
}