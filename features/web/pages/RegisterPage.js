class RegisterPage {

    async whenUserFillSiteName(this_, siteName) { 
        let element = await this_.driver.$('#blog-title');
        return await element.setValue(siteName);
    };

    async whenUserFillUserName(this_, userName) { 
        let element = await this_.driver.$('#name');
        return await element.setValue(userName);
    };

    async whenUserFillEmail(this_, userEmail) { 
        let element = await this_.driver.$('#email');
        return await element.setValue(userEmail);
    };

    async whenUserFillPassword(this_, userPass) { 
        let element = await this_.driver.$('#password');
        return await element.setValue(userPass);
    };

    async whenUserClickRegister(this_) { 
        let element = await this_.driver.$('#ember4');
        return await element.click();
    };


}

export const registerPage = new RegisterPage();