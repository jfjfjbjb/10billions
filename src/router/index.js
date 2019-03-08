/**
 * 路由配置
 * @type {[*]}
 */
const Routes = [{
    path: '/login',
    getComponent(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('../pages/login').default)
        });
    }
}, {
    path: '/',
    getComponent(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('../pages/root').default)
        });
    }
}];

export default Routes;
