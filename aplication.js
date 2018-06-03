const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: false,
        userDataDir: "./data-dir"

    });
    const page = await browser.newPage();
    await page.goto('https://web.telegram.org/#/im');


    await page.waitFor(4000);



    const messagesNumberSpan = await page.$x(`//*[@id="ng-app"]/body/div[1]/div[2]/div/div[1]/div[2]/div/div[1]/ul/li[1]/a/div[1]/span`);
    const messaggesNumberText = await page.evaluate(elementValue => elementValue.textContent, messagesNumberSpan[0]);
    const messagesNumber = messaggesNumberText;

    if (messagesNumber == 0) {
        await page.waitFor(1000);
        await browser.close();
    }

    let [groupName] = await page.$x(`//div[@class="im_dialogs_col"]//ul[@class="nav nav-pills nav-stacked"]//div[@class="im_dialog_peer"]/span[text()="Sergi Estoestenis 2018"]`);
    await groupName.click();

    await page.waitFor(3000);

    let [toUp] = await page.$x(`//div[@class="im_history_messages_peer"]/child::*[last() -0]//div[@class="im_message_views"] `);
    await page.waitFor(1000);
    await toUp.click();
    await page.waitFor(1000);
    await toUp.click();

    for (let i = 0; i < messagesNumber; i++) {
        let [clickablee] = await page.$x(`//div[@class="im_history_messages_peer"]/child::*[last() -` + i + `]`);
        await page.waitFor(1000);
        await clickablee.click();
    }
    
    const [buttonEnviar] = await page.$x(`//div[@class="im_bottom_panel_wrap"]//div[@class="im_edit_selected_actions"]/a[@class="btn btn-primary im_edit_forward_btn"]`);
    await page.waitFor(1000);
    await buttonEnviar.click();

    const [chooseGroup] = await page.$x(`//ul[@class="im_dialogs_modal_list nav nav-pills nav-stacked"]//li[@class="im_dialog_wrap"]//div[@class="im_dialog_peer"]/span[text()="Apuestas Tenis"]`);
    await page.waitFor(1000);
    await chooseGroup.click();

    await page.waitFor(1000);
    await page.keyboard.press('Enter');

    await page.waitFor(1000);
    await browser.close();
})();