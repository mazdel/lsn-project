class PageHelper {
    constructor(target) {
        this._target = target;
    }
    loadPage(page = 'signin') {
        switch (page) {
            case 'signin':
                this._target.page = 'signin';
                break;
            case 'signup':
                this._target.page = 'signup';
                break;
            case 'userlist':
                this._target.page = 'userlist';
                break;
            case 'dashboard':
                this._target.page = 'dashboard';
                break;
            case 'profil':
                this._target.page = 'profil';
                break;
            case 'kta':
                this._target.page = 'kta';
                break;
            default:
                this._target.page = 'signin';
                break;
        }
    }
}
export default PageHelper;