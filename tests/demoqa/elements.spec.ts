import { test, expect, Page } from '@playwright/test';
import { DemoQaHomePage } from '../../pages/demoqa/home.page';
import { ElementsPage } from '../../pages/demoqa/elements.page';
import { createRandomEmail, createRandomUser } from '../../helpers/testData.helper';
import { DEMOQA_MENU, ADDRESS_TEXT, RADIO_BUTTON_IDS, NEW_USER_DATA, UPDATED_USER_DATA, APILINKS, UPLOAD_FILE_PATH } from '../../helpers/constants.helper';

let homePage: DemoQaHomePage
let elementsPage: ElementsPage

test.describe('Test DemoQA Elements page with POM', () => {

    test.beforeEach(async ({ page }) => {
        homePage = new DemoQaHomePage(page);
        elementsPage = new ElementsPage(page);

        await homePage.navigate();
        await homePage.goToCategory(DEMOQA_MENU.ELEMENTS);
    });

    test('Should fill text boxes and verify the data @textBox', async ({ page }) => {
        
        const testEmail = createRandomEmail('demoQAtest');
        const userName = createRandomUser();
        
        await elementsPage.goToSubMenu(DEMOQA_MENU.TEXT_BOX);
        await elementsPage.submitTextBoxForm(userName, testEmail, ADDRESS_TEXT.ACTUAL_ADDRESS, ADDRESS_TEXT.PERMANENT_ADDRESS);

        await expect(elementsPage.outputDiv, 'The output div must be visible').toBeVisible();
        await expect(elementsPage.outputDiv, 'The output div must contain the email').toContainText(testEmail);
        await expect(elementsPage.outputDiv, 'The output div must contain the permanent address').toContainText(ADDRESS_TEXT.PERMANENT_ADDRESS);
    });

    test('Should expand tree and select checkbox by ID @checkBox', async ({ page }) => {
        
        await elementsPage.goToSubMenu(DEMOQA_MENU.CHECK_BOX);
        await elementsPage.expandNodeById('tree-node-home');
        await elementsPage.expandNodeById('tree-node-documents');
        await elementsPage.expandNodeById('tree-node-office');
        
        await elementsPage.selectCheckBoxById('tree-node-private');

        await expect(elementsPage.resultDiv, 'The result div must be visible').toBeVisible();
        await expect(elementsPage.resultDiv, 'The result div must contain the text "private"').toContainText('private');

    }); 

    test('Should select all available radio buttons and verify result @radioButton', async ({ page }) => {
    
        const optionsToSelect = [
        { id: RADIO_BUTTON_IDS.YES, text: 'Yes' },
        { id: RADIO_BUTTON_IDS.IMPRESSIVE, text: 'Impressive' }
        ];

        await elementsPage.goToSubMenu(DEMOQA_MENU.RADIO_BUTTON);

        for (const option of optionsToSelect) {
            await test.step(`Select: ${option.id} and verify the result`, async () => {
            
                await elementsPage.selectRadioButtonById(option.id);            
                await expect(elementsPage.resultText, `The result must show the text: '${option.text}'`).toHaveText(option.text);
            });
        }

    });

    test('Crud operations on the web table @webTables', async ({ page }) => {

        await elementsPage.goToSubMenu(DEMOQA_MENU.WEB_TABLES);

        await test.step('Add a new record to the table', async () => {
        
            await elementsPage.openAddNewRecordForm();
            await elementsPage.fillRegistrationForm(NEW_USER_DATA);
            
            const newRow = elementsPage.tableRows.filter({ hasText: NEW_USER_DATA.EMAIL });
            await expect(newRow, 'The new row must be present in the table').toBeVisible();
            await expect(newRow).toHaveCount(1);
        });

        await test.step('Search for the recently added record', async () => {
            await elementsPage.searchBox.fill(NEW_USER_DATA.EMAIL);

            const searchedRow = elementsPage.tableRows.filter({ hasText: NEW_USER_DATA.EMAIL });
            await expect(searchedRow, 'The searched row must be present in the table').toBeVisible();
            await expect(searchedRow, 'Only one row must be displayed after search').toHaveCount(1);
        });

        await test.step('Edit the recently added record', async () => {
            
            const editButton = elementsPage.getEditButtonByEmail(NEW_USER_DATA.EMAIL);
            await editButton.click();

            await elementsPage.formFields.firstName.fill(UPDATED_USER_DATA.FIRST_NAME);
            await elementsPage.formFields.lastName.fill(UPDATED_USER_DATA.LAST_NAME);
            await elementsPage.formFields.salary.fill(UPDATED_USER_DATA.SALARY);
            await elementsPage.submitFormButton.click();

            const updatedRow = elementsPage.tableRows.filter({ hasText: NEW_USER_DATA.EMAIL })
            await expect(updatedRow, 'The updated row must reflect the changes').toContainText(UPDATED_USER_DATA.FIRST_NAME);
            await expect(updatedRow, 'The updated row must reflect the changes').toContainText(UPDATED_USER_DATA.LAST_NAME);
            await expect(updatedRow, 'The updated row must reflect the changes').toContainText(UPDATED_USER_DATA.SALARY);
        });

        await test.step('Delete the recently edited record', async () => {
        
            const deleteButton = elementsPage.getDeleteButtonByEmail(NEW_USER_DATA.EMAIL);
            await deleteButton.click();

            const deletedRow = elementsPage.tableRows.filter({ hasText: NEW_USER_DATA.EMAIL });
            await expect(deletedRow, 'The deleted row must no longer be present in the table').toHaveCount(0);
        });

        await test.step('Change rows per page to 5 and verify', async () => {
            await elementsPage.selectRowsPerPage('5');
            await expect(elementsPage.tableRows, 'The number of rows displayed must be equal to 5').toHaveCount(5);
        });
        
        await test.step('Change rows per page to 20 and verify', async () => {
            await elementsPage.selectRowsPerPage('20');
            await expect(elementsPage.tableRows, 'The number of rows displayed must be equal to 20').toHaveCount(20);
        });

    });

    test('Buttons sub menu tests @Buttons', async ({ page }) => {

        await elementsPage.goToSubMenu(DEMOQA_MENU.BUTTONS);
        
        await test.step('Should perform double click', async () => {
            await elementsPage.doubleClickButtonAction();
            await expect(elementsPage.dcMessage, 'The double click message must be visible').toBeVisible();
            await expect(elementsPage.dcMessage, 'The double click message must have the correct text').toHaveText('You have done a double click');
        });

        await test.step('Should perform right click', async () => {
            await elementsPage.rightClickButtonAction();
            await expect(elementsPage.rcMessage, 'The right click message must be visible').toBeVisible();
            await expect(elementsPage.rcMessage, 'The right click message must have the correct text').toHaveText('You have done a right click');
        });

        await test.step('Should perform dynamic click', async () => {
            await elementsPage.dynamicClickButtonAction();
            await expect(elementsPage.scMessage, 'The dynamic click message must be visible').toBeVisible();
            await expect(elementsPage.scMessage, 'The dynamic click message must have the correct text').toHaveText('You have done a dynamic click');
        });
    });

    test('Links sub menu tests @Links', async ({ page }) => {

        await elementsPage.goToSubMenu(DEMOQA_MENU.LINKS);
        
        await test.step('Should click on the simple link and verify navigation', async () => {
            const newPage = await elementsPage.navigateToViaLink(elementsPage.simpleLinkHome);
            await expect(newPage).not.toBeNull();
            await expect(newPage).toHaveURL(/\/$/);
            await newPage.close();
        });

        await test.step('Should click on the dynamic link and verify navigation', async () => {
            const newPage =  await elementsPage.navigateToViaLink(elementsPage.dynamicLinkHome);
            await expect(newPage).not.toBeNull();
            await expect(newPage).toHaveURL(/\/$/);
            await newPage.close();
        });

        await test.step('Should click on API links and verify responses', async () => {
            for (const apiLink of APILINKS) {
                await elementsPage.clickApiLinkById(apiLink.id);
                const expectedResponseText = `Link has responded with staus ${apiLink.code} and status text ${apiLink.message}`;
                await expect(elementsPage.linkResponseDiv, `The link response div must contain the correct response for ${apiLink.id}`).toHaveText(expectedResponseText);
            }
        });
    });

    test('Broken Links - Images sub menu tests @brokenLinksImages', async ({ page }) => {

        await elementsPage.goToSubMenu(DEMOQA_MENU.BROKEN_LINKS_IMAGES);

        await test.step('Should verify valid image is loaded', async () => {
            const imageWidth = await elementsPage.getImageWidth(elementsPage.validImage);
            expect(imageWidth, 'The width of the valid image must be greater than 0').toBeGreaterThan(0);
        });

        await test.step('Should verify broken image is not loaded', async () => {
            const imageWidth = await elementsPage.getImageWidth(elementsPage.brokenImage);
            expect(imageWidth, 'The width of the broken image must be 0').toBe(0);
        });
        
        await test.step('Should verify valid link status code', async () => {
            const statusCode = await elementsPage.getPageStatusCode(elementsPage.validLinkBtn);
            expect(statusCode, 'The status code for the valid link must be 301').toBe(301);
        });
        
        await test.step('Should verify broken link status code', async () => {
            const statusCode = await elementsPage.getPageStatusCode(elementsPage.brokenLinkBtn);
            expect(statusCode, 'The status code for the broken link must be 500').toBe(500);
        });
    });

    test('Upload and Download sub menu tests @uploadAndDownload', async ({ page }) => {

        await elementsPage.goToSubMenu(DEMOQA_MENU.UPLOAD_AND_DOWNLOAD);

        await test.step('Should download a file and verify its existence', async () => {
            const downloadPath = await elementsPage.downloadFile();
            expect(downloadPath, 'The downloaded file path must not be null').not.toBeNull();
        });

        await test.step('Should upload a file and verify upload status', async () => {
            await elementsPage.uploadFile(UPLOAD_FILE_PATH);
            await expect(elementsPage.uploadStatus, 'La ruta del archivo subido debe ser visible').toBeVisible();
            await expect(elementsPage.uploadStatus, 'The upload status must contain the uploaded file name').toContainText('dummy.txt');
        });
    });

    test('Dynamic Properties sub menu tests @dynamicProperties', async ({ page }) => {
        
        await elementsPage.goToSubMenu(DEMOQA_MENU.DYNAMIC_PROPERTIES);
        await test.step('Should verify "Enabled After" button becomes enabled after 5 seconds', async () => {
            await expect(elementsPage.enabledAfterButton, '"Enabled After" button should be enabled after wait').toBeEnabled({ timeout: 7000 });
        });

        await test.step('Should verify "Color Change" button changes color after 5 seconds', async () => {
            await expect(elementsPage.colorChangeButton, '"Color Change" button should have initial color').toHaveClass(/text-danger/);
        });

        await test.step('Should verify "Visible After" button becomes visible after 5 seconds', async () => {
            await expect(elementsPage.visibleAfterButton, '"Visible After" button should be visible after wait').toBeVisible();
        });
    });

});