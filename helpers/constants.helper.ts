import path from 'path';
import { createRandomEmail } from './testData.helper';

export const DEMOQA_MENU = {
    //MAIN MENU CATEGORIES
    ELEMENTS: 'Elements',
    FORMS: 'Forms',
    ALERTS_FRAME_WINDOWS: 'Alerts, Frame & Windows',
    WIDGETS: 'Widgets',
    INTERACTIONS: 'Interactions',
    BOOK_STORE_APPLICATION: 'Book Store Application',

    //SUBMENU ELEMENTS CATEGORY
    TEXT_BOX: 'Text Box',
    CHECK_BOX: 'Check Box',
    RADIO_BUTTON: 'Radio Button',
    WEB_TABLES: 'Web Tables',
    BUTTONS: 'Buttons',
    LINKS: 'Links',
    BROKEN_LINKS_IMAGES: 'Broken Links - Images',
    UPLOAD_AND_DOWNLOAD: 'Upload and Download',
    DYNAMIC_PROPERTIES: 'Dynamic Properties'
}

export const ADDRESS_TEXT = {
    ACTUAL_ADDRESS: '1234 Elm Street, Springfield, IL 62704',
    PERMANENT_ADDRESS: '5678 Oak Avenue, Springfield, IL 62704'
};

export const RADIO_BUTTON_IDS = {
    YES: 'yesRadio',
    IMPRESSIVE: 'impressiveRadio',
    NO: 'noRadio'
};

export const NEW_USER_DATA = {
    FIRST_NAME: 'John',
    LAST_NAME: 'Doe',
    EMAIL: createRandomEmail('johndoe'),
    AGE: '30',
    SALARY: '50000',
    DEPARTMENT: 'Engineering'
};

export const UPDATED_USER_DATA = {
    FIRST_NAME: 'Jane',
    LAST_NAME: 'Smith',
    SALARY: '440300'
};

export const APILINKS = [
    { id: 'created', code: '201', message: 'Created' },
    { id: 'no-content', code: '204', message: 'No Content' },
    { id: 'moved', code: '301', message: 'Moved Permanently' },
    { id: 'bad-request', code: '400', message: 'Bad Request' },
    { id: 'unauthorized', code: '401', message: 'Unauthorized' },
    { id: 'forbidden', code: '403', message: 'Forbidden' },
    { id: 'invalid-url', code: '404', message: 'Not Found' },
]

export const UPLOAD_FILE_PATH = path.join(process.cwd(), 'test-files', 'dummy.txt');