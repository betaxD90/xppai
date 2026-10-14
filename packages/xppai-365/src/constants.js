'use strict';
const PRODUCT_IDENTITY = Object.freeze({ package:'xppai-365', cli:'xppai-365', product:'D365FO', baseline:'D365FO' });
const PUBLIC_SKILLS = Object.freeze(['core','intake','papai','explain','architect','risk','codefix','dev','help'].map(s => 'xppai-365-' + s));
module.exports = { PRODUCT_IDENTITY, PUBLIC_SKILLS };

